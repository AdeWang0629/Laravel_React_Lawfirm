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
  trashedData: []
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
    case actions.GETCASETYPESSUCCESS:
      return {
        ...state,
        caseTypesData: action.payload.caseTypesData,
        trashedData: action.payload.trashedData
      }
    case actions.GETCASELAWSUITESUCCESS:
      return {
        ...state,
        lawsuiteCasesData: action.payload.lawsuitCasesData,
        trashedData: action.payload.trashedData
      }
    default:
      return state
  }
}

export default Reducer;
