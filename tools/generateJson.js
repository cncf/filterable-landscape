const source = require('js-yaml').safeLoad(require('fs').readFileSync('src/data.yml'));
const traverse = require('traverse');
const _ = require('lodash');
import saneName from '../src/utils/saneName';
import { getCategory } from '../src/types/fields';
import fakeData from '../src/types/fakeData';
import parse from 'csv-parse/lib/sync';


const crunchbase = parse(require('fs').readFileSync('src/crunchbase.csv','utf-8'), {columns: true});


const items = [];
const tree = traverse(source);
tree.map(function(node) {
  if (node && node.item === null) {
    const parts = this.parents.filter(function(p) {
      return p.node.category === null || p.node.subcategory === null;
    }).map(function(p) {
      return p.node.name;
    });
    const crunchbaseInfo = _.find(crunchbase, {"Organization Name URL": (node.external || {}).crunchbase});
    var crunchbaseParts = {
      marketCap: 'Not Entered Yet',
      headquarters: 'Not Entered Yet'
    };
    if (!crunchbaseInfo) {
      console.info('No crunchbase info', (node.external || {}).crunchbase, node.company, node.name);
    } else {
      const amount = crunchbaseInfo["Total Funding Amount"].substring(1).replace(/,/g, "");
      const marketCap = amount ? parseInt(amount, 10) : 'N/A';
      crunchbaseParts = {
        marketCap: marketCap,
        headquarters: crunchbaseInfo["Headquarters Location"] || 'N/A'
      }

    }
    items.push({...node,
      cncfHostedProject: node.cncf_hosted_project,
      path: parts.join(' / '),
      landscape: parts[0],
      stars: _.random(12000),
      certifiedKubernetes: _.sample([null, false, 'platform', 'distribution']),
      license: _.sample(fakeData.license),
      vcFunder: _.sample(fakeData.vcFunder),
      ...crunchbaseParts
    });
  }
});
const itemsWithExtraFields = items.map(function(item) {
  delete item.cncf_hosted_project;
  if (_.isUndefined(item.commercial)) {
    console.info('please, fix yaml and set commercial for ', item.name);
  }
  const otherItems = _.filter(items, {name: item.name});
  var id = saneName(item.name);
  if (otherItems.length > 1) {
    id = saneName(item.path + ' ' + item.name);
  }
  return {
    ...item,
    id: id,
    company: item.company || '(no company)',
    starsCategory: getCategory({field: 'stars', item: item}),
    marketCapCategory: getCategory({field: 'marketCap', item: item}),
    logo: `logo-${saneName(item.name)}`
  }
});
const extractOptions = function(name) {
  return _.chain(itemsWithExtraFields).map(function(x) {
    return x[name];
  }).filter(function(x) {
    return !!x
  }).sortBy().uniq().map(function(x) {
    return {
      id: x,
      label: x,
      url: saneName(x)
    };
  }).value();
};
const lookups = {
  company: extractOptions('company'),
  landscape: extractOptions('landscape'),
  license: extractOptions('license'),
  headquarters: extractOptions('headquarters'),
  vcFunder: extractOptions('vcFunder')
}
require('fs').writeFileSync('src/data.json', JSON.stringify(itemsWithExtraFields, null, 2));
require('fs').writeFileSync('src/lookup.json', JSON.stringify(lookups, null, 2));
