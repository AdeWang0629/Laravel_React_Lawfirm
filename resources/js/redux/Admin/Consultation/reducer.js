import actions from './actions';

const initialState = {
  consultationsData: [],
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GETCONSULTATIONSSUCESS:
      return {
        ...state,
        consultationsData: action.payload.consultationsData,
      }
    default:
      return state
  }
}

export default Reducer;
