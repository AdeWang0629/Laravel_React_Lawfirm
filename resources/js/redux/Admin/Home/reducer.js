import actions from './actions';

const initialState = {
  lawsuites: null,
  lawsuitesCount: null,
  consultationsCount: null,
  clientsCount: null,
  caseSessionCount: null,
  receipts: null,
  lawsuitesPayments: null,
  consultationPayments: null,
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETHOMESUCCESS:
      return {
        ...state,
        lawsuites: action.payload.lawsuites,
        lawsuitesCount: action.payload.lawsuitesCount,
        consultationsCount: action.payload.consultationsCount,
        clientsCount: action.payload.clientsCount,
        caseSessionCount: action.payload.caseSessionCount,
        receipts: action.payload.receipts,
        lawsuitesPayments: action.payload.lawsuitesPayments,
        consultationPayments: action.payload.consultationPayments
      }
    default:
      return state
  }
}

export default Reducer;
