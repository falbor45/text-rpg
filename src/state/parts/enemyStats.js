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
    case 'enemyStats/SET_ENEMY':
      return {
          ...state,
        health: action.health,
        maxHealth: action.maxHealth,
        energy: action.energy,
        maxEnergy: action.maxEnergy
      }
    default:
      return state
  }
}