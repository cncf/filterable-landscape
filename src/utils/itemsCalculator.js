import { createSelector } from 'reselect';
import _ from 'lodash';
import { filterFn, getGroupingValue } from '../types/fields';
import groupingLabel from '../utils/groupingLabel';
import groupingOrder from '../utils/groupingOrder';
import formatAmount from '../utils/formatAmount';
import formatNumber from 'format-number';

const getFilteredItems = createSelector(
  (state) => state.main.data,
  (state) => state.main.filters,
  function(data, filters) {
    var filterCncfHostedProject = filterFn({field: 'cncfRelation', filters});
    var filterByStars = filterFn({field: 'stars', filters});
    // var filterByCertifiedKubernetes = filterFn({field: 'certifiedKubernetes', filters});
    var filterByLicense = filterFn({field: 'license', filters});
    var filterByMarketCap = filterFn({field: 'marketCap', filters});
    // var filterByVcFunder = filterFn({field: 'vcFunder', filters});
    var filterByOrganization = filterFn({field: 'organization', filters});
    var filterByHeadquarters = filterFn({field: 'headquarters', filters});
    var filterByLandscape = filterFn({field: 'landscape', filters});
    return data.filter(function(x) {
      return filterCncfHostedProject(x) && filterByStars(x) && /* filterByCertifiedKubernetes(x) && */ filterByLicense(x) && filterByMarketCap(x) && /* filterByVcFunder(x)  && */ filterByOrganization(x) && filterByHeadquarters(x) && filterByLandscape(x);
    });
  }
);

const getExtraFields = createSelector(
  (state) => getFilteredItems(state),
  function(data) {
    return _.map(data, function(data) {
      const hasStars = data.stars !== 'N/A' && data.stars !== 'Not Entered Yet';
      const hasMarketCap = data.marketCap !== 'N/A' && data.marketCap !== 'Not Entered Yet';
      return { ...data,
        starsPresent: hasStars ,
        starsAsText: hasStars ? formatNumber({integerSeparator: ','})(data.stars) : '',
        marketCapPresent: hasMarketCap,
        marketCapAsText: formatAmount(data.marketCap)
      };
    });
  }
);

const getSortedItems = createSelector(
  (state) => getExtraFields(state),
  (state) => state.main.sortField,
  (state) => state.main.sortDirection,
  function(data, sortField, sortDirection) {
    const emptyItemsNA = data.filter(function(x) {
      return x[sortField] === 'N/A';
    });
    const emptyItemsNotEnteredYet = data.filter(function(x) {
      return x[sortField] === 'Not Entered Yet';
    });
    const emptyItemsUndefined = data.filter(function(x) {
      return _.isUndefined(x[sortField]);
    });
    const normalItems = data.filter(function(x) {
      return x[sortField] !== 'N/A' && x[sortField] !== 'Not Entered Yet' && !_.isUndefined(x[sortField]);
    });
    const sortedViaMainSort =  _.orderBy(normalItems, function(x) {
      var result = x[sortField];
      if (_.isString(result)) {
        result = result.toLowerCase();
      }
      return result;
    },sortDirection);
    const sortedViaName1 = _.orderBy(emptyItemsNA, function(x) {
      return x.name.toLowerCase();
    });
    const sortedViaName2 = _.orderBy(emptyItemsNotEnteredYet, function(x) {
      return x.name.toLowerCase();
    });
    const sortedViaName3 = _.orderBy(emptyItemsUndefined, function(x) {
      return x.name.toLowerCase();
    });
    return sortedViaMainSort.concat(sortedViaName1).concat(sortedViaName2).concat(sortedViaName3);
  }
);

const getGroupedItems = createSelector(
  (state) => getSortedItems(state),
  (state) => state.main.grouping,
  function(items, grouping) {
    if (grouping === 'no') {
      return [{
        key: 'key',
        header: 'No Grouping',
        items: items
      }]
    }

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
export default getGroupedItems;
