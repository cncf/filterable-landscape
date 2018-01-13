// We will have all our actions in one file

// State Description (TODO: Add FLOW here!)
// data: null | { .. Data ... }

const initialState = {
  data: null
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

function setData(data) {
  return {
    type: 'Main/SetData',
    data: data
  };
}

function setDataHandler(state, action) {
  return { ...state, data: action.data };
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'Main/SetData':
      return setDataHandler(state, action);
    default:
      return state;
  }
}

export default reducer;
