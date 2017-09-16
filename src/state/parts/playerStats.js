const initialState = {
  name: '',
  isCreated: false,
  level: 1,
  health: 100,
  maxHealth: 100,
  maxHealthBonus: 0,
  energy: 20,
  maxEnergy: 20,
  experience: 0,
  maxExperience: null,
  statPoints: 0,
  strength: 10,
  wisdom: 10,
  agility: 10,
  constitution: 10,
  attackPowerMin: 2,
  attackPowerMax: 4,
  baseDodgeChance: 5,
  speed: 3,
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
        maxHealth: state.maxHealthBonus + action.value
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
    case 'playerStats/GAIN_EXPERIENCE':
      return {
        ...state,
        experience: state.experience > state.maxExperience ? state.experience - state.maxExperience : state.experience + action.value,
        level: state.experience > state.maxExperience ? state.level + 1 : state.level,
        statPoints: state.experience > state.maxExperience ? state.statPoints + 1 : state.statPoints
      }
    case 'playerStats/GAIN_STAT_POINT':
      return {
        ...state,
        statPoints: state.statPoints + action.value
      }
    case 'playerStats/LOSE_HEALTH':
      return {
          ...state,
        health: state.health - action.value
      }
    case 'playerStats/LOSE_MAX_HEALTH':
      return {
          ...state,
        maxHealth: state.maxHealthBonus - action.value
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
    case 'playerStats/CALCULATE_STATS':
      return {
        ...state,
        attackPowerMin: initialState.attackPowerMin + Math.floor((state.strength - 10) / 2),
        attackPowerMax: initialState.attackPowerMax + (state.strength - 10),
        baseDodgeChance: state.agility / 2,
        armour: initialState.armour + Math.floor((state.constitution - 10) / 3),
        damageReduction: Math.round(state.armour/(state.armour + 100) * 100),
        maxExperience: Math.round(40 * Math.exp(0.9 + (state.level/10))),
        speed: Math.round(state.agility / 3),
        maxHealth: initialState.maxHealth + state.maxHealthBonus + ((state.constitution - 10) * 5)
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
    case 'playerStats/STAT_ROLL':
      let strength = 10;
      let agility = 10;
      let wisdom = 10;
      let constitution = 10;
      let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      for (let i=20; i>=0; i--) {
        let random = Math.random() * arr.length
        let randomS = Math.floor(Math.random() * 4)
        if (randomS === 0) {
          strength = strength + arr.splice(random, random).length
        }
        if (randomS === 1) {
          agility = agility + arr.splice(random, random).length
        }
        if (randomS === 2) {
          wisdom = wisdom + arr.splice(random, random).length
        }
        if (randomS === 3) {
          constitution = constitution + arr.splice(random, random).length
        }
      }
      return {
        ...state,
        strength: strength,
        agility: agility,
        wisdom: wisdom,
        constitution: constitution
      }
    case 'playerStats/CREATE_CHARACTER':
      return {
        ...state,
        isCreated: true,
        name: action.value
      }
    default:
      return state
  }
}