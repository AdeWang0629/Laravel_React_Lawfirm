import actions from './actions';

const initialState = {
  rolesData: [],
  permissionData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETROLESSUCCESS:
      return {
        ...state,
        rolesData: action.payload
      }
    case actions.GETPERMISSIONSUCCESS:
      return {
        ...state,
        permissionData: action.payload
      }
    default:
      return state
  }
}

export default Reducer;
