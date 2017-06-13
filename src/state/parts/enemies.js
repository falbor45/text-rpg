const initialState = {
  data: null,
  fetching: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'enemies/FETCH__BEGIN':
      return {
        ...state,
        fetching: true
      }
    case 'enemies/FETCH__SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    case 'enemies/FETCH__FAILURE':
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return {
        ...state
      }
  }
}