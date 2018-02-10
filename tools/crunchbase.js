import process from 'process'
import rp from 'request-promise'
import Promise from 'bluebird'
import _ from 'lodash';
const key = process.env.CRUNCHBASE_KEY;
if (!key) {
  console.info('key not provided');
}

export async function getCrunchbaseOrganizationsList() {
  const traverse = require('traverse');
  const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
  var organizations = [];
  const tree = traverse(source);
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.item !== null) {
      return;
    }
    if (!node.crunchbase) {
      // console.info('No cb for', node.name);
      return;
    }
    // console.info('Adding: ', node.crunchbase);
    organizations.push({
      name: node.crunchbase.split('/').slice(-1)[0],
      crunchbase: node.crunchbase
    });
  });
  // console.info(_.find(_.uniq(organizations), {name: 'foreman'}));
  return _.uniq(organizations);
}

export async function extractSavedCrunchbaseEntries() {
  const traverse = require('traverse');
  const source = require('js-yaml').safeLoad(require('fs').readFileSync('processed_landscape.yml'));
  var organizations = [];
  const tree = traverse(source);
  tree.map(function(node) {
    if (!node) {
      return;
    }
    if (node.crunchbase && node.crunchbase_data) {
      organizations.push({...node.crunchbase_data, url: node.crunchbase});
    }
  });

  return _.uniq(organizations);
}

export async function fetchCrunchbaseEntries(organizations) {
  // console.info(organizations);
  // console.info(_.find(organizations, {name: 'foreman'}));
  return await Promise.map(organizations,async function(c) {
    try {
      const result = await rp({
        method: 'POST',
        uri: 'http://api.crunchbase.com/v3.1/batch',
        headers: {
          'X-Cb-User-Key': key
        },
        body: {
          "requests":[
            { "type":"Organization","uuid": c.name},
          ]
        },
        json: true
      });
      var cbInfo = result.data.items[0].properties;
      var twitterEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'twitter');
      var linkedInEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'linkedin');
      const headquarters = result.data.items[0].relationships.headquarters;
      const entry = {
        url: c.crunchbase,
        name: cbInfo.name,
        description: cbInfo.short_description,
        ticker: cbInfo.stock_symbol,
        min: cbInfo.num_employees_min,
        max: cbInfo.num_employees_max,
        funding: cbInfo.total_funding_usd,
        homepage: cbInfo.homepage_url,
        city: headquarters && headquarters.item && headquarters.item.properties.city || null,
        region: headquarters && headquarters.item && headquarters.item.properties.region || null,
        country: headquarters && headquarters.item && headquarters.item.properties.country || null,
        twitter: twitterEntry ? twitterEntry.properties.url : null,
        linkedin: linkedInEntry ? linkedInEntry.properties.url : null
      };
      return entry;
      // console.info(entry);
    } catch (ex) {
      console.info(ex.message, ex.stack);
      console.info(c, ' - fail');
      return null;
    }
  })
}
// async function main() {
  // return await getCrunchbaseEntries(organizations);
// }
// main().catch(console.info);
