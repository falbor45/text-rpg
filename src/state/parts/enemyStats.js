const initialState = {
  health: null,
  maxHealth: null,
  energy: null,
  maxEnergy: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'enemyStats/HIT_ENEMY':
      return {
        ...state,
        health: state.health - action.value
      }
    default:
      return state
  }
}