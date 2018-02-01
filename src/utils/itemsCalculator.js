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
    var filterCncfHostedProject = filterFn({field: 'cncfProject', filters});
    var filterByOss = filterFn({field: 'oss', filters});
    var filterByStars = filterFn({field: 'stars', filters});
    var filterByCertifiedKubernetes = filterFn({field: 'certifiedKubernetes', filters});
    var filterByLicense = filterFn({field: 'license', filters});
    var filterByMarketCap = filterFn({field: 'marketCap', filters});
    // var filterByVcFunder = filterFn({field: 'vcFunder', filters});
    var filterByCompany = filterFn({field: 'company', filters});
    var filterByHeadquarters = filterFn({field: 'headquarters', filters});
    var filterByLandscape = filterFn({field: 'landscape', filters});
    return data.filter(function(x) {
      return filterCncfHostedProject(x) && filterByOss(x) && filterByStars(x) && filterByCertifiedKubernetes(x) && filterByLicense(x) && filterByMarketCap(x) && /* filterByVcFunder(x)  && */ filterByCompany(x) && filterByHeadquarters(x) && filterByLandscape(x);
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
    const sortedViaMainSort =  _.orderBy(data, function(x) {
      var result = x[sortField];
      if (_.isString(result)) {
        result = result.toLowerCase();
      }
      return result;
    },sortDirection);
    const sortedViaName = _.orderBy(data, function(x) {
      return x.name.toLowerCase();
    });
    return _.orderBy(sortedViaMainSort, function(x) {
      if (x[sortField] === 'N/A') {
        return 10000 + sortedViaName.indexOf(x);
      }
      if (x[sortField] === 'Not Entered Yet') {
        return 20000 + sortedViaName.indexOf(x);
      }
      return sortedViaMainSort.indexOf(x);
    });
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
