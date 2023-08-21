import actions from './actions';

const initialState = {
  clientTypesData: [],
  trashedData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETCLIENTSSUCCESS:
      return {
        ...state,
        clientTypesData: action.payload.clientTypes,
        trashedData: action.payload.trashedData,
      }
    default:
      return state
  }
}

export default Reducer;
