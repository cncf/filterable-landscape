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
        items.push({...node, path: parts.join(' / '), landscape: parts[0]});
      }
    });
    return items;
  }
);

const getGroupedItems = createSelector(
  (state) => getItems(state),
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
