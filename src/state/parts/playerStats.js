const initialState = {
  health: 100,
  maxHealth: 100,
  energy: 20,
  maxEnergy: 20,
  strength: 10,
  wisdom: 10,
  agility: 10,
  constitution: 10,
  attackPowerMin: 2,
  attackPowerMax: 4,
  baseDodgeChance: 5,
  armour: 0,
  damageReduction: 0,
  isAlive: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playerStats/GAIN_ATTACK':
      return {
          ...state,
        attackPower: state.attackPower + action.value
      }
    case 'playerStats/GAIN_STRENGTH':
      return {
          ...state,
        strength: state.strength + action.value
      }
    case 'playerStats/GAIN_WISDOM':
      return {
          ...state,
        wisdom: state.wisdom + action.value
      }
    case 'playerStats/GAIN_AGILITY':
      return {
          ...state,
        agility: state.agility + action.value
      }
    case 'playerStats/GAIN_CONSTITUTION':
      return {
          ...state,
        constitution: state.constitution + action.value
      }
    case 'playerStats/GAIN_HEALTH':
      return {
          ...state,
        health: state.health + action.value
      }
    case 'playerStats/GAIN_MAX_HEALTH':
      return {
          ...state,
        maxHealth: state.maxHealth + action.value
      }
    case 'playerStats/GAIN_ENERGY':
      return {
          ...state,
        energy: state.energy + action.value
      }
    case 'playerStats/GAIN_MAX_ENERGY':
      return {
          ...state,
        maxEnergy: state.maxEnergy + action.value
      }
    case 'playerStats/LOSE_HEALTH':
      return {
          ...state,
        health: state.health - action.value
      }
    case 'playerStats/LOSE_MAX_HEALTH':
      return {
          ...state,
        maxHealth: state.maxHealth - action.value
      }
    case 'playerStats/LOSE_ENERGY':
      return {
        ...state,
        maxEnergy: state.maxEnergy - action.value
      }
    case 'playerStats/LOSE_MAX_ENERGY':
      return {
        ...state,
        maxEnergy: state.maxEnergy - action.value
      }
    case 'playerStats/CALC_ATT_POW_MIN':
      return {
          ...state,
        attackPowerMin: initialState.attackPowerMin + Math.floor((state.strength - 10) / 2)
      }
    case 'playerStats/CALC_ATT_POW_MAX':
      return {
          ...state,
        attackPowerMax: initialState.attackPowerMax + (state.strength - 10)
      }
    case 'playerStats/CALC_BASE_DODGE_CHANCE':
      return {
          ...state,
        baseDodgeChance: state.agility / 2
      }
    case 'playerStats/CALC_ARMOUR':
      return {
        ...state,
        armour: state.armour + Math.floor((state.constitution - 10) / 3)
      }
    case 'playerStats/CALC_DMG_REDUCTION':
      return {
        ...state,
        damageReduction: Math.round(state.armour/(state.armour + 100) * 100)
      }
    case 'playerStats/KILL_PLAYER':
      return {
          ...state,
        isAlive: false
      }
    case 'playerStats/EQUALIZE' :
      if (action.what === 'health') {
        return {
            ...state,
          health: state.maxHealth
        }
      }
      if (action.what === 'energy') {
        return {
            ...state,
          energy: state.maxEnergy
        }
      }
      return {
          ...state
      }
    default:
      return state
  }
}