import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import MainContent from './MainContent';
import groupingLabel from '../utils/groupingLabel';

const getFilteredItems = createSelector(
  (state) => state.main.data,
  (state) => state.main.filters,
  function(data, filters) {
    var filterCncfHostedProject = function(x) {
      if (filters.cncfHostedProject === null) {
        return true;
      }
      return x.cncfHostedProject === filters.cncfHostedProject;
    }
    var filterByOss = function(x) {
      if (filters.oss === null) {
        return true;
      }
      return x.oss === filters.oss;
    }
    var filterByCommercial = function(x) {
      if (filters.commercial === null) {
        return true;
      }
      return x.commercial === filters.commercial;
    }
    var filterByStars = function(x) {
      if (!filters.stars) {
        return true;
      }
      return x.starsCategory === filters.stars;
    }
    var filterByCertifiedKubernetes = function(x) {
      if (filters.certifiedKubernetes === null) {
        return true;
      }
      return x.certifiedKubernetes === filters.certifiedKubernetes;
    }
    var filterByLicense = function(x) {
      if (filters.license === null) {
        return true;
      }
      return x.license === filters.license;
    }
    var filterByMarketCap = function(x) {
      if (filters.marketCap === null) {
        return true;
      }
      return x.marketCapCategory === filters.marketCap;
    }
    var filterByVcFunder = function(x) {
      if (filters.vcFunder.length === 0) {
        return true;
      }
      return filters.vcFunder.indexOf(x.vcFunder) !== -1;
    }
    var filterByCompany = function(x) {
      if (filters.company.length === 0) {
        return true;
      }
      return filters.company.indexOf(x.company) !== -1;
    }
    var filterByHeadquaters = function(x) {
      if (filters.headquaters === null) {
        return true;
      }
      return x.headquaters === filters.headquaters;
    }
    var filterByLandscape = function(x) {
      if (filters.landscape === null) {
        return true;
      }
      return x.landscape === filters.landscape;
    }
    return data.filter(function(x) {
      return filterCncfHostedProject(x) && filterByOss(x) && filterByCommercial(x) && filterByStars(x) && filterByCertifiedKubernetes(x) && filterByLicense(x) && filterByMarketCap(x) && filterByVcFunder(x) && filterByCompany(x) && filterByHeadquaters(x) && filterByLandscape(x);
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
      return item[grouping];
    });
    return _.map(grouped, function(value, key) {
      return {
        header: groupingLabel(grouping, key),
        items: value
      }
    });
  }
);


const mapStateToProps = (state) => ({
  groupedItems: getGroupedItems(state)
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
