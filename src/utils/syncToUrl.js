import { initialState } from '../reducers/mainReducer';
import _ from 'lodash';
import qs from 'query-string';
import fields from '../types/fields';

export function filtersToUrl({filters, grouping, sortField, sortDirection}) {
  const params = {};
  var fieldNames = _.keys(fields);
  _.each(fieldNames, function(field) {
    addFieldToParams({field: field, filters: filters, params: params});
  });
  addGroupingToParams({grouping: grouping, params: params});
  addSortFieldToParams({sortField: sortField, params: params});
  addSortDirectionToParams({sortDirection: sortDirection, params: params});
  if (_.isEmpty(params)) {
    return '/';
  }
  const filtersPart = qs.stringify(params);
  return '/s/' + filtersPart;
}
export function parseUrl(url) {
  const args = qs.parse(url);
  const newParameters = {
    filters: {

    }
  };
  var fieldNames = _.keys(fields);
  _.each(fieldNames, function(field) {
    setFieldFromParams({
      field: field,
      params: args,
      filters: newParameters.filters
    });
  });
  setGroupingFromParams({newParameters, params: args });
  setSortFieldFromParams({newParameters, params: args });
  setSortDirectionFromParams({newParameters, params: args });
  return newParameters;
}

function addFieldToParams({field, filters, params}) {
  var value = filters[field];
  const fieldInfo = fields[field];
  if (JSON.stringify(value) !== JSON.stringify(initialState.filters[field])) {
    if (!_.isArray(value)) {
      value = [value];
    }
    const urlValues = value.map(function(v){
      const valueInfo = _.find(fieldInfo.values, {id: v});
      return valueInfo.url
    })
    params[fieldInfo.url] = urlValues.join(',');
  }
}
function addGroupingToParams({grouping, params}) {
  const value = grouping;
  if (value !== initialState.grouping) {
    const fieldInfo = fields[value];
    params['grouping'] = fieldInfo.url;
  }
}
function addSortFieldToParams({sortField, params}) {
  const value = sortField;
  if (value !== initialState.sortField) {
    const fieldInfo = fields[value];
    params['sortField'] = fieldInfo.url;
  }
}
function addSortDirectionToParams({sortDirection, params}) {
  const value = sortDirection;
  if (value !== initialState.sortDirection) {
    params['sortDirection'] = value;
  }
}

function setFieldFromParams({field, filters, params}) {
  const fieldInfo = fields[field];
  if (!fieldInfo) {
    return;
  }
  const urlValue = params[fieldInfo.url];
  if (!urlValue) {
    return;
  }
  const parts = urlValue.split(',');
  const values = parts.map(function(part) {
    return _.find(fieldInfo.values, function(x) {
      return x.url.toLowerCase() === part.toLowerCase();
    });
  }).filter(function(x) { return !!x}).map(function(x) {
    return x.id;
  });
  const value = fieldInfo.isArray ? values : values[0];
  if (!_.isUndefined(value)) {
    filters[field] = value;
  }
}
function setGroupingFromParams({ newParameters, params}) {
  const urlValue = params.grouping;
  if (!urlValue) {
    return;
  }
    const fieldInfo =  _.find(_.values(fields), function(x) {
      return x.url.toLowerCase() === urlValue.toLowerCase();
    });
  if (!_.isUndefined(fieldInfo)) {
    newParameters.grouping = fieldInfo.id;
  }
}
function setSortFieldFromParams({ newParameters, params}) {
  const urlValue = params.sortField;
  if (!urlValue) {
    return;
  }
    const fieldInfo =  _.find(_.values(fields), function(x) {
      return x.url.toLowerCase() === urlValue.toLowerCase();
    });
  if (!_.isUndefined(fieldInfo)) {
    newParameters.sortField = fieldInfo.id;
  }
}

function setSortDirectionFromParams({ newParameters, params}) {
  const urlValue = params.sortField;
  if (!urlValue) {
    return;
  }
  const options = ['asc', 'desc'];
  const sortDirection =  _.find(options, function(x) {
    return x.toLowerCase() === urlValue.toLowerCase();
  });
  if (!_.isUndefined(sortDirection)) {
    newParameters.sortDirection = sortDirection;
  }
}