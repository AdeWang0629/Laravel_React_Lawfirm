import actions from './actions';

const initialState = {
  userData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETUSERSUCCESS:
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}

export default Reducer;
