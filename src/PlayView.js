import React, { Component } from 'react'
import { Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      enemyStats: state.enemyStats,
      playView: state.playView,
      areas: state.areas,
      enemies: state.enemies,
      choiceEvents: state.choiceEvents,
      blockMechanic: state.blockMechanic
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
      hitEnemy: value => dispatch({ type: 'enemyStats/HIT_ENEMY', value}),
      enemyStatsSetEnemy: (health, maxHealth, energy, maxEnergy, speed) => dispatch({ type: 'enemyStats/SET_ENEMY', health, maxHealth, energy, maxEnergy, speed}),
      enemyStatsHideEnemy: () => dispatch({ type: 'enemyStats/HIDE_ENEMY'}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value}),
      playViewSetEventRNG: () => dispatch({type: 'playView/SET_EVENT_RNG'}),
      playViewForceUpdate: () => dispatch({type: 'playView/FORCE_UPDATE'}),
      playViewForwardTime: () => dispatch({type: 'playView/FORWARD_TIME'}),
      areasFetchBegin: () => dispatch({ type: 'areas/FETCH__BEGIN'}),
      areasFetchSuccess: data => dispatch({ type: 'areas/FETCH__SUCCESS', data}),
      areasFetchFailure: error => dispatch({ type: 'areas/FETCH__FAILURE', error}),
      areasSetAreaRNG: () => dispatch({ type: 'areas/SET_AREA_RNG'}),
      enemiesFetchBegin: () => dispatch({ type: 'enemies/FETCH__BEGIN'}),
      enemiesFetchSuccess: data => dispatch({ type: 'enemies/FETCH__SUCCESS', data}),
      enemiesFetchFailure: error => dispatch({ type: 'enemies/FETCH__FAILURE', error}),
      enemiesSetEnemyRNG: (value) => dispatch({ type: 'enemies/SET_ENEMY_RNG', value}),
      enemiesNextAttPattern: () => dispatch({ type: 'enemies/NEXT_ATT_PATTERN'}),
      choiceEventsFetchBegin: () => dispatch({ type: 'choiceEvents/FETCH__BEGIN'}),
      choiceEventsFetchSuccess: data => dispatch({ type: 'choiceEvents/FETCH__SUCCESS', data}),
      choiceEventsFetchFailure: error => dispatch({ type: 'choiceEvents/FETCH__FAILURE', error}),
      choiceEventsSetChoiceEventRNG: () => dispatch({ type: 'choiceEvents/SET_CHOICE_EVENT_RNG'})
    })
)(
class PlayView extends Component {

  componentWillMount() {
    this.props.areasFetchBegin()
    fetch(
        `${process.env.PUBLIC_URL}/data/areas.json`
    ).then(
        response => response.json().then(
            data => this.props.areasFetchSuccess(data)
        ).catch(
            error => this.props.areasFetchFailure('Malformed JSON.')
        )
    ).catch(
        error => this.props.areasFetchFailure('Connection error.')
    )

    this.props.enemiesFetchBegin()
    fetch(
        `${process.env.PUBLIC_URL}/data/enemies.json`
    ).then(
        response => response.json().then(
            data => this.props.enemiesFetchSuccess(data)
        ).catch(
            error => this.props.enemiesFetchFailure('Malformed JSON.')
        )
    ).catch(
        error => this.props.enemiesFetchFailure('Connection error.')
    )

    this.props.choiceEventsFetchBegin()
    fetch(
        `${process.env.PUBLIC_URL}/data/choiceEvents.json`
    ).then(
        response => response.json().then(
            data => this.props.choiceEventsFetchSuccess(data)
        ).catch(
            error => this.props.choiceEventsFetchFailure('Malformed JSON.')
        )
    ).catch(
        error => this.props.choiceEventsFetchFailure('Connection error.')
    )

    this.props.playerStatsCalculateStats()
    this.props.playerStatsEqualize('health')
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
    viewedTab: 'exploration'
  }

  hitTrade = () => {
    let aPattern = this.props.enemies.data[this.props.enemies.enemyRNG].aPattern
    let pHitCalc = Math.round(Math.random() * (this.props.playerStats.attackPowerMax - this.props.playerStats.attackPowerMin) + this.props.playerStats.attackPowerMin)
    let numberRoll1to100 = Math.ceil(Math.random() * 100)
    let dodgeThreshold = this.props.enemies.data[this.props.enemies.enemyRNG].accuracy - this.props.playerStats.baseDodgeChance
    let doesDoubleAttack = this.props.playerStats.speed >= this.props.enemies.data[this.props.enemies.enemyRNG].speed + 5
    let enemyDoubleAttack = this.props.enemyStats.speed >= this.props.playerStats.speed + 5
    let readBlockL = this.props.blockMechanic.leftBlockPoints
    let blockRedL = readBlockL === 3 ? 50 : readBlockL === 2 ? 30 : readBlockL === 1 ? 15 : 0
    let eHitCalcL = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedL / 100)))
    let readBlockF = this.props.blockMechanic.frontBlockPoints
    let blockRedF = readBlockF === 3 ? 50 : readBlockF === 2 ? 30 : readBlockF === 1 ? 15 : 0
    let eHitCalcF = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedF / 100)))
    let readBlockR = this.props.blockMechanic.rightBlockPoints
    let blockRedR = readBlockR === 3 ? 50 : readBlockF === 2 ? 30 : readBlockR === 1 ? 15 : 0
    let eHitCalcR = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedR / 100)))
    if (numberRoll1to100 >= dodgeThreshold || numberRoll1to100 === 100) {
      let dodgeMessage = aPattern[this.props.enemies.aPatternI] === 'f' ? 'front' : aPattern[this.props.enemies.aPatternI] === 'r' ? 'right side' : aPattern[this.props.enemies.aPatternI] === 'l' ? 'left side' : null
      this.props.playView.battleLogOutput.push(`You dodged an attack from the ${dodgeMessage}!`)
      this.props.playView.battleLogOutput.push(`You hit an enemy for ${pHitCalc} damage!`)
      this.props.hitEnemy(pHitCalc);
      if (doesDoubleAttack === true) {
        let pHitCalc = Math.round(Math.random() * (this.props.playerStats.attackPowerMax - this.props.playerStats.attackPowerMin) + this.props.playerStats.attackPowerMin)
        this.props.playView.battleLogOutput.push(`Your excess speed allows you to hit an enemy second time for ${pHitCalc} damage!`)
        this.props.hitEnemy(pHitCalc)
      }
      this.props.enemiesNextAttPattern()
    }
    if (numberRoll1to100 < dodgeThreshold || numberRoll1to100 === 1) {
      this.props.hitEnemy(pHitCalc);
      if (doesDoubleAttack === true) {
        let pHitCalc = Math.round(Math.random() * (this.props.playerStats.attackPowerMax - this.props.playerStats.attackPowerMin) + this.props.playerStats.attackPowerMin)
        this.props.playView.battleLogOutput.push(`Your excess speed allows you to hit an enemy second time for ${pHitCalc} damage!`)
        this.props.hitEnemy(pHitCalc)
      }
      this.props.playView.battleLogOutput.push(`You hit an enemy for ${pHitCalc} damage!`)
      if (aPattern[this.props.enemies.aPatternI] === 'f') {
        this.props.playerStatsLoseHealth(eHitCalcF)
        this.props.playView.battleLogOutput.push(`Enemy attacks you head on and deals ${eHitCalcF} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcF = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedF / 100)))
          this.props.playerStatsLoseHealth(eHitCalcF)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcF} damage!`)
        }
      }
      if (aPattern[this.props.enemies.aPatternI] === 'l') {
        this.props.playerStatsLoseHealth(eHitCalcL)
        this.props.playView.battleLogOutput.push(`Enemy attacks you from the left side and deals ${eHitCalcL} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcL = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedL / 100)))
          this.props.playerStatsLoseHealth(eHitCalcL)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcL} damage!`)
        }
      }
      if (aPattern[this.props.enemies.aPatternI] === 'r') {
        this.props.playerStatsLoseHealth(eHitCalcR)
        this.props.playView.battleLogOutput.push(`Enemy attacks you from the right side and deals ${eHitCalcR} damage!`)
        if (enemyDoubleAttack === true) {
          let eHitCalcR = Math.round((Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) * (1 - (this.props.playerStats.damageReduction / 100)) * (1 - (blockRedR / 100)))
          this.props.playerStatsLoseHealth(eHitCalcR)
          this.props.playView.battleLogOutput.push(`Enemy strikes you second time for ${eHitCalcR} damage!`)
        }
      }
      this.props.enemiesNextAttPattern()
    }
  }

  handleStoryUpdate = () => {
    let filteredEnemies = this.props.enemies.data.filter((i) => i.difficulty <= Math.sqrt(this.props.playView.days))
    if (this.props.playView.inputValue === 'explore' && this.props.playView.possibleActions.includes('explore')) {
      this.props.playViewForwardTime()
      this.setState({
        isDisabled: true,
      })
      this.props.areasSetAreaRNG()
      this.props.playViewSetEventRNG()
      this.props.playerStatsCalculateStats()
      setTimeout(() => {
        if (this.props.playView.events[this.props.playView.eventRNG] === 'fight') {
          this.setState({
            viewedTab: 'battleLog'
          })
          this.props.playerStatsCalculateStats()
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('attack')
          this.props.playView.possibleActions.push('dodge')
        }
        if (this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent') {
          this.props.playerStatsCalculateStats()
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('choose')
        }
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemiesSetEnemyRNG(filteredEnemies.length) : null
        this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ? this.props.choiceEventsSetChoiceEventRNG() : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? (this.props.playView.battleLogOutput.push('You encounter ' + filteredEnemies[this.props.enemies.enemyRNG].name + '!')  && this.props.playView.storyOutput.push(this.props.areas.data[this.props.areas.areaRNG].description,
            'You encounter ' + filteredEnemies[this.props.enemies.enemyRNG].name + '!')) : this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ?
            this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].description) : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemyStatsSetEnemy(filteredEnemies[this.props.enemies.enemyRNG].health, filteredEnemies[this.props.enemies.enemyRNG].maxHealth, filteredEnemies[this.props.enemies.enemyRNG].energy, filteredEnemies[this.props.enemies.enemyRNG].maxEnergy, filteredEnemies[this.props.enemies.enemyRNG].speed) : null
        this.setState({
          isDisabled: false
        })
      }, 0)
    }
    if(this.props.playView.inputValue === 'attack' && this.props.playView.possibleActions.includes('attack')) {
      if (this.props.enemyStats.health > 0) {
        this.hitTrade()
        setTimeout(() => {
            if (this.props.playerStats.health <= 0) {
             this.props.playerStatsKillPlayer()
           }
          }, 100)
          setTimeout(() => {
            if (this.props.enemyStats.health <= 0) {
              this.props.playView.storyOutput.push(`You've killed ${filteredEnemies[this.props.enemies.enemyRNG].name}!`)
              this.props.playView.battleLogOutput.push(`You've killed ${filteredEnemies[this.props.enemies.enemyRNG].name}!`)
              this.props.enemyStatsHideEnemy();
              this.props.playerStatsGainExperience(filteredEnemies[this.props.enemies.enemyRNG].experience)
              setTimeout(() => {
                if (this.props.playerStats.experience > this.props.playerStats.maxExperience) {
                  this.props.playerStatsGainExperience(0)
                }
              }, 0)
              this.props.playerStatsCalculateStats()
              let attackIndex = this.props.playView.possibleActions.indexOf('attack');
              attackIndex > -1 ? this.props.playView.possibleActions.splice(attackIndex, 1) : null;
              this.props.playView.possibleActions.push('explore')
              this.setState({
                viewedTab: 'exploration'
              })
            }
          }, 0)
      }
    }
    return null
  }

  handleChoice = (choice) =>  {
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
          if (this.props.playerStats.health > this.props.playerStats.maxHealth) {
            this.props.playerStatsEqualize('health')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pMaxHealthGain') === true) {
        this.props.playerStatsGainMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pMaxHealthGain)
        this.props.playerStatsCalculateStats()
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.hasOwnProperty('pEnergyGain') === true) {
        this.props.playerStatsGainEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceOneEffects.pEnergyGain)
        setTimeout(() => {
          if (this.props.playerStats.energy > this.props.playerStats.maxEnergy) {
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
          if (this.props.playerStats.health <= 0) {
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
          if (this.props.playerStats.health > this.props.playerStats.maxHealth) {
            this.props.playerStatsEqualize('health')
          }
        }, 0)
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pMaxHealthGain') === true) {
        this.props.playerStatsGainMaxHealth(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pMaxHealthGain)
        this.props.playerStatsCalculateStats()
      }
      if (this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.hasOwnProperty('pEnergyGain') === true) {
        this.props.playerStatsGainEnergy(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].choiceTwoEffects.pEnergyGain)
        setTimeout(() => {
          if (this.props.playerStats.energy > this.props.playerStats.maxEnergy) {
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
          if (this.props.playerStats.health <= 0) {
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

  render() {
    return (
        <Col lg={6}>
          {
            this.props.playerStats.isAlive === true ?
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
        </Col>
    )
  }
}
)
