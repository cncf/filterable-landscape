const source = require('js-yaml').safeLoad(require('fs').readFileSync('landscape.yml'));
const traverse = require('traverse');
const _ = require('lodash');
import parse from 'csv-parse/lib/sync';
import formatCity from '../src/utils/formatCity';


const crunchbase = parse(require('fs').readFileSync('src/crunchbase.csv','utf-8'), {columns: true});
const githubEntries = require('../src/github.json');

const tree = traverse(source);
const newSource = tree.map(function(node) {
  if (node && node.item === null) {
    const crunchbaseInfo = _.find(crunchbase, {"Organization Name URL": node.crunchbase});
    var crunchbaseParts = {
      market_cap: 'Not Entered Yet',
      headquarters: 'Not Entered Yet',
      rank: 'Not Entered Yet'
    };
    if (!crunchbaseInfo) {
      console.info('No crunchbase info', node.crunchbase, node.company, node.name);
    } else {
      const amount = crunchbaseInfo["Total Funding Amount"].substring(1).replace(/,/g, "");
      const marketCap = amount ? parseInt(amount, 10) : 'N/A';
      const rank =  crunchbaseInfo["CB Rank (Company)"].replace(/,/g, "");
      crunchbaseParts = {
        market_cap: marketCap,
        headquarters: formatCity(crunchbaseInfo["Headquarters Location"]) || 'N/A',
        company: crunchbaseInfo["Organization Name"],
        rank: rank ? + rank : 'N/A'
      }
    }
    var githubInfo = {
      stars: 'N/A',
      license: 'Commercial'
    };
    var githubEntry = _.find(githubEntries, {url: node.repo_url});
    if (githubEntry) {
      githubInfo = {
        stars: githubEntry.stars,
        license: githubEntry.license
      };
    }
    var description = node.description || (githubEntry || {}).description || (crunchbaseInfo || {})['Description'] || '';
    description = description.replace(/\n/g, ' ');

    _.assign(node, crunchbaseParts);
    _.assign(node, githubInfo);
    node.description = description;
  }
});
var dump = require('js-yaml').dump(newSource);
dump = dump.replace(/(- \w+:) null/g, '$1');
dump = "# THIS FILE IS GENERATED AUTOMATICALLY!\n" + dump;
require('fs').writeFileSync('processed_landscape.yml', dump);
