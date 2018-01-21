const source = require('js-yaml').safeLoad(require('fs').readFileSync('src/data.yml'));
const traverse = require('traverse');
const _ = require('lodash');
import saneName from '../src/utils/saneName';
import { getCategory } from '../src/types/fields';
import fakeData from '../src/types/fakeData';


const items = [];
const tree = traverse(source);
tree.map(function(node) {
  if (node && node.item === null) {
    const parts = this.parents.filter(function(p) {
      return p.node.category === null || p.node.subcategory === null;
    }).map(function(p) {
      return p.node.name;
    });
    items.push({...node,
      cncfHostedProject: node.cncf_hosted_project,
      path: parts.join(' / '),
      landscape: parts[0],
      stars: _.random(12000),
      certifiedKubernetes: _.sample([null, false, 'platform', 'distribution']),
      license: _.sample(fakeData.license),
      marketCap: _.random(1000),
      vcFunder: _.sample(fakeData.vcFunder),
      headquarters: _.sample(fakeData.headquarters)
    });
  }
});
const itemsWithExtraFields = items.map(function(item) {
  delete item.cncf_hosted_project;
  if (_.isUndefined(item.commercial)) {
    console.info('please, fix yaml and set commercial for ', item.name);
  }
  return {
    ...item,
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
