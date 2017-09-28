import React, { Component } from 'react'
import { Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      enemyStats: state.enemyStats,
      playView: state.playView,
      areas: state.areas,
      enemies: state.enemies,
      choiceEvents: state.choiceEvents,
      abilities: state.abilities,
      blockMechanic: state.blockMechanic,
      items: state.items,
      itemsAff: state.itemsAff
    }),
    dispatch => ({
      playerStatsCalculateStats: () => dispatch({ type: 'playerStats/CALCULATE_STATS'}),
      playerStatsGainExperience: value => dispatch({ type: 'playerStats/GAIN_EXPERIENCE', value}),
      playerStatsGainAttack: value => dispatch({ type: 'playerStats/GAIN_ATTACK', value}),
      playerStatsGainStrength: value => dispatch({ type: 'playerStats/GAIN_STRENGTH', value}),
      playerStatsGainWisdom: value => dispatch({ type: 'playerStats/GAIN_WISDOM', value}),
      playerStatsGainAgility: value => dispatch({ type: 'playerStats/GAIN_AGILITY', value}),
      playerStatsGainConstitution: value => dispatch({ type: 'playerStats/GAIN_CONSTITUTION', value}),
      playerStatsGainHealth: value => dispatch({ type: 'playerStats/GAIN_HEALTH', value}),
      playerStatsGainMaxHealth: value => dispatch({ type: 'playerStats/GAIN_MAX_HEALTH', value}),
      playerStatsGainEnergy: value => dispatch({ type: 'playerStats/GAIN_ENERGY', value}),
      playerStatsGainMaxEnergy: value => dispatch({ type: 'playerStats/GAIN_MAX_ENERGY', value}),
      playerStatsLoseHealth: value => dispatch({ type: 'playerStats/LOSE_HEALTH', value}),
      playerStatsLoseMaxHealth: value => dispatch({ type: 'playerStats/LOSE_MAX_HEALTH', value}),
      playerStatsLoseEnergy: value => dispatch({ type: 'playerStats/LOSE_ENERGY', value}),
      playerStatsLoseMaxEnergy: value => dispatch({ type: 'playerStats/LOSE_MAX_ENERGY', value}),
      playerStatsKillPlayer: () => dispatch({ type: 'playerStats/KILL_PLAYER'}),
      playerStatsEqualize: what => dispatch({ type: 'playerStats/EQUALIZE', what}),
      playerStatsEquipItem: (createdItem, itemType) => dispatch({ type: 'playerStats/EQUIP_ITEM', createdItem, itemType}),
      hitEnemy: value => dispatch({ type: 'enemyStats/HIT_ENEMY', value}),
      enemyStatsSetEnemy: (eName, eHealth, eMaxHealth, eSpeed, eAttackPowerMin, eAttackPowerMax, eAccuracy, aPattern, eExperience) => dispatch({ type: 'enemyStats/SET_ENEMY', eName, eHealth, eMaxHealth, eSpeed, eAttackPowerMin, eAttackPowerMax, eAccuracy, aPattern, eExperience}),
      enemyStatsHideEnemy: () => dispatch({ type: 'enemyStats/HIDE_ENEMY'}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value}),
      playViewSetEventRNG: () => dispatch({type: 'playView/SET_EVENT_RNG'}),
      playViewForceUpdate: () => dispatch({type: 'playView/FORCE_UPDATE'}),
      playViewForwardTime: () => dispatch({type: 'playView/FORWARD_TIME'}),
      areasSetAreaRNG: () => dispatch({ type: 'areas/SET_AREA_RNG'}),
      enemiesSetEnemyRNG: (value) => dispatch({ type: 'enemies/SET_ENEMY_RNG', value}),
      enemiesNextAttPattern: () => dispatch({ type: 'enemies/NEXT_ATT_PATTERN'}),
      choiceEventsSetChoiceEventRNG: () => dispatch({ type: 'choiceEvents/SET_CHOICE_EVENT_RNG'}),
      abilitiesFilterAbilities: (data, commands) => dispatch({ type: 'abilities/FILTER_USABLE_ABILITIES', data, commands}),
      itemsChangeItemPending: () => dispatch({ type: 'items/ITEM_PENDING'}),
      itemsSetCreatedItem: item => dispatch({ type: 'items/CREATE_ITEM', item})
    })
)(
class PlayView extends Component {

  componentWillMount() {
    this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
    this.props.playerStatsCalculateStats()
    this.props.playerStatsEqualize('health')
    this.props.playerStatsEqualize('energy')
  }

  storyOutputStyle = {
    width: "100%",
    height: "30vh",
    maxHeight: "90vh",
    resize: "vertical"
  }

  playerInputStyle = {
    width: "75%",
  }

  playerButtonStyle = {
    width: '24%',
    float: 'right'
  }

  choiceOneButtonStyle = {
    width: '25%',
    margin: '2% 1% 0 0'
  }

  choiceTwoButtonStyle = {
    width: '25%',
    margin: '2% 0 0 1%'
  }

  choiceButtonContainer = {
    textAlign: 'center'
  }

  dieScreenTextStyle = {
    color: "#8a2a2d",
  }

  dieScreenStyle = {
    textAlign: 'center'
  }

  state = {
    isDisabled: null,
    viewedTab: 'exploration',
    turnCounter: 1
  }

  usableAbilities = () => this.props.abilities.data.filter(i =>
    i.req.strength <= this.props.playerStats.pStrength &&
    i.req.wisdom <= this.props.playerStats.pWisdom &&
    i.req.agility <= this.props.playerStats.pAgility &&
    i.req.constitution <= this.props.playerStats.pConstitution &&
    i.energyCost <= this.props.playerStats.pEnergy
  )

  usableCommands = () => [].concat.apply([], (this.usableAbilities().map(i => i["command"]))).filter(i => i !== null)

  hitTrade = () => {
    let {pMagicDamage, pSpeed, pBaseDodgeChance, pAttackPowerMax, pAttackPowerMin, pDamageReduction} = this.props.playerStats
    let {aPattern, eAccuracy, eSpeed, eAttackPowerMax, eAttackPowerMin} = this.props.enemyStats
    let pDmgMod = 1
    let isSpell = null
    if (this.props.playView.inputValue !== 'a' && this.props.playView.inputValue !== 'attack') {
      let usedAbility = this.usableAbilities().filter(i => i.command !== null).filter(i => i.command.includes(this.props.playView.inputValue))
      pDmgMod = usedAbility[0].dmgMod
      usedAbility[0].spell === true ? isSpell = true : isSpell = false
      this.props.playerStatsLoseEnergy(usedAbility[0].energyCost)
    }
    let pHitCalc = Math.round(Math.random() * (isSpell === false ? pDmgMod : 1) * (pAttackPowerMax - pAttackPowerMin) + pAttackPowerMin)
    let pSpellCalc = Math.round(pMagicDamage * pDmgMod)
    let numberRoll1to100 = Math.ceil(Math.random() * 100)
    let dodgeThreshold = eAccuracy - pBaseDodgeChance
    let doesDoubleAttack = pSpeed >= eSpeed + 5
    let enemyDoubleAttack = eSpeed >= pSpeed + 5
    let readBlockL = this.props.blockMechanic.leftBlockPoints
    let blockRedL = readBlockL === 3 ? 50 : readBlockL === 2 ? 30 : readBlockL === 1 ? 15 : 0
    let eHitCalcL = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedL / 100)))
    let readBlockF = this.props.blockMechanic.frontBlockPoints
    let blockRedF = readBlockF === 3 ? 50 : readBlockF === 2 ? 30 : readBlockF === 1 ? 15 : 0
    let eHitCalcF = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedF / 100)))
    let readBlockR = this.props.blockMechanic.rightBlockPoints
    let blockRedR = readBlockR === 3 ? 50 : readBlockF === 2 ? 30 : readBlockR === 1 ? 15 : 0
    let eHitCalcR = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedR / 100)))
    this.props.playView.battleLogOutput.push(`Turn ${this.state.turnCounter}:`)
    if (numberRoll1to100 >= dodgeThreshold || numberRoll1to100 === 100) {
      let dodgeMessage = aPattern[this.props.enemies.aPatternI] === 'f' ? 'front' : aPattern[this.props.enemies.aPatternI] === 'r' ? 'right side' : aPattern[this.props.enemies.aPatternI] === 'l' ? 'left side' : null
      this.props.playView.battleLogOutput.push(`You dodged an attack from the ${dodgeMessage}!`)
      this.props.playView.battleLogOutput.push(`You hit an enemy for ${isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null} damage!`)
      this.props.hitEnemy(isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null);
      if (doesDoubleAttack === true) {
        let pHitCalc = Math.round(Math.random() * (pAttackPowerMax - pAttackPowerMin) + pAttackPowerMin)
        this.props.playView.battleLogOutput.push(`Your excess speed allows you to hit an enemy second time for ${isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null} damage!`)
        this.props.hitEnemy(isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null)
      }
      this.props.enemiesNextAttPattern()
    }
    if (numberRoll1to100 < dodgeThreshold || numberRoll1to100 === 1) {
      this.props.hitEnemy(isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null);
      if (doesDoubleAttack === true) {
        let pHitCalc = Math.round(Math.random() * (pAttackPowerMax - pAttackPowerMin) + pAttackPowerMin)
        this.props.playView.battleLogOutput.push(`Your excess speed allows you to hit an enemy second time for ${isSpell === false ? pHitCalc : isSpell === true ? pSpellCalc : null} damage!`)
        this.props.hitEnemy(isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null)
      }
      this.props.playView.battleLogOutput.push(`You hit an enemy for ${isSpell === false || isSpell === null ? pHitCalc : isSpell === true ? pSpellCalc : null} damage!`)
      if (aPattern[this.props.enemies.aPatternI] === 'f') {
        this.props.playerStatsLoseHealth(eHitCalcF)
        this.props.playView.battleLogOutput.push(`Enemy attacks you head on and deals ${eHitCalcF} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcF = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedF / 100)))
          this.props.playerStatsLoseHealth(eHitCalcF)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcF} damage!`)
        }
      }
      if (aPattern[this.props.enemies.aPatternI] === 'l') {
        this.props.playerStatsLoseHealth(eHitCalcL)
        this.props.playView.battleLogOutput.push(`Enemy attacks you from the left side and deals ${eHitCalcL} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcL = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedL / 100)))
          this.props.playerStatsLoseHealth(eHitCalcL)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcL} damage!`)
        }
      }
      if (aPattern[this.props.enemies.aPatternI] === 'r') {
        this.props.playerStatsLoseHealth(eHitCalcR)
        this.props.playView.battleLogOutput.push(`Enemy attacks you from the right side and deals ${eHitCalcR} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcR = Math.round((Math.random() * (eAttackPowerMax - eAttackPowerMin) + eAttackPowerMin) * (1 - (pDamageReduction / 100)) * (1 - (blockRedR / 100)))
          this.props.playerStatsLoseHealth(eHitCalcR)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcR} damage!`)
        }
      }
      this.props.enemiesNextAttPattern()
    }
    this.setState({
      turnCounter: this.state.turnCounter + 1
    })
  }

  handleStoryUpdate = () => {
    let filteredEnemies = this.props.enemies.data.filter((i) => i.difficulty <= Math.sqrt(this.props.playView.days))
    if ((this.props.playView.inputValue === 'explore' && this.props.playView.possibleActions.includes('explore')) || (this.props.playView.inputValue === 'e' && this.props.playView.possibleActions.includes('explore'))) {
      this.props.playViewForwardTime()
      this.passiveEffects()
      this.setState({
        isDisabled: true,
      })
      this.props.areasSetAreaRNG()
      this.props.playViewSetEventRNG()
      this.props.playerStatsCalculateStats()
      this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
      setTimeout(() => {
        if (this.props.playView.events[this.props.playView.eventRNG] === 'fight') {
          this.setState({
            viewedTab: 'battleLog'
          })
          this.props.playerStatsCalculateStats()
          this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('attack')
          this.props.playView.possibleActions.push('dodge')
        }
        if (this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent') {
          this.props.playerStatsCalculateStats()
          this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('choose')
        }
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemiesSetEnemyRNG(filteredEnemies.length) : null
        this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ? this.props.choiceEventsSetChoiceEventRNG() : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? (this.props.playView.battleLogOutput.push('You encounter ' + filteredEnemies[this.props.enemies.enemyRNG].eName + '!')  && this.props.playView.storyOutput.push(this.props.areas.data[this.props.areas.areaRNG].description,
            'You encounter ' + filteredEnemies[this.props.enemies.enemyRNG].eName + '!')) : this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ?
            this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].description) : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemyStatsSetEnemy(filteredEnemies[this.props.enemies.enemyRNG].eName, filteredEnemies[this.props.enemies.enemyRNG].eHealth, filteredEnemies[this.props.enemies.enemyRNG].eMaxHealth, filteredEnemies[this.props.enemies.enemyRNG].eSpeed, filteredEnemies[this.props.enemies.enemyRNG].eAttackPowerMin, filteredEnemies[this.props.enemies.enemyRNG].eAttackPowerMax, filteredEnemies[this.props.enemies.enemyRNG].eAccuracy, filteredEnemies[this.props.enemies.enemyRNG].aPattern, filteredEnemies[this.props.enemies.enemyRNG].eExperience) : null
        this.setState({
          isDisabled: false
        })
      }, 0)
    }
    if(["attack", "a"].concat(this.props.abilities.usableCommands).includes(this.props.playView.inputValue) && this.props.playView.possibleActions.includes('attack')) {
      if (this.props.enemyStats.eHealth > 0) {
        this.hitTrade()
        this.passiveEffects()
        setTimeout(() => {
            if (this.props.playerStats.pHealth <= 0) {
             this.props.playerStatsKillPlayer()
           }
          }, 100)
          setTimeout(() => {
            if (this.props.enemyStats.eHealth <= 0) {
              this.props.playView.storyOutput.push(`You've killed ${filteredEnemies[this.props.enemies.enemyRNG].eName}!`)
              this.props.playView.battleLogOutput.push(`You've killed ${filteredEnemies[this.props.enemies.enemyRNG].eName}!`)
              this.props.itemsChangeItemPending()
              this.props.itemsSetCreatedItem(this.createItem())
              this.props.enemyStatsHideEnemy()
              this.props.playerStatsGainExperience(filteredEnemies[this.props.enemies.enemyRNG].eExperience)
              setTimeout(() => {
                if (this.props.playerStats.pExperience > this.props.playerStats.pMaxExperience) {
                  this.props.playerStatsGainExperience(0)
                }
              }, 0)
              this.props.playerStatsCalculateStats()
              this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
              let attackIndex = this.props.playView.possibleActions.indexOf('attack');
              attackIndex > -1 ? this.props.playView.possibleActions.splice(attackIndex, 1) : null;
              this.props.playView.possibleActions.push('explore')
              this.setState({
                viewedTab: 'exploration',
                turnCounter: 1
              })
            }
          }, 0)
      }
    }
    return null
  }

  handleChoice = (choice) =>  {
    this.passiveEffects()
    if (choice === 1) {
      this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOne)
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pAttGain') === true) {
        this.props.playerStatsGainAttack(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pAttGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pStrGain') === true) {
        this.props.playerStatsGainStrength(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pStrGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pWisGain') === true) {
        this.props.playerStatsGainWisdom(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pWisGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pAgiGain') === true) {
        this.props.playerStatsGainAgility(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pAgiGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pConstGain') === true) {
        this.props.playerStatsGainConstitution(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pConstGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pHealthGain') === true) {
        this.props.playerStatsGainHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pHealthGain)
        setTimeout(() => {
          if (this.props.playerStats.pHealth > this.props.playerStats.pMaxHealth) {
            this.props.playerStatsEqualize('health')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pMaxHealthGain') === true) {
        this.props.playerStatsGainMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pMaxHealthGain)
        this.props.playerStatsCalculateStats()
        this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pEnergyGain') === true) {
        this.props.playerStatsGainEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pEnergyGain)
        setTimeout(() => {
          if (this.props.playerStats.pEnergy > this.props.playerStats.pMaxEnergy) {
            this.props.playerStatsEqualize('energy')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pMaxEnergyGain') === true) {
        this.props.playerStatsGainMaxEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pMaxEnergyGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pHealthLoss') === true) {
        this.props.playerStatsLoseHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pHealthLoss)
        setTimeout(() => {
          if (this.props.playerStats.pHealth <= 0) {
            this.props.playerStatsKillPlayer()
          }
        }, 100)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pMaxHealthLoss') === true) {
        this.props.playerStatsLoseMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pMaxHealthLoss)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pEnergyLoss') === true) {
        this.props.playerStatsLoseEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pEnergyLoss)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pMaxEnergyLoss') === true) {
        this.props.playerStatsLoseMaxEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pMaxEnergyLoss)
      }
      let chooseIndex = this.props.playView.possibleActions.indexOf('choose');
      chooseIndex > -1 ? this.props.playView.possibleActions.splice(chooseIndex, 1) : null
      this.props.playView.possibleActions.push('explore')
      this.props.playViewForceUpdate()
    }
    if (choice === 2) {
      this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwo)
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pAttGain') === true) {
        this.props.playerStatsGainAttack(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pAttGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pStrGain') === true) {
        this.props.playerStatsGainStrength(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pStrGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pWisGain') === true) {
        this.props.playerStatsGainWisdom(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pWisGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pAgiGain') === true) {
        this.props.playerStatsGainAgility(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pAgiGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pConstGain') === true) {
        this.props.playerStatsGainConstitution(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pConstGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pHealthGain') === true) {
        this.props.playerStatsGainHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pHealthGain)
        setTimeout(() => {
          if (this.props.playerStats.pHealth > this.props.playerStats.pMaxHealth) {
            this.props.playerStatsEqualize('health')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pMaxHealthGain') === true) {
        this.props.playerStatsGainMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pMaxHealthGain)
        this.props.playerStatsCalculateStats()
        this.props.abilitiesFilterAbilities(this.usableAbilities(), this.usableCommands())
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pEnergyGain') === true) {
        this.props.playerStatsGainEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pEnergyGain)
        setTimeout(() => {
          if (this.props.playerStats.pEnergy > this.props.playerStats.pMaxEnergy) {
            this.props.playerStatsEqualize('energy')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pMaxEnergyGain') === true) {
        this.props.playerStatsGainMaxEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pMaxEnergyGain)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pHealthLoss') === true) {
        this.props.playerStatsLoseHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pHealthLoss)
        setTimeout(() => {
          if (this.props.playerStats.pHealth <= 0) {
            this.props.playerStatsKillPlayer()
          }
        }, 100)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pMaxHealthLoss') === true) {
        this.props.playerStatsLoseMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pMaxHealthLoss)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pEnergyLoss') === true) {
        this.props.playerStatsLoseEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pEnergyLoss)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pMaxEnergyLoss') === true) {
        this.props.playerStatsLoseMaxEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pMaxEnergyLoss)
      }
      let chooseIndex = this.props.playView.possibleActions.indexOf('choose');
      chooseIndex > -1 ? this.props.playView.possibleActions.splice(chooseIndex, 1) : null
      this.props.playView.possibleActions.push('explore')
      this.props.playViewForceUpdate()
    }
  }

  passiveEffects = () => {
    const equalizeCheck = () => setTimeout(() => {
      if (this.props.playerStats.pHealth > this.props.playerStats.pMaxHealth) {
        this.props.playerStatsEqualize('health')
      }
      if (this.props.playerStats.pEnergy > this.props.playerStats.pMaxEnergy) {
        this.props.playerStatsEqualize('energy')
      }
    }, 0)
    let usableAbilities = this.props.abilities.usableAbilities
    for (let i = 0; i < usableAbilities.length; i++) {
      if (usableAbilities[i].name === 'Health Regeneration') {
        this.props.playerStatsGainHealth(1)
        equalizeCheck()
      }
      if (usableAbilities[i].name === 'Mana Regeneration') {
        this.props.playerStatsGainEnergy(1)
        equalizeCheck()
      }
    }
  }

  createItem = () => {
    let createdItem = {}
    let wearableItems = () => {
      let iterations = ["helms", "bodyArmours", "leggings", "boots", "amulets", "rings", "belts", "swords", "bows"]
      let result = {}
      for (let i = 0; i < iterations.length; i++) {
        if (this.props.items.data[0][iterations[i]].filter(i => i.difficulty <= Math.sqrt(this.props.playView.days)).length !== 0) {
          result[iterations[i]] = this.props.items.data[0][iterations[i]].filter(i => i.difficulty <= Math.sqrt(this.props.playView.days))
        }
      }
      return result
    }
    let chooseItemType = () => {
      let result;
      let count = 0;
      for (let prop in wearableItems())
        if (Math.random() < 1/++count)
          result = prop;
      return result;
    }
    let chosenItemType = chooseItemType()
    let chooseItemBase = () => {
      let itemType = chosenItemType
      return wearableItems()[itemType][Math.floor(Math.random() * wearableItems()[itemType].length)]
    }
    let chosenItemBase = chooseItemBase()
    let itemComplexity = Math.floor(Math.random() * 3)
    let prefixOrSuffix = itemComplexity === 1 ? Math.floor(Math.random() * 2) : null
    let filterPrefixes = prefixOrSuffix === 0 || itemComplexity === 2 ? this.props.itemsAff.data[0].prefixes.filter((i) => i.difficulty <= Math.sqrt(this.props.playView.days)) : null
    let filterSuffixes = prefixOrSuffix === 1 || itemComplexity === 2 ? this.props.itemsAff.data[0].suffixes.filter((i) => i.difficulty <= Math.sqrt(this.props.playView.days)) : null
    let pickPrefix = filterPrefixes !== null ? filterPrefixes[Math.floor(Math.random() * filterPrefixes.length)] : null
    let pickSuffix = filterSuffixes !== null ? filterSuffixes[Math.floor(Math.random() * filterSuffixes.length)] : null
    let constructItem = () => {
      createdItem.name = chosenItemBase.name !== undefined ? (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.name : '') + chosenItemBase.name + (pickSuffix !== null && pickSuffix !== undefined ? pickSuffix.name : '') : null
      createdItem.armour = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("armour") ? pickPrefix.armour : 0 : 0) + (chosenItemBase.armour !== undefined ? chosenItemBase.armour : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("armour") ? pickSuffix.armour : 0) : 0)
      createdItem.attackPowerMin = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("attackPowerMin") ? pickPrefix.attackPowerMin : 0 : 0) + (chosenItemBase.attackPowerMin !== undefined ? chosenItemBase.attackPowerMin : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("attackPowerMin") ? pickSuffix.attackPowerMin : 0) : 0)
      createdItem.attackPowerMax = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("attackPowerMax") ? pickPrefix.attackPowerMax : 0 : 0) + (chosenItemBase.attackPowerMax !== undefined ? chosenItemBase.attackPowerMax : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("attackPowerMax") ? pickSuffix.attackPowerMax : 0) : 0)
      createdItem.strength = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("strength") ? pickPrefix.strength : 0 : 0) + (chosenItemBase.strength !== undefined ? chosenItemBase.strength : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("strength") ? pickSuffix.strength :0) : 0)
      createdItem.wisdom = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("wisdom") ? pickPrefix.wisdom : 0 : 0) + (chosenItemBase.wisdom ? chosenItemBase.wisdom : 0) + (pickSuffix !== null && pickSuffix !== undefined ?  pickSuffix.hasOwnProperty("wisdom") ? pickSuffix.wisdom : 0 : 0)
      createdItem.agility = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("agility") ? pickPrefix.agility : 0 : 0) + (chosenItemBase.agility ? chosenItemBase.agility : 0) + (pickSuffix !== null && pickSuffix !== undefined ? pickSuffix.hasOwnProperty("agility") ? pickSuffix.agility : 0 : 0)
      createdItem.constitution = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("constitution") ? pickPrefix.constitution : 0 : 0) + (chosenItemBase.constitution ? chosenItemBase.constitution : 0) + (pickSuffix !== null && pickSuffix !== undefined ? pickSuffix.hasOwnProperty("constitution") ? pickSuffix.constitution : 0 : 0)
      createdItem.magicDamage = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("magicDamage") ? pickPrefix.magicDamage : 0 : 0) + (chosenItemBase.magicDamage !== undefined ? chosenItemBase.magicDamage : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("magicDamage") ? pickSuffix.magicDamage : 0) : 0)
      createdItem.speed = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("speed") ? pickPrefix.speed : 0 : 0) + (chosenItemBase.speed !== undefined ? chosenItemBase.speed : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("speed") ? pickSuffix.speed : 0) : 0)
      createdItem.maxHealthBonus = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("maxHealthBonus") ? pickPrefix.maxHealthBonus : 0 : 0) + (chosenItemBase.maxHealthBonus !== undefined ? chosenItemBase.maxHealthBonus : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("maxHealthBonus") ? pickSuffix.maxHealthBonus : 0) : 0)
      createdItem.maxEnergyBonus = (pickPrefix !== null && pickPrefix !== undefined ? pickPrefix.hasOwnProperty("maxEnergyBonus") ? pickPrefix.maxEnergyBonus : 0 : 0) + (chosenItemBase.maxEnergyBonus !== undefined ? chosenItemBase.maxEnergyBonus : 0) + (pickSuffix !== null && pickSuffix !== undefined ? (pickSuffix.hasOwnProperty("maxEnergyBonus") ? pickSuffix.maxEnergyBonus : 0) : 0)
      createdItem.type = chosenItemType
    }
    constructItem()
    return createdItem
  }

  render() {
    return (
        <Col lg={6}>
          {
            this.props.playerStats.pIsAlive === true ?
                (
                    <div>
                      <hr/>
                      <p>Day: {this.props.playView.days} ({this.props.playView.timeOfDay})</p>
                      <Button style={this.state.viewedTab === 'exploration' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'exploration'})}>Exploration</Button>
                      <Button style={this.state.viewedTab === 'battleLog' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'battleLog'})}>Battle log</Button>
                      < textarea style={this.storyOutputStyle} readOnly
                                 value={this.state.viewedTab === 'exploration' ? this.props.playView.storyOutput.join('\n') : this.props.playView.battleLogOutput.join('\n')}/>
                      <input style={this.playerInputStyle}
                             onChange={event => this.props.inputChange(event.target.value)}/>
                      <button disabled={this.state.isDisabled} style={this.playerButtonStyle}
                              onClick={() => this.handleStoryUpdate()}>Perform action
                      </button>
                    </div>
                )
                : (
                    <div style={this.dieScreenStyle}>
                      <h1 style={this.dieScreenTextStyle}>YOU DIED</h1>
                    </div>
            )
          }
          {
            this.props.playView.possibleActions.includes('choose') === true ?
                (
                    <div style={this.choiceButtonContainer}>
                      <button style={this.choiceOneButtonStyle}
                              onClick={() => this.handleChoice(1)}>{this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneB}</button>
                      <button style={this.choiceTwoButtonStyle}
                              onClick={() => this.handleChoice(2)}>{this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoB}</button>
                    </div>
                ) : null
          }
          {
            this.props.items.itemPending === true ?
              (
              <div style={{textAlign: 'center'}}>
                <div style={{margin: '12px'}}>
                  <OverlayTrigger placement="top" overlay={
                    <Tooltip id="tooltip" style={{textAlign: "center"}}>
                      <div style={{color: "#d3d3d3"}}>
                        {this.props.items.createdItem.name}
                      </div>
                      <div>
                        {this.props.items.createdItem.attackPowerMin !== 0 ? `+${this.props.items.createdItem.attackPowerMin} to minimum attack damage` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.attackPowerMax !== 0 ? `+${this.props.items.createdItem.attackPowerMax} to maximum attack damage` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.magicDamage !== 0 ? `+${this.props.items.createdItem.magicDamage} to magic damage` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.armour !== 0 ? `+${this.props.items.createdItem.armour} to armour` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.speed !== 0 ? `+${this.props.items.createdItem.speed} to speed` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.maxHealthBonus !== 0 ? `+${this.props.items.createdItem.maxHealthBonus} to maximum health` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.maxEnergyBonus !== 0 ? `+${this.props.items.createdItem.maxEnergyBonus} to maximum energy` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.strength !== 0 ? `+${this.props.items.createdItem.strength} to strength` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.wisdom !== 0 ? `+${this.props.items.createdItem.wisdom} to wisdom` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.agility !== 0 ? `+${this.props.items.createdItem.agility} to agility` : null}
                      </div>
                      <div>
                        {this.props.items.createdItem.constitution !== 0 ? `+${this.props.items.createdItem.constitution} to constitution` : null}
                      </div>
                    </Tooltip>
                  }>
                    <img src="http://lorempizza.com/32/32"/>
                  </OverlayTrigger>
                </div>
                <Button style={{margin: '4px'}} onClick={() => {this.props.playerStatsEquipItem(this.props.items.createdItem, this.props.items.createdItem.type); this.props.itemsChangeItemPending()}}>Equip</Button>
                <Button style={{margin: '4px'}} onClick={() => this.props.itemsChangeItemPending()}>Discard</Button>
              </div>
            ) : null
          }
        </Col>
    )
  }
}
)
