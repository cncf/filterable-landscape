const Promise = require('bluebird');
import saneName from '../src/utils/saneName';
var items = JSON.parse(require('fs').readFileSync('src/data.json'));
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
      if (['.jpg', '.png', '.gif', '.svg'].indexOf(ext) === -1 ) {
        ext = '.jpg';
      }
      const fileName = `src/logos/${saneName(item.name)}${ext}`;
      const rp = require('request-promise');
      try {
        const response = await rp({
          encoding: null,
          uri: url,
          followRedirect: true,
          simple: true
        });
        require('fs').writeFileSync(fileName, response);
        logos.push({name: saneName(item.name), fileName: fileName});
        console.info('saving logo for ', item.logo);
      } catch(ex) {
        console.info(`${item.name} has issues with logo: ${url}`);
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
  require('fs').writeFileSync('./src/styles/styles.scss', lines);

}
(async function() {
  await fetchImages();
  await generateCss();
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
      path: './errors.csv',
      header: ['name', 'logo']
  });
  await csvWriter.writeRecords(errors);

})().then(function(){
  require('process').exit();
});
