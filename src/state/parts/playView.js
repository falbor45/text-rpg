const initialState = {
  inputValue: '',
  storyOutput: [],
  battleLogOutput: [],
  events: ['fight', 'choiceEvent'],
  eventRNG: 0,
  possibleActions: ['explore'],
  days: 1,
  dayPhase: 0,
  timeOfDayArr: [
     'noon',
     'afternoon',
     'evening',
     'night',
     'night',
     'morning'
  ],
  timeOfDay: 'noon'
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
    case 'playView/FORCE_UPDATE':
      return {
          ...state,
      }
    case 'playView/FORWARD_TIME':
      return {
        ...state,
        dayPhase: state.dayPhase === 5 ? 0 : state.dayPhase + 1,
        timeOfDay: state.timeOfDayArr[state.dayPhase],
        days: state.dayPhase === 5 ? state.days + 1 : state.days
      }
    default:
      return state
  }
}