import actions from './actions';

const initialState = {
  branchesData: [],
  trashedData: [],
  expenseSectionsData: [],
  paymentsData: []
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
    case actions.GETPAYMENTSSUCESS:
      return {
        ...state,
        paymentsData: action.payload.paymentsData,
        expenseSectionsData: action.payload.expenseSectionsData,
        branchesData: action.payload.branchesData
      }
    default:
      return state
  }
}

export default Reducer;
