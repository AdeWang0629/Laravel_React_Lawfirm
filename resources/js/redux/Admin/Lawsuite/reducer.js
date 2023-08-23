import actions from './actions';

const initialState = {
  caseStagesData: [],
  caseTypesData: [],
  clientTypesData: [],
  clientsData: [],
  courtsData: [],
  lawsuiteCasesData: [],
  lawsuitePapersData: [],
  allLawsuitesData: [],
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
    case actions.GETPAPERSSUCCESS:
      return {
        ...state,
        lawsuitePapersData: action.payload.lawsuitePapersData
      }
    case actions.GETALLLAWSUITESSUCCESS:
      return {
        ...state,
        allLawsuitesData: action.payload.lawsuitesData
      }
    default:
      return state
  }
}

export default Reducer;
