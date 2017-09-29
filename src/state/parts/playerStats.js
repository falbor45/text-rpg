const initialState = {
  pName: '',
  pIsCreated: false,
  pLevel: 1,
  pHealth: 100,
  pMaxHealth: 100,
  pMaxHealthBonus: 0,
  pEnergy: 20,
  pMaxEnergy: 20,
  pMaxEnergyBonus: 0,
  pExperience: 0,
  pMaxExperience: null,
  pStatPoints: 0,
  pStrength: 10,
  pStrengthBase: 10,
  pWisdom: 10,
  pWisdomBase: 10,
  pAgility: 10,
  pAgilityBase: 10,
  pConstitution: 10,
  pConstitutionBase: 10,
  pAttackPowerMin: 2,
  pAttackPowerMax: 4,
  pMagicDamage: 0,
  pBaseDodgeChance: 5,
  pSpeed: 3,
  pArmour: 0,
  pDamageReduction: 0,
    helm: null,
    bodyArmour: null,
    leggings: null,
    boots: null,
    amulet: null,
    ring: null,
    belt: null,
    weapon: null,
  pIsAlive: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'playerStats/GAIN_ATTACK':
      return {
          ...state,
        pAttackPowerMin: state.pAttackPowerMin + action.value,
        pAttackPowerMax: state.pAttackPowerMax + action.value
      }
    case 'playerStats/GAIN_STRENGTH':
      return {
          ...state,
        pStrengthBase: state.pStrengthBase + action.value
      }
    case 'playerStats/GAIN_WISDOM':
      return {
          ...state,
        pWisdomBase: state.pWisdomBase + action.value
      }
    case 'playerStats/GAIN_AGILITY':
      return {
          ...state,
        pAgilityBase: state.pAgilityBase + action.value
      }
    case 'playerStats/GAIN_CONSTITUTION':
      return {
          ...state,
        pConstitutionBase: state.pConstitutionBase + action.value
      }
    case 'playerStats/GAIN_HEALTH':
      return {
          ...state,
        pHealth: state.pHealth + action.value
      }
    case 'playerStats/GAIN_MAX_HEALTH':
      return {
          ...state,
        pMaxHealthBonus: state.pMaxHealthBonus + action.value
      }
    case 'playerStats/GAIN_ENERGY':
      return {
          ...state,
        pEnergy: state.pEnergy + action.value
      }
    case 'playerStats/GAIN_MAX_ENERGY':
      return {
          ...state,
        pMaxEnergyBonus: state.pMaxEnergyBonus + action.value
      }
    case 'playerStats/GAIN_EXPERIENCE':
      return {
        ...state,
        pExperience: state.pExperience > state.pMaxExperience ? state.pExperience - state.pMaxExperience : state.pExperience + action.value,
        pLevel: state.pExperience > state.pMaxExperience ? state.pLevel + 1 : state.pLevel,
        pStatPoints: state.pExperience > state.pMaxExperience ? state.pStatPoints + 1 : state.pStatPoints
      }
    case 'playerStats/GAIN_STAT_POINT':
      return {
        ...state,
        pStatPoints: state.pStatPoints + action.value
      }
    case 'playerStats/LOSE_HEALTH':
      return {
          ...state,
        pHealth: state.pHealth - action.value
      }
    case 'playerStats/LOSE_MAX_HEALTH':
      return {
          ...state,
        pMaxHealth: state.pMaxHealthBonus - action.value
      }
    case 'playerStats/LOSE_ENERGY':
      return {
        ...state,
        pEnergy: state.pEnergy - action.value
      }
    case 'playerStats/LOSE_MAX_ENERGY':
      return {
        ...state,
        pMaxEnergy: state.pMaxEnergy - action.value
      }
    case 'playerStats/CALCULATE_STATS':
      let eqBonusCalc = (what) => {
        let result = 0;
        for (let i = 0; i < eqArr.length; i++) {
          result = result + eqArr[i][what]
        }
        return result
      }
      let eqArr = [state.helm, state.bodyArmour, state.leggings, state.boots, state.amulet, state.ring, state.belt, state.weapon].filter((e) => e !== null)
      let eqArmour = eqBonusCalc('armour')
      let eqAttackPowerMin = eqBonusCalc('attackPowerMin')
      let eqAttackPowerMax = eqBonusCalc('attackPowerMax')
      let eqSpeed = eqBonusCalc('speed')
      let eqMaxHealth = eqBonusCalc('maxHealthBonus')
      let eqMaxEnergy = eqBonusCalc('maxEnergyBonus')
      let eqMagicDamage = eqBonusCalc('magicDamage')
      let eqStrength = eqBonusCalc('strength')
      let eqWisdom = eqBonusCalc('wisdom')
      let eqAgility = eqBonusCalc('agility')
      let eqConstitution = eqBonusCalc('constitution')
      console.log(`Strength: ${eqStrength}, Wisdom: ${eqWisdom}, Agility: ${eqAgility}, Constitution: ${eqConstitution}`)
      return {
        ...state,
        pAttackPowerMin: initialState.pAttackPowerMin + Math.floor((state.pStrength - 10) / 2) + eqAttackPowerMin,
        pAttackPowerMax: initialState.pAttackPowerMax + (state.pStrength - 10) + eqAttackPowerMax,
        pBaseDodgeChance: state.pAgility / 2,
        pArmour: initialState.pArmour + Math.floor((state.pConstitution - 10) / 3) + eqArmour,
        pDamageReduction: Math.round(state.pArmour/(state.pArmour + 100) * 100),
        pMaxExperience: Math.round(40 * Math.exp(0.9 + (state.pLevel/10))),
        pSpeed: Math.round((state.pAgility / 3) + eqSpeed),
        pMaxHealth: initialState.pMaxHealth + state.pMaxHealthBonus + ((state.pConstitution - 10) * 5) + eqMaxHealth,
        pMaxEnergy: initialState.pMaxEnergy + state.pMaxEnergyBonus + ((state.pWisdom - 10) * 2) + eqMaxEnergy,
        pMagicDamage: initialState.pMagicDamage + (state.pWisdom * 2.5) + eqMagicDamage,
        pStrength: state.pStrengthBase + eqStrength,
        pWisdom: state.pWisdomBase + eqWisdom,
        pAgility: state.pAgilityBase + eqAgility,
        pConstitution: state.pConstitutionBase + eqConstitution
      }
    case 'playerStats/EQUIP_ITEM':
      let itemType = action.itemType === 'helms' ? 'helm' :
        action.itemType === 'bodyArmours' ? 'bodyArmour' :
          action.itemType === 'leggings' ? 'leggings' :
            action.itemType === 'boots' ? 'boots' :
              action.itemType === 'amulets' ? 'amulet' :
                action.itemType === 'rings' ? 'ring' :
                  action.itemType === 'belts' ? 'belt' :
                    action.itemType === 'swords' ||
                    action.itemType === 'bows' ? 'weapon' : null
      return {
        ...state,
          helm: itemType === 'helm' ? action.createdItem : state.helm,
          bodyArmour: itemType === 'bodyArmour' ? action.createdItem : state.bodyArmour,
          leggings: itemType === 'leggings' ? action.createdItem : state.leggings,
          boots: itemType === 'boots' ? action.createdItem : state.boots,
          amulet: itemType === 'amulet' ? action.createdItem : state.amulet,
          ring: itemType === 'ring' ? action.createdItem : state.ring,
          belt: itemType === 'belt' ? action.createdItem : state.belt,
          weapon: itemType === 'weapon' ? action.createdItem : state.weapon
      }
    case 'playerStats/KILL_PLAYER':
      return {
          ...state,
        pIsAlive: false
      }
    case 'playerStats/EQUALIZE' :
      if (action.what === 'health') {
        return {
            ...state,
          pHealth: state.pMaxHealth
        }
      }
      if (action.what === 'energy') {
        return {
            ...state,
          pEnergy: state.pMaxEnergy
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
        pStrength: strength,
        pStrengthBase: strength,
        pAgility: agility,
        pAgilityBase: agility,
        pWisdom: wisdom,
        pWisdomBase: wisdom,
        pConstitution: constitution,
        pConstitutionBase: constitution
      }
    case 'playerStats/CREATE_CHARACTER':
      return {
        ...state,
        pIsCreated: true,
        pName: action.value
      }
    default:
      return state
  }
}