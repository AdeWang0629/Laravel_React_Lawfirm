import actions from './actions';

const initialState = {
  usersData: [],
  userData: null
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETUSERSSUCCESS:
      return {
        ...state,
        usersData: action.payload
      }
    case actions.SHOWUSERSUCCESS:
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}

export default Reducer;
