import Jimp from 'jimp';
import rp from 'request-promise';
import Promise from 'bluebird';
import saneName from '../src/utils/saneName';
import fs from 'fs';
import _ from 'lodash';
import svg2png from 'svg2png';

// x3 because we may have retina display
const size = {
  width: 180 * 3,
  height: 120 * 3
};

const traverse = require('traverse');


function getLandscapeItems(source) {
  const tree = traverse(source);
  const items = [];
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.item !== null) {
      return;
    }
    items.push({logo: node.logo, name: node.name, crunchbase: node.crunchbase, organization: node.organization});
  });
  _.each(items, function(item) {
    const otherItems = _.filter(items, {name: item.name});
    var id = item.name;
    if (otherItems.length > 1) {
      // console.info('Other name: ', id);
      id = item.organization + ' ' + item.name;
      // console.info(' resolved with ', id);
    }
    item.id = id;
  });
  return items;
}
function getProcessedItems() {
  var source = [];
  try {
    source = require('js-yaml').safeLoad(require('fs').readFileSync('processed_landscape.yml'));
  } catch (ex) {
    console.info('file ./processed_landscape.yml does not present, can not use it for caching images');
  }
  const tree = traverse(source);
  const items = [];
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.item !== null) {
      return;
    }
    items.push({low_res: node.low_res, logo: node.logo, name: node.name, crunchbase: node.crunchbase, organization: node.organization});
  });
  _.each(items, function(item) {
    const otherItems = _.filter(items, {name: item.name});
    var id = item.name;
    if (otherItems.length > 1) {
      // console.info('Other name: ', id);
      id = item.organization + ' ' + item.name;
      // console.info(' resolved with ', id);
    }
    item.id = id;
  });
  return items;
}
var processedItems = getProcessedItems();
function imagesExist(itemId) {
  const fileName = './src/logos/' + saneName(itemId) + '.png';
  return require('fs').existsSync(fileName);
}

export async function fetchImages(newSource) {
  const errors = [];
  const landscapeItems = getLandscapeItems(newSource);
  const promises = Promise.map(landscapeItems, async function(item) {
    var savedItem = _.find(processedItems, { name: item.name, crunchbase: item.crunchbase }) || {};
    if (savedItem.logo ===  item.logo && imagesExist(savedItem.id)) {
      if (savedItem.low_res) {
          errors.push({
            logo: savedItem.logo,
            low_res: savedItem.low_res
          });
      }
      return; // logo is same. images are present.
    }
    console.info('fetching ', item.logo, ' for ', item.id);
    var url = item.logo;
    if (url && url.indexOf('http') !== 0 && url.indexOf('.') !== 0) {
      console.info(`adding a prefix for ${url}`);
      url = 'http://' + url;
    }
    if (url && url.indexOf('//github.com/') !== -1) {
      url = url.replace('github.com', 'raw.githubusercontent.com');
      url = url.replace('blob/', '');
    }
    if (!url) {
      console.info(`"${item.name}" has no logo`);
    } else {
      const extWithQuery = url.split('.').slice(-1)[0];
      var ext='.' + extWithQuery.split('?')[0];
      var outputExt = '';
      if (['.jpg', '.png', '.gif', '.svg'].indexOf(ext) === -1 ) {
        ext = '.png';
      }
      outputExt = '.png';
      const fileName = `src/logos/${saneName(item.id)}${outputExt}`;
      try {
        // console.info(url);
        var response = null;
        if (url.indexOf('.') === 0) {
          response = fs.readFileSync(url);
        } else {
          try {
            response = await rp({
              encoding: null,
              uri: url,
              followRedirect: true,
              simple: true,
              timeout: 30 * 1000
            });
          } catch(ex) {
            console.info('failed to fetch ', url, ' attempting to use existing image');
          }
        }
        if (ext === '.svg') {
          response = await svg2png(response, {width: size.width * 2});
        }
        // console.info('normalizing image');
        const result = await normalizeImage({inputFile: response,outputFile: fileName, item});
        if (result.low_res) {
          errors.push({
            logo: item.logo,
            low_res: result.low_res
          });
        }
      } catch(ex) {
        console.info(`${item.name} has issues with logo: ${url}`);
        console.info(ex.message.substring(0, 100));
      }
    }
  }, {concurrency: 10});
  await promises;
  return errors;
}

async function normalizeImage({inputFile, outputFile, item}) {
  var result = {};
  const threshold  = 0.05;
  const maxValue = 255 - 255 * threshold;
  const image = await Jimp.read(inputFile);
  // console.info(image);
  await image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x,y, idx) {
    var red   = this.bitmap.data[ idx + 0 ];
    var green = this.bitmap.data[ idx + 1 ];
    var blue  = this.bitmap.data[ idx + 2 ];
    var alpha = this.bitmap.data[ idx + 3 ];
    if (red > maxValue && green > maxValue && blue > maxValue) {
      alpha = 0;
    }
    this.bitmap.data[idx + 3 ] = alpha;
  });
  await image.autocrop();
  if (image.bitmap.width < size.width || image.bitmap.height < size.height) {
    result = { low_res:  `${image.bitmap.width}x${image.bitmap.height}`};
    console.info('Low Resolution Warning: ', item.name, ' has image size: ', image.bitmap.width, 'x', image.bitmap.height, ' but we want ', size.width, 'x', size.height);
  }
  await image.contain(size.width, size.height);
  await image.write(outputFile);
  return result;
}

// async function main() {
  // await fetchImages();
// }
// main();
