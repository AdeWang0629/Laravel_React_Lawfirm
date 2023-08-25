import actions from './actions';

const initialState = {
  caseSessionsData: [],
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETCASESESSIONSSUCESS:
      return {
        ...state,
        caseSessionsData: action.payload.caseSessionsData,
      }
    default:
      return state
  }
}

export default Reducer;
