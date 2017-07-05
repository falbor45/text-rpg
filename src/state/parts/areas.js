const initialState = {
  data: null,
  fetching: false,
  error: null,
  areaRNG: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'areas/FETCH__BEGIN':
      return {
          ...state,
        fetching: true
      }
    case 'areas/FETCH__SUCCESS':
      return {
          ...state,
        fetching: false,
        data: action.data
      }
    case 'areas/FETCH__FAILURE':
      return {
          ...state,
        fetching: false,
        error: action.error
      }
    case 'areas/SET_AREA_RNG':
      return {
        ...state,
        areaRNG: Math.floor(Math.random() * state.data.length)
      }
    default:
      return {
          ...state
      }
  }
}