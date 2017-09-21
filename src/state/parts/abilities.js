const initialState = {
  data: null,
  fetching: false,
  error: null,
  usableAbilities: null,
  usableCommands: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'abilities/FETCH__BEGIN':
      return {
        ...state,
        fetching: true
      }
    case 'abilities/FETCH__SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    case 'abilities/FETCH__FAILURE':
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case 'abilities/FILTER_USABLE_ABILITIES':
      return {
        ...state,
        usableAbilities: action.data,
        usableCommands: action.commands
      }
    default:
      return {
        ...state
      }
  }
}