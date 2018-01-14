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
          stars: _.random(10000),
          certifiedKubernetes: _.sample(['platform', 'distribution', 'platformOrDistribution', 'notCertified']),
          license: _.sample(['gpl-v2', 'gpl-v3', 'mit', 'apache', 'commercial']),
          marketCap: _.random(1000),
          vcFunder: _.sample(['ycombinator', 'other1', 'other2', 'other3']),
          headquaters: _.sample(['NY', 'San Francisco', 'West Palm Beacch'])
        });
      }
    });
    return items;
  }
);
const getFilteredItems = getItems;

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
  function(items) {
    return _.groupBy(items, function(item) {
      return item.landscape;
    });
  }
);


const mapStateToProps = (state) => ({
  groupedItems: getGroupedItems(state)
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
