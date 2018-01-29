import Jimp from 'jimp';
import { createObjectCsvWriter } from 'csv-writer';
import rp from 'request-promise';
import Promise from 'bluebird';
import saneName from '../src/utils/saneName';
import fs from 'fs';
var items = JSON.parse(fs.readFileSync('src/data.json'));
const errors = [];
const logos=[];



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
        if (ext !== '.svg') {
          await normalizeImage({inputFile: response,outputFile: fileName});
        }

        fs.writeFileSync(fileName, response);
        logos.push({name: saneName(item.name), fileName: fileName});
      } catch(ex) {
        console.info(`${item.name} has issues with logo: ${url}`);
        console.info(ex);
        errors.push({
          name: item.name,
          logo: item.raw_logo
        });
      }
    }
  }, {concurrency: 10});
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
async function normalizeImage({inputFile, outputFile}) {
  const threshold  = 0.05;
  const maxValue = 255 - 255 * threshold;
  const image = await Jimp.read(inputFile);
  console.info(image);
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
  await image.write(outputFile);
}

async function main() {
  await fetchImages();
  await generateCss();
  const csvWriter = createObjectCsvWriter({
      path: './errors.csv',
      header: ['name', 'logo']
  });
  await csvWriter.writeRecords(errors);
}
main();
