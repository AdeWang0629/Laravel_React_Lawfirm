import actions from './actions';

const initialState = {
  branchesData: [],
  trashedData: [],
  expenseSectionsData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETBRANCHESSSUCESS:
      return {
        ...state,
        branchesData: action.payload.branchesData,
        trashedData: action.payload.trashedData
      }
    case actions.GETEXPENSESECTIONSSUCCESS:
      return {
        ...state,
        expenseSectionsData: action.payload.expenseSectionsData,
        trashedData: action.payload.trashedData
      }
    default:
      return state
  }
}

export default Reducer;
