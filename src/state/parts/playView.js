const initialState = {
  inputValue: '',
  storyOutput: [],
  battleLogOutput: [],
  events: ['fight', 'choiceEvent'],
  chosenEvent: null,
  possibleActions: ['explore'],
  map: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,0,9,9,9,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,8,8,8,8,8,8,8,8,9,9,9,9,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,8,8,8,8,8,8,8,8,8,8,9,9,0,3,3],
    [0,0,0,0,0,0,0,0,0,0,9,9,9,8,8,8,8,8,6,6,6,6,6,8,8,8,8,9,9,0,0,3],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,8,8,8,6,6,6,6,6,6,6,8,8,8,0,0,3,3],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,8,8,8,6,6,6,6,6,6,6,6,6,8,8,8,0,3,3,0],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,8,8,8,6,6,6,6,6,6,6,6,6,3,3,3,3,3,0,0],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,8,8,8,6,6,6,6,6,6,6,6,6,0,0,3,3,0,0,0],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,9,8,8,6,6,6,6,6,6,6,6,6,0,3,3,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,0,6,6,6,6,6,6,6,0,0,3,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,6,6,6,0,0,0,0,0,3,3,2,2,2,0],
    [0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0],
    [0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,2,2,2,2,0],
    [0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,2,2,2,0,0],
    [0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,2,2,2,1,0],
    [0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,16,16,16,0,0,0,0,0,0,0,0,2,2,1,1],
    [0,0,0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,0,0,0,0,0,2,0,1,1],
    [0,0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,0,0,0,0,0,0,0,1,1],
    [0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,0,0,0,0,0,0,0,1,1],
    [0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,0,0,0,0,0,0,1,1,1],
    [0,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,0,0,0,0,0,0,0,0,1,1,0],
    [0,0,16,16,16,16,16,16,16,16,16,16,0,0,0,0,16,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,16,16,16,16,0,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,16,16,16,16,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0],
    [0,0,20,20,20,0,0,0,0,0,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0],
    [0,20,20,20,20,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,17,17,17,17,17,17,0,0,0,0,0,0],
    [20,20,20,20,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,0,0,0,0,0,0],
    [20,20,20,20,19,19,19,19,19,19,0,0,0,0,0,18,18,18,18,0,17,17,17,17,17,0,0,0,0,0,0,0],
    [0,20,0,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,0,0,0,0,0,0,0],
    [0,0,0,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,0,0,0,0,0,0,0],
    [0,0,0,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,19,19,19,19,19,19,19,0,0,0,18,18,18,18,18,18,18,0,0,0,0,0,0,0,0,0,0]
  ],
  posY: 23,
  posX: 30,
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
    case 'playView/SET_EVENT':
      // Possible choice event drop

      // let eventRNG = Math.floor(Math.random() * state.events.length)
      return {
        ...state,
        // chosenEvent: state.events[eventRNG]
        chosenEvent: 'fight'
      }
    case 'playView/RESET_EVENT':
      return {
        ...state,
        chosenEvent: null
      }
    case 'playView/SET_STORY_OUTPUT':
      return {
        ...state
      }
    case 'playView/FORCE_UPDATE':
      return {
          ...state,
      }
    case 'playView/POSSIBLE_ACTIONS':
      let usableAbilities = action.abilities.filter(i => i.passive === false)
      let possibleActions = [];
      if (state.chosenEvent === 'fight') {
        possibleActions = ['attack']
        for (let i = 0; i < usableAbilities.length; i++) {
            possibleActions.push(usableAbilities[i].command);
        }
      }
      if (state.chosenEvent === 'choiceEvent') {
        possibleActions = ['choose']
      }
      if (state.chosenEvent === null) {
        if (state.map[state.posY + 1][state.posX] !== 0) {
          possibleActions.push('south');
        }
        if (state.map[state.posY - 1][state.posX] !== 0) {
          possibleActions.push('north');
        }
        if (state.map[state.posY][state.posX + 1] !== 0) {
          possibleActions.push('east');
        }
        if (state.map[state.posY][state.posX - 1] !== 0) {
          possibleActions.push('west');
        }
      }
      return {
        ...state,
        possibleActions: possibleActions
      }
    case 'playView/UPDATE_POSITION':
      let previousArea = state.map[state.posY][state.posX];
      let posX = state.posX;
      let posY = state.posY;
      let storyOutput = state.storyOutput;
      if (action.direction === 'north') {
        posY -= 1;
      }
      if (action.direction === 'south') {
        posY += 1;
      }
      if (action.direction === 'east') {
        posX += 1;
      }
      if (action.direction === 'west') {
        posX -= 1;
      }
      if (state.map[posY][posX] !== previousArea) {
        storyOutput.push(action.areas[state.map[posY][posX] - 1].description)
      }
      console.log(posY, posX)
      return {
        ...state,
        posX: posX,
        posY: posY
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