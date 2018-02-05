const source = require('js-yaml').safeLoad(require('fs').readFileSync('processed_landscape.yml'));
const traverse = require('traverse');
const _ = require('lodash');
import saneName from '../src/utils/saneName';
import { getCategory } from '../src/types/fields';


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
      cncfProject: node.cncf_project,
      cncfMember: node.cncf_member,
      cncfRelation: node.cncf_project || ( node.cncf_member ? 'member' : false ),
      path: parts.join(' / '),
      landscape: parts.join(' / '),
      category: parts[0],
      marketCap: node.market_cap,
      oss: node.license !== 'NotOpenSource'
    });
  }
});
const itemsWithExtraFields = items.map(function(item) {
  delete item.cncf_project;
  delete item.cncf_member;
  delete item.market_cap;
  delete item.item;
  const otherItems = _.filter(items, {name: item.name});
  var id = saneName(item.name);
  if (otherItems.length > 1) {
    id = saneName(item.company + ' ' + item.name);
  }
  return {
    ...item,
    id: id,
    starsCategory: getCategory({field: 'stars', item: item}),
    marketCapCategory: getCategory({field: 'marketCap', item: item}),
    logo: `logo-${saneName(id)}`,
    hrefTile: `/${saneName(id)}-tile.png`,
    hrefLarge: `/${saneName(id)}-large.png`,
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
const generateLandscapeHierarchy = function() {
  var result = [];
  tree.map(function(node) {
    if (node && node.category === null) {
      result.push({
        id: node.name,
        label: node.name,
        url: saneName(node.name),
        level: 1,
        children: []
      });
    }
    if (node && node.subcategory === null) {
      const category = this.parents.filter(function(p) {
        return p.node.category === null;
      }).map(function(p) {
        return p.node.name;
      })[0];
      const categoryEntry = _.find(result, {level: 1, id: category});
      const entry = {
        id: category + ' / ' + node.name,
        parentId: category,
        label: node.name,
        groupingLabel: category + ' - ' + node.name,
        url: saneName(node.name),
        level: 2
      }
      categoryEntry.children.push(entry.id);
      result.push(entry);
    }
  });
  return result;
};
const generateLicenses = function() {
  const otherLicenses = extractOptions('license').filter(function(x) {
    return x.id !== 'NotOpenSource';
  });
  return [{
    id: 'NotOpenSource',
    label: 'Not Open Source',
    url: saneName('NotOpenSource'),
    level: 1,
    children: []
  }, {
    id: 'Open Source',
    label: 'Open Source',
    url: saneName('Open Source'),
    level: 1,
    children: _.map(otherLicenses, 'id')
  }].concat(otherLicenses.map(function(license){
    return {
      ...license,
      parentId: 'Open Source',
      level: 2
    };
  }));
};
const lookups = {
  company: extractOptions('company'),
  landscape: generateLandscapeHierarchy(),
  license: generateLicenses(),
  headquarters: extractOptions('headquarters'),
  vcFunder: extractOptions('vcFunder')
}
require('fs').writeFileSync('src/data.json', JSON.stringify(itemsWithExtraFields, null, 2));
require('fs').writeFileSync('src/lookup.json', JSON.stringify(lookups, null, 2));
