import process from 'process'
import rp from 'request-promise'
import Promise from 'bluebird'
import _ from 'lodash';
const key = process.env.CRUNCHBASE_KEY;
if (!key) {
  console.info('key not provided');
}

const traverse = require('traverse');
const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
var companies = [];
const tree = traverse(source);
tree.map(function(node) {
  if (!node) {
    return;
  }
  if (node.item !== null) {
    return;
  }
  if (!node.crunchbase) {
    console.info('No cb for', node.name);
    return;
  }
  companies.push(node.crunchbase.split('/').slice(-1)[0]);
});
console.info(companies[0]);
async function main() {
  await Promise.map(companies,async function(c) {
    try {
    const result = await rp({
      method: 'POST',
      uri: 'http://api.crunchbase.com/v3.1/batch',
      headers: {
        'X-Cb-User-Key': key
      },
      body: {
        "requests":[
          { "type":"Organization","uuid": c},
        ]
      },
      json: true
    });
    var fbInfo = result.data.items[0].properties;
    var twitterEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'twitter');
    var linkedInEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'linkedin');
    console.info(twitterEntry);
    const entry = {
      name: fbInfo.name,
      description: fbInfo.short_description,
      stock: fbInfo.stock_symbol,
      min: fbInfo.num_employees_min,
      max: fbInfo.num_employees_max,
      funding: fbInfo.total_funding_usd,
      homepage: fbInfo.homepage_url,
      city: result.data.items[0].relationships.headquarters.item.properties.city,
      country: result.data.items[0].relationships.headquarters.item.properties.country,
      twitter: twitterEntry ? twitterEntry.properties.url : null,
      linkedIn: linkedInEntry ? linkedInEntry.properties.url : null
    };
      console.info(entry);
    } catch (ex) {
      console.info(c, ' - fail');
    }
  })
}
main().catch(console.info);
