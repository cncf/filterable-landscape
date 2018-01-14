// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }

const initialState = {
  data: null,
  filters: {
    kind: ['cncfMember']
  }
};
// thunk
export function loadMainData() {
  return function (dispatch) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        dispatch(setData({
          x: 1,
          y: 2
        }));
        resolve();
      }, 1000);
    });
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
