const initialState = {
  data: null,
  fetching: false,
  error: null,
  choiceEventRNG: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'choiceEvents/FETCH__BEGIN':
      return {
        ...state,
        fetching: true
      }
    case 'choiceEvents/FETCH__SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    case 'choiceEvents/FETCH__FAILURE':
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case 'choiceEvents/SET_CHOICE_EVENT_RNG':
      return {
          ...state,
        choiceEventRNG: Math.floor(Math.random() * state.data.length)
      }
    default:
      return {
        ...state
      }
  }
}