// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }
import { loadData } from './api';

const initialState = {
  data: null,
  filters: {
    kind: ['cncfMember'],
    stars: null,
    certifiedKubernetes: 'platform',
    license: null,
    marketCap: null
  }
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
  }
}

function setDataHandler(state, action) {
  return { ...state, data: action.data };
}
function setFilterHandler(state, action) {
  return { ...state, filters: {...state.filters, [action.name] : action.value } };
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'Main/SetData':
      return setDataHandler(state, action);
    case 'Main/SetFilter':
      return setFilterHandler(state, action);
    default:
      return state;
  }
}

export default reducer;
