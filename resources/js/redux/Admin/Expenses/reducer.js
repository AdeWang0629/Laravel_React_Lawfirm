import actions from './actions';

const initialState = {
  branchesData: [],
  trashedData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETBRANCHESSSUCESS:
      console.log(action.payload.branchesData);
      return {
        ...state,
        branchesData: action.payload.branchesData,
        trashedData: action.payload.trashedData
      }
    default:
      return state
  }
}

export default Reducer;
