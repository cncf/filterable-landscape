import yahooFinance from 'yahoo-finance';
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
      crunchbase: node.crunchbase,
      ticker: node.stock_ticker
    });
  });
  // console.info(_.find(_.uniq(organizations), {name: 'foreman'}));
  return _.uniq(organizations);
}

export async function extractSavedCrunchbaseEntries() {
  const traverse = require('traverse');
  let source = [];
  try {
    source =  require('js-yaml').safeLoad(require('fs').readFileSync('processed_landscape.yml'));
  } catch(_ex) {
    console.info('Can not extract crunchbase entries from the processed_landscape.yml');
  }

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

async function getParentCompanies(companyInfo) {
  var parentInfo = companyInfo.relationships.owned_by.item;
  if (!parentInfo) {
    return [];
  } else {
    var parentId = parentInfo.uuid;
    var fullParentInfo =  await rp({
      method: 'POST',
      uri: 'http://api.crunchbase.com/v3.1/batch',
      timeout: 10 * 1000,
      headers: {
        'X-Cb-User-Key': key
      },
      body: {
        "requests":[
          { "type":"Organization","uuid": parentId},
        ]
      },
      json: true
    });
    var cbInfo = fullParentInfo.data.items[0];
    await Promise.delay(1 * 1000);
    return [parentInfo].concat(await getParentCompanies(cbInfo));
  }
}
async function getMarketCap(ticker) {
  // console.info(ticker, stock_exchange);
  const quote =  await yahooFinance.quote({symbol: ticker, modules: ['summaryDetail']})
  return quote.summaryDetail.marketCap;
}

export async function fetchCrunchbaseEntries({cache, preferCache}) {
  // console.info(organizations);
  // console.info(_.find(organizations, {name: 'foreman'}));
  const organizations = await getCrunchbaseOrganizationsList();
  return await Promise.map(organizations,async function(c) {
    const cachedEntry = _.find(cache, {url: c.crunchbase});
    if (cachedEntry && preferCache) {
      return cachedEntry;
    }
    await Promise.delay(1 * 1000);
    try {
      const result = await rp({
        method: 'POST',
        uri: 'http://api.crunchbase.com/v3.1/batch',
        headers: {
          'X-Cb-User-Key': key
        },
        timeout: 10 * 1000,
        body: {
          "requests":[
            { "type":"Organization","uuid": c.name},
          ]
        },
        json: true
      });
      var cbInfo = result.data.items[0].properties;
      // console.info(parents.map( (x) => x.properties.name));
      var twitterEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'twitter');
      var linkedInEntry = _.find(result.data.items[0].relationships.websites.items, (x) => x.properties.website_name === 'linkedin');
      const headquarters = result.data.items[0].relationships.headquarters;
      const entry = {
        url: c.crunchbase,
        name: cbInfo.name,
        description: cbInfo.short_description,
        num_employees_min: cbInfo.num_employees_min,
        num_employees_max: cbInfo.num_employees_max,
        homepage: cbInfo.homepage_url,
        city: headquarters && headquarters.item && headquarters.item.properties.city || null,
        region: headquarters && headquarters.item && headquarters.item.properties.region || null,
        country: headquarters && headquarters.item && headquarters.item.properties.country || null,
        twitter: twitterEntry ? twitterEntry.properties.url : null,
        linkedin: linkedInEntry ? linkedInEntry.properties.url : null
      };
      var parents = await getParentCompanies(result.data.items[0]);
      var meAndParents = [result.data.items[0]].concat(parents);
      var firstWithTicker = _.find( meAndParents, (org) => !!org.properties.stock_symbol );
      var firstWithFunding = _.find( meAndParents, (org) => !!org.properties.total_funding_usd );
      if (firstWithTicker) {
        entry.ticker = firstWithTicker.properties.stock_symbol;
        entry.effective_ticker = c.ticker || entry.ticker;
        try {
          entry.market_cap = await getMarketCap(entry.effective_ticker, cbInfo.stock_exchange);
        } catch(ex) {
          console.info('can not fetch market cap for the ', cbInfo.name, entry.effective_ticker);
        }
        entry.kind = 'market_cap';
        // console.info(cbInfo.name, 'ticker: ', entry.ticker, ' market cap: ', entry.funding);
      } else if (firstWithFunding) {
        entry.kind = 'funding';
        entry.funding = firstWithFunding.properties.total_funding_usd;
        // console.info(cbInfo.name, 'funding: ', entry.funding);
      } else {
        // console.info(cbInfo.name, 'no finance info');
      }
      return entry;
      // console.info(entry);
    } catch (ex) {
      console.info(ex.message, ex.stack);
      console.info(c, ' - fail');
      return cachedEntry || null;
    }
  }, {concurrency: 5})
}
// async function main() {
  // const organizations = await getCrunchbaseOrganizationsList();
  // return await fetchCrunchbaseEntries(organizations.slice(0, 100));
// }
// main().catch(console.info);
