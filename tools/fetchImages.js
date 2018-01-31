import Jimp from 'jimp';
import rp from 'request-promise';
import Promise from 'bluebird';
import saneName from '../src/utils/saneName';
import fs from 'fs';
import _ from 'lodash'

const traverse = require('traverse');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
var existingEntries = [];
try {
  existingEntries = JSON.parse(fs.readFileSync('src/imageUrls.json', 'utf-8'));
} catch (ex) {
  console.info('File src/imagesUrls.json does not exist. New one will be created');
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
  items.push(node);
});

const errors = [];
var logos=[];

async function fetchImages() {
  const promises = Promise.map(items, async function(item) {
    var url = item.raw_logo;
    if (url && url.indexOf('http') !== 0) {
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
      if (ext !== '.svg') {
        outputExt = '.png';
      } else {
        outputExt = '.svg';
      }
      const fileName = `src/logos/${saneName(item.name)}${outputExt}`;
      try {
        const response = await rp({
          encoding: null,
          uri: url,
          followRedirect: true,
          simple: true
        });
        var hash = require('crypto').createHash('sha256').update(response).digest('hex');
        const existingEntry = _.find(existingEntries, {url: url});
        if (!existingEntry || existingEntry.hash !== hash) {
          if (ext !== '.svg') {
            // console.info('normalizing image');
            await normalizeImage({inputFile: response,outputFile: fileName});
          } else {
            // console.info(`writing svg to ${fileName}`);
            fs.writeFileSync(fileName, response);
          }
        }
        logos.push({name: saneName(item.name), fileName: fileName, hash, url});
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
  logos = _.orderBy(logos, 'name');
  await promises;
}

async function generateCss() {
  const lines = logos.map(function(logo) {
    const path = logo.fileName.replace('src/logos/', '../logos/');
    return `
        .logo-${logo.name} {
             background-image: url("${path}");
        }
    `;
  }).join("\n");
  fs.writeFileSync('./src/styles/styles.scss', lines);

}

async function writeUrlHashes() {
  fs.writeFileSync('src/imageUrls.json', JSON.stringify(logos, null, 2));
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
  await image.write(outputFile);
}

async function main() {
  await fetchImages();
  await generateCss();
  await writeUrlHashes();
}
main();
