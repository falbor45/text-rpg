const initialState = {
  health: 100,
  maxHealth: 100,
  energy: 20,
  maxEnergy: 20,
  strength: 10,
  wisdom: 10,
  agility: 10,
  constitution: 10,
  attackPower: 2
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playerStats/HIT_PLAYER':
      return {
          ...state,
        health: state.health - action.value
      }
    case 'playerStats/GAIN_ATTACK':
      return {
          ...state,
        attackPower: state.attackPower + action.value
      }
    default:
      return state
  }
}