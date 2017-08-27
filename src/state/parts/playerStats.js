const initialState = {
  health: 100,
  maxHealth: 100,
  energy: 20,
  maxEnergy: 20,
  attackPower: 2
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playerStats/HIT_PLAYER':
      return {
          ...state,
        health: state.health - action.value
      }
    default:
      return state
  }
}