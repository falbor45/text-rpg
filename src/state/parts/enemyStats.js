const initialState = {
  eName: null,
  eHealth: null,
  eMaxHealth: null,
  eSpeed: null,
  eAttackPowerMin: null,
  eAttackPowerMax: null,
  eAccuracy: null,
  aPattern: null,
  eExperience: 0,
  eIsAlive: false,
  eLocked: false
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
        eName: action.eName,
        eHealth: action.eHealth,
        eMaxHealth: action.eMaxHealth,
        eSpeed: action.eSpeed,
        eAttackPowerMin: action.eAttackPowerMin,
        eAttackPowerMax: action.eAttackPowerMax,
        eAccuracy: action.eAccuracy,
        aPattern: action.aPattern,
        eExperience: action.eExperience,
        eIsAlive: true,
        eLocked: true,
      }
      case 'enemyStats/HIDE_ENEMY' :
        return {
            ...state,
            eName: null,
            eHealth: null,
            eMaxHealth: null,
            eSpeed: null,
            eAttackPowerMin: null,
            eAttackPowerMax: null,
            eAccuracy: null,
            aPattern: null,
            eExperience: 0,
            eIsAlive: false,
            eLocked: false
        }
    default:
      return state
  }
}