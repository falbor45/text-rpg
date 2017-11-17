const initialState = {
  data: null,
  fetching: false,
  error: null,
  enemyRNG: 0,
  aPatternI: 0,
  pattern: null
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
    case 'enemies/SET_PATTERN':
      return {
        ...state,
        pattern: action.pattern
      }
    case 'enemies/SET_ENEMY_RNG':
      return {
          ...state,
        enemyRNG: Math.floor(Math.random() * action.value)
      }
    case 'enemies/NEXT_ATT_PATTERN':
      return {
        ...state,
        aPatternI: state.aPatternI === state.pattern.length - 1 ? 0 : (state.aPatternI + 1)
      }
    default:
      return {
        ...state
      }
  }
}