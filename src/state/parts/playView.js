const initialState = {
  inputValue: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playView/INPUT_CHANGE':
      return {
        ...state,
        inputValue: action.value
      }
    default:
      return state
  }
}