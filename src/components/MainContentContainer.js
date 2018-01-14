import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import traverse from 'traverse';
import _ from 'lodash';
import MainContent from './MainContent';

const getItems = createSelector(
  (state) => state.main.data,
  function(data) {
    const items = [];
    const tree = traverse(data);
    tree.map(function(node) {
      if (node && node.item === null) {
        const parts = this.parents.filter(function(p) {
          return p.node.category === null || p.node.subcategory === null;
        }).map(function(p) {
          return p.node.name;
        });
        items.push({...node,
          path: parts.join(' / '),
          landscape: parts[0],
          stars: _.random(12000),
          certifiedKubernetes: _.sample(['platform', 'distribution', 'platformOrDistribution', 'notCertified']),
          license: _.sample(['gpl-v2', 'gpl-v3', 'mit', 'apache', 'commercial']),
          marketCap: _.random(1000),
          vcFunder: _.sample(['ycombinator', 'other1', 'other2', 'other3']),
          headquaters: _.sample(['NY', 'San Francisco', 'West Palm Beacch']),
          kind: (node.oss? 'Open Source' : 'Commercial') + ', ' + (node.cncf ? 'CNCF Member': 'CNCF Hosted Project')
        });
      }
    });
    return items.map(function(item) {
      return {...item,
        starsCategory: item.stars < 100 ? '1-100' : item.stars < 1000 ? '100-1000' : item.stars < 10000 ? '1000-10000' : '10000+'
      }
    });
  }
);
const getFilteredItems = createSelector(
  (state) => getItems(state),
  (state) => state.main.filters,
  function(data, filters) {
    var filterByKindCnCf = function(x) {
      var filterCncfMember  = filters.kind.indexOf('cncfMember') !== -1;
      var filterCncfHostedProject = filters.kind.indexOf('cncfHostedProject') !== -1
      if (!filterCncfMember && !filterCncfHostedProject) {
        return true;
      }
      if (filterCncfMember && filterCncfHostedProject) {
        return true;
      }
      if (filterCncfMember) {
        return x.cncf === true;
      }
      if (filterCncfHostedProject) {
        return x.cncf === false;
      }
    }
    var filterByKindOss = function(x) {
      var filterOss  = filters.kind.indexOf('opensource') !== -1;
      var filterCommercial = filters.kind.indexOf('commercial') !== -1
      if (!filterOss && !filterCommercial) {
        return true;
      }
      if (filterOss && filterCommercial) {
        return true;
      }
      if (filterOss) {
        return x.oss === true;
      }
      if (filterCommercial) {
        return x.oss === false;
      }
    }
    var filterByStars = function(x) {
      if (!filters.stars) {
        return true;
      }
      return x.starsCategory === filters.stars;
    }
    var filterByCertifiedKubernetes = function(x) {
      if (!filters.certifiedKubernetes) {
        return true;
      }
      return x.certifiedKubernetes === filters.certifiedKubernetes;
    }
    return data.filter(function(x) {
      return filterByKindCnCf(x) && filterByKindOss(x) && filterByStars(x) && filterByCertifiedKubernetes(x);
    });
  }
);

const getSortedItems = createSelector(
  (state) => getFilteredItems(state),
  (state) => state.main.sortField,
  (state) => state.main.sortDirection,
  function(data, sortField, sortDirection) {
    return _.orderBy(data, function(x) {
      return x[sortField];
    },sortDirection);
  }
);

const getGroupedItems = createSelector(
  (state) => getSortedItems(state),
  (state) => state.main.grouping,
  function(items, grouping) {
    return _.groupBy(items, function(item) {
      return item[grouping];
    });
  }
);


const mapStateToProps = (state) => ({
  groupedItems: getGroupedItems(state)
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
