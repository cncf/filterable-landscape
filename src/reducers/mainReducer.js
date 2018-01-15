// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import { loadData } from './api';

const initialState = {
  data: null,
  filters: {
    cncfHostedProject: null,
    oss: null,
    commercial: null,
    stars: null,
    certifiedKubernetes: 'platform',
    license: null,
    marketCap: null,
    vcFunder: [],
    company: [],
    headquaters: null,
    landscape: null
  },
  grouping: 'cncfHostedProject',
  sortField: 'name',
  sortDirection: 'asc'
};
// thunk
export function loadMainData() {
  return async function (dispatch) {
    const result = await loadData();
    dispatch(setData(result));
  }
}

export function changeFilter(name, value) {
  return function(dispatch) {
    return dispatch(setFilter(name, value));
  }
}

export function changeGrouping(value) {
  return function(dispatch) {
    return dispatch(setGrouping(value));
  }
}
export function changeSortField(value) {
  return function(dispatch) {
    return dispatch(setSortField(value));
  }
}
export function changeSortDirection(value) {
  return function(dispatch) {
    return dispatch(setSortDirection(value));
  }
}

function setData(data) {
  return {
    type: 'Main/SetData',
    data: data
  };
}

function setFilter(name, value) {
  return {
    type: 'Main/SetFilter',
    name: name,
    value: value
  };
}
function setGrouping(value) {
  return {
    type: 'Main/SetGrouping',
    value: value
  };
}
function setSortField(value) {
  return {
    type: 'Main/SetSortField',
    value: value
  };
}
function setSortDirection(value) {
  return {
    type: 'Main/SetSortDirection',
    value: value
  };
}

function setDataHandler(state, action) {
  return { ...state, data: action.data };
}
function setFilterHandler(state, action) {
  return { ...state, filters: {...state.filters, [action.name] : action.value } };
}
function setGroupingHandler(state, action) {
  return {...state, grouping: action.value };
}
function setSortFieldHandler(state, action) {
  return {...state, sortField: action.value };
}
function setSortDirectionHandler(state, action) {
  return {...state, sortDirection: action.value };
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'Main/SetData':
      return setDataHandler(state, action);
    case 'Main/SetFilter':
      return setFilterHandler(state, action);
    case 'Main/SetGrouping':
      return setGroupingHandler(state, action);
    case 'Main/SetSortField':
      return setSortFieldHandler(state, action);
    case 'Main/SetSortDirection':
      return setSortDirectionHandler(state, action);
    default:
      return state;
  }
}

export default reducer;
