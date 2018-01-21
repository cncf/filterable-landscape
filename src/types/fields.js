// struture:
// url: a name how the field appears in the url
// label: a header to the field in a select header
// category :
// groupingLabel(label by default): a name of the field in the grouping selector
// values: a list of possible values, strucutre:
//     id: value id for the select field
//     label: text in the select combo
//     groupingLabel(label by default): text in the grouping header
//     url(id by default): how the value is stored in the url
//     sortOrder(element index by default): sort order when grouping
//     match: function
import _ from 'lodash';
import lookups from '../lookup.json';
const fields = {
  cncfHostedProject: {
    id: 'cncfHostedProject',
    url: 'cncf',
    label: 'CNCF Relation',
    values: [{
      id: true,
      label: 'CNCF Hosted Project',
      url: 'hosted',
    }, {
      id: false,
      label: 'CNCF Member Product',
      url: 'member',
    }, {
      id: null,
      label: 'Any',
      url: 'any'
    }]
  },
  oss: {
    id: 'oss',
    url: 'oss',
    label: 'Open Source',
    values: [{
      id: true,
      label: 'Yes',
      groupingLabel: 'Open Source',
      url: 'yes',
    }, {
      id: false,
      label: 'No',
      groupingLabel: 'Not Open Source',
      url: 'no',
    }, {
      id: null,
      label: 'Either',
      url: 'any'
    }]
  },
  commercial: {
    id: 'commercial',
    url: 'commercial',
    label: 'Commercial',
    values: [{
      id: true,
      label: 'Yes',
      groupingLabel: 'Commercial',
      url: 'yes',
    }, {
      id: false,
      label: 'No',
      groupingLabel: 'Not Commercial',
      url: 'no',
    }, {
      id: null,
      label: 'Either',
      url: 'any'
    }]
  },
  stars: {
    id: 'stars',
    label: '(fake) Stars',
    category: 'starsCategory',
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }, {
      id: '1to100',
      label:'1-100',
      match: function(x) {
        return x < 100;
      }
    }, {
      id: '100to1000',
      label:'100-1000',
      match: function(x) {
        return 100 <= x && x < 1000;
      }
    }, {
      id: '1000to10000',
      label:'1000-10000',
      match: function(x) {
        return 1000 <= x && x < 10000;
      }
    }, {
      id: 'over10000',
      label: '10000+',
      match: function(x) {
        return 10000 <= x;
      }
    }]
  },
  certifiedKubernetes: {
    id: 'certifiedKubernetes',
    url: 'kubernetes',
    label: '(fake) Certified Kubernetes',
    filterFn: function(filterValue, itemValue) {
      if (filterValue === null) {
        return true;
      }
      if (filterValue === 'platform') {
        return itemValue === 'platform'
      }
      if (filterValue === 'distribution') {
        return itemValue === 'distribution';
      }
      if (filterValue === 'platformOrDistribution') {
        return itemValue === 'platform' || itemValue === 'distribution';
      }
      if (filterValue === 'notCertified') {
        return itemValue === false;
      }
      if (filterValue === 'all') {
        return itemValue === 'platform' || itemValue === 'distribution' || itemValue === false;
      }
      console.info('oops, strange filter value: ', filterValue);
    },
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }, {
      id: 'platform',
      label: 'Platform',
    }, {
      id: 'distribution',
      label: 'Distribution',
    }, {
      id: 'platformOrDistribution',
      label: 'Platform Or Distribution',
    }, {
      id: 'notCertified',
      label: 'Not Certified',
    }, {
      id: 'all',
      label: 'All Kubernetes Products'
    }],
    answers: [{
      id: null,
      groupingLabel: 'Not Related'
    }, {
      id: 'platform',
      groupingLabel: 'Platform'
    }, {
      id: 'distribution',
      groupingLabel: 'Distribution'
    }, {
      id: false,
      groupingLabel: 'Not Certified'
    }]
  },
  license: {
    id: 'license',
    label: '(fake) License',
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }].concat(lookups.license || [])
  },
  marketCap: {
    id: 'marketCap',
    label: '(fake) Market Cap of company',
    category: 'marketCapCategory',
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }, {
      id: 'below1M',
      label: '<1M',
      match: function(x) {
        return x < 1;
      }
    }, {
      id: '1Mto10M',
      label: '1M-10M',
      match: function(x) {
        return 1 <= x && x < 10 ;
      }
    }, {
      id: '10Mto100M',
      label: '10M-100M',
      match: function(x) {
        return 10 <= x && x < 100;
      }
    }, {
      id: '100Mto1000M',
      label: '100M-1000M',
      match: function(x) {
        return 100 <= x && x < 1000;
      }
    }, {
      id: 'over1000M',
      label: '1000M+',
      match: function(x) {
        return 1000 <= x;
      }
    }]
  },
  vcFunder: {
    id: 'vcFunder',
    label: '(fake) VC Funders',
    values: [].concat(lookups.vcFunder || [])
  },
  company: {
    id: 'company',
    label: 'Company',
    isArray: true,
    values: [].concat(lookups.company || [])
  },
  headquarters: {
    id: 'headquarters',
    label: '(fake) Headquarters Location',
    isArray: true,
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }].concat(lookups.headquarters || [])
  },
  landscape: {
    id: 'landscape',
    label: 'CNCF Filterable Landscape',
    values: [{
      id: null,
      label: 'Any',
      url: 'any'
    }].concat(lookups.landscape || [])
  }
};
_.each(fields, function(field, key) {
  field.id = key;
  _.defaults(field, {
    groupingLabel: field.label,
    url: field.id,
    answers: field.values
  });
  _.each(field.values, function(value, index) {
    _.defaults(value, {
      groupingLabel: value.label,
      url: value.id,
      groupingSortOrder: index
    });
  });
  _.each(field.answers, function(value, index) {
    _.defaults(value, {
      groupingSortOrder: index
    });
  });
});
export default fields;

export function options(field) {
  return fields[field].values.map(function(values) {
    return {
      id: values.id,
      label: values.label
    };
  });
}
export function filterFn({field, filters}) {
  const fieldInfo = fields[field];
  const filter = filters[field];
  return function(x) {
    // can be null, id, [] or [id1, id2, id3 ]
    const value = fieldInfo.category ? x[fieldInfo.category] : x[field];
    if (fieldInfo.filterFn) {
      return fieldInfo.filterFn(filter, value);
    }
    if (filter === null) {
      return true;
    }
    if (filter.length === 0) {
      return true;
    }
    if (_.isArray(filter)) {
      return filter.indexOf(value) !== -1;
    } else {
      return value === filter;
    }
  };
}
export function getGroupingValue({item, grouping}) {
  const fieldInfo = fields[grouping];
  const value = fieldInfo.category ? item[fieldInfo.category] : item[fieldInfo.id];
  return value;
}
export function getCategory({field, item }) {
  const fieldInfo = fields[field];
  const value = item[field];
  const category = _.find(fieldInfo.values, function(valueInfo) {
    return valueInfo.match && valueInfo.match(value);
  }).id;
  return category;
}
export function sample(field) {
  return _.sample(fields[field].values.map(function(x) {
    return x.id;
  }).filter(function(x) { return !!x; }));
}
