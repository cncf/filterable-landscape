import { initialState } from '../reducers/mainReducer';
import _ from 'lodash';
import qs from 'query-string';
export function filtersToUrl({filters}) {
  const params = {};
  if (filters.cncfHostedProject !== initialState.filters.cncfHostedProject) {
    params.cncf = filters.cncfHostedProject === true ? 'yes' : 'no';
  }
  if (filters.oss !== initialState.filters.oss) {
    params.oss = filters.oss === true ? 'yes' : 'no';
  }
  if (filters.commercial !== initialState.filters.commercial) {
    params.commercial = filters.commercial === true ? 'yes' : 'no';
  }
  if (filters.stars !== initialState.filters.stars) {
    console.info(filters.stars, initialState.stars);
    params.stars = filters.stars;
  }
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
  if (args.cncf) {
    if (args.cncf === 'yes') {
      newParameters.filters.cncfHostedProject = true;
    }
    if (args.cncf === 'no') {
      newParameters.filters.cncfHostedProject = false;
    }
    if (args.cncf === 'any') {
      newParameters.filters.cncfHostedProject = null;
    }
  }
  if (args.oss) {
    if (args.oss === 'yes') {
      newParameters.filters.oss = true;
    }
    if (args.oss === 'no') {
      newParameters.filters.oss = false;
    }
    if (args.oss === 'any') {
      newParameters.filters.oss = null;
    }
  }
  if (args.commercial) {
    if (args.commercial === 'yes') {
      newParameters.filters.commercial = true;
    }
    if (args.commercial === 'no') {
      newParameters.filters.commercial = false;
    }
    if (args.commercial === 'any') {
      newParameters.filters.commercial = null;
    }
  }
  return newParameters;
}
