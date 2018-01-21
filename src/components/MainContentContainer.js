import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import MainContent from './MainContent';
import groupingLabel from '../utils/groupingLabel';
import groupingOrder from '../utils/groupingOrder';
import { filterFn, getGroupingValue } from '../types/fields';

const getFilteredItems = createSelector(
  (state) => state.main.data,
  (state) => state.main.filters,
  function(data, filters) {
    var filterCncfHostedProject = filterFn({field: 'cncfHostedProject', filters});
    var filterByOss = filterFn({field: 'oss', filters});
    var filterByCommercial = filterFn({field: 'commercial', filters});
    var filterByStars = filterFn({field: 'stars', filters});
    var filterByCertifiedKubernetes = filterFn({field: 'certifiedKubernetes', filters});
    var filterByLicense = filterFn({field: 'license', filters});
    var filterByMarketCap = filterFn({field: 'marketCap', filters});
    var filterByVcFunder = filterFn({field: 'vcFunder', filters});
    var filterByCompany = filterFn({field: 'company', filters});
    var filterByHeadquarters = filterFn({field: 'headquarters', filters});
    var filterByLandscape = filterFn({field: 'landscape', filters});
    return data.filter(function(x) {
      return filterCncfHostedProject(x) && filterByOss(x) && filterByCommercial(x) && filterByStars(x) && filterByCertifiedKubernetes(x) && filterByLicense(x) && filterByMarketCap(x) && filterByVcFunder(x) && filterByCompany(x) && filterByHeadquarters(x) && filterByLandscape(x);
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
    const grouped = _.groupBy(items, function(item) {
      return getGroupingValue({item: item, grouping: grouping});
    });
    return _.orderBy(_.map(grouped, function(value, key) {
      return {
        key: key,
        header: groupingLabel(grouping, key),
        items: value
      }
    }), (group) => groupingOrder(grouping)(group.key));
  }
);


const mapStateToProps = (state) => ({
  groupedItems: getGroupedItems(state)
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
