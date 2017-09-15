const initialState = {
  health: null,
  maxHealth: null,
  energy: null,
  maxEnergy: null,
  speed: null,
  isAlive: false
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
        maxEnergy: action.maxEnergy,
        speed: action.speed,
        isAlive: true
      }
      case 'enemyStats/HIDE_ENEMY' :
        return {
            ...state,
            health: null,
            maxHealth: null,
            energy: null,
            maxEnergy: null,
            isAlive: false
        }
    default:
      return state
  }
}