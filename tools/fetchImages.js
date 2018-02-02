import Jimp from 'jimp';
import rp from 'request-promise';
import Promise from 'bluebird';
import saneName from '../src/utils/saneName';
import fs from 'fs';
import _ from 'lodash';
import svg2png from 'svg2png';

// x3 because we may have retina display
const sizes = [{
  name: 'large',
  width: 600 * 3,
  height: 200 * 3
}, {
  name: 'tile',
  width: 153 * 3,
  height: 100 * 3
}];

const traverse = require('traverse');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
var existingEntries = [];
try {
  existingEntries = require('js-yaml').safeLoad(fs.readFileSync('src/imageUrls.yml', 'utf-8'));
} catch (ex) {
  console.info('File src/imagesUrls.yml does not exist. New one will be created');
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
  const path = this.parents.filter(function(p) {
    return p.node.category === null || p.node.subcategory === null;
  }).map(function(p) {
    return p.node.name;
  }).join(' / ');
  node.path = path;
  items.push(node);
});
_.each(items, function(item) {
  const otherItems = _.filter(items, {name: item.name});
  var id = item.name;
  if (otherItems.length > 1) {
    console.info('Other name: ', id);
    id = item.path + ' ' + item.name;
    console.info(' resolved with ', id);
  }
  item.id = id;
});

const errors = [];
var logos=[];

async function fetchImages() {
  const promises = Promise.map(items, async function(item) {
    var url = item.raw_logo;
    if (url && url.indexOf('http') !== 0 && url.indexOf('.') !== 0) {
      console.info(`adding a prefix for ${url}`);
      url = 'http://' + url;
    }
    if (url && url.indexOf('//github.com/') !== -1) {
      url = url.replace('github.com', 'raw.githubusercontent.com');
      url = url.replace('blob/', '');
    }
    if (!url) {
      console.info(`"${item.name}" has no raw_logo`);
      errors.push({
        name: item.name,
        logo: ''
      });
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
            var entry = _.find(existingEntries, {url: url, name: saneName(item.id), fileName: fileName});
            if (!entry) {
              console.info('existing image for ', url,  ' has not been found');
              return;
            } else {
              logos.push(entry);
              return;
            }
          }
        }
        var hash = require('crypto').createHash('sha256').update(response).digest('hex');
        const existingEntry = _.find(existingEntries, {url: url, fileName: fileName, name: saneName(item.id)});
        if (!existingEntry || existingEntry.hash !== hash) {
          if (ext === '.svg') {
            response = await svg2png(response, {width: 1024});
          }
          // console.info('normalizing image');
          await normalizeImage({inputFile: response,outputFile: fileName});
        }
        logos.push({name: saneName(item.id), fileName: fileName, hash, url});
      } catch(ex) {
        console.info(`${item.name} has issues with logo: ${url}`);
        console.info(ex.message.substring(0, 100));
        errors.push({
          name: item.name,
          logo: item.raw_logo
        });
      }
    }
  }, {concurrency: 10});
  await promises;
  logos = _.orderBy(logos, 'name');
}

async function generateCss() {
  const lines = logos.map(function(logo) {
    const path = logo.fileName.replace('src/logos/', '../logos/');
    return sizes.map(function(size) {
      return `
          .logo-${logo.name}-${size.name} {
              background-image: url("${path.replace('.png', `-${size.name}.png`) }");
          }
      `;
    }).join("\n");
  }).join("\n");
  fs.writeFileSync('./src/styles/styles.scss', lines);
}

async function writeUrlHashes() {
  var dump = require('js-yaml').dump(logos);
  dump = "# THIS FILE IS GENERATED AUTOMATICALLY based on landscape.yml via babel-node tools/fetchImages.js !\n" + dump;
  fs.writeFileSync('src/imageUrls.yml', dump);
}

async function normalizeImage({inputFile, outputFile}) {
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
  await Promise.map(sizes, async function(size) {
    var clone = image.clone();
    await clone.contain(size.width, size.height);
    await clone.write(outputFile.replace('.png', `-${size.name}.png`));
  });
}

async function main() {
  await fetchImages();
  await generateCss();
  await writeUrlHashes();
}
main();
