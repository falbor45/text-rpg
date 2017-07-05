const initialState = {
  inputValue: '',
  storyOutput: [],
  events: ['fight', 'choiceEvent'],
  eventRNG: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playView/INPUT_CHANGE':
      return {
        ...state,
        inputValue: action.value
      }
    case 'playView/SET_EVENT_RNG':
      return {
        ...state,
        eventRNG: Math.floor(Math.random() * state.events.length)
      }
    case 'playView/SET_STORY_OUTPUT':
      return {
        ...state
      }
    default:
      return state
  }
}