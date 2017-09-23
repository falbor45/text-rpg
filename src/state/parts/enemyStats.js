const initialState = {
  eHealth: null,
  eMaxHealth: null,
  eEnergy: null,
  eMaxEnergy: null,
  eSpeed: null,
  eIsAlive: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'enemyStats/HIT_ENEMY':
      return {
        ...state,
        eHealth: state.eHealth - action.value
      }
    case 'enemyStats/SET_ENEMY':
      return {
          ...state,
        eHealth: action.eHealth,
        eMaxHealth: action.eMaxHealth,
        eEnergy: action.eEnergy,
        eMaxEnergy: action.eMaxEnergy,
        eSpeed: action.eSpeed,
        eIsAlive: true
      }
      case 'enemyStats/HIDE_ENEMY' :
        return {
            ...state,
            eHealth: null,
            eMaxHealth: null,
            eEnergy: null,
            eMaxEnergy: null,
            eIsAlive: false
        }
    default:
      return state
  }
}