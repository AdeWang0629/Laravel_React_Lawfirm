import actions from './actions';

const initialState = {
  caseStagesData: [],
  caseTypesData: [],
  clientTypesData: [],
  clientsData: [],
  courtsData: [],
  lawsuiteCasesData: []
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETCREATELAWSUITESSUCESS:
      return {
        ...state,
        caseStagesData: action.payload.caseStagesData,
        caseTypesData: action.payload.caseTypesData,
        clientTypesData: action.payload.clientTypesData,
        clientsData: action.payload.clientsData,
        courtsData: action.payload.courtsData,
        lawsuiteCasesData: action.payload.lawsuiteCasesData
      }
    default:
      return state
  }
}

export default Reducer;
