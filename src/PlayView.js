import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      enemyStats: state.enemyStats,
      playView: state.playView,
      areas: state.areas,
      enemies: state.enemies,
      choiceEvents: state.choiceEvents
    }),
    dispatch => ({
      playerStatsCalcAttPowMin: () => dispatch({ type: 'playerStats/CALC_ATT_POW_MIN'}),
      playerStatsCalcAttPowMax: () => dispatch({ type: 'playerStats/CALC_ATT_POW_MAX'}),
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
      enemyStatsSetEnemy: (health, maxHealth, energy, maxEnergy) => dispatch({ type: 'enemyStats/SET_ENEMY', health, maxHealth, energy, maxEnergy}),
      enemyStatsHideEnemy: () => dispatch({ type: 'enemyStats/HIDE_ENEMY'}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value}),
      playViewSetEventRNG: () => dispatch({type: 'playView/SET_EVENT_RNG'}),
      playViewForceUpdate: () => dispatch({type: 'playView/FORCE_UPDATE'}),
      areasFetchBegin: () => dispatch({ type: 'areas/FETCH__BEGIN'}),
      areasFetchSuccess: data => dispatch({ type: 'areas/FETCH__SUCCESS', data}),
      areasFetchFailure: error => dispatch({ type: 'areas/FETCH__FAILURE', error}),
      areasSetAreaRNG: () => dispatch({ type: 'areas/SET_AREA_RNG'}),
      enemiesFetchBegin: () => dispatch({ type: 'enemies/FETCH__BEGIN'}),
      enemiesFetchSuccess: data => dispatch({ type: 'enemies/FETCH__SUCCESS', data}),
      enemiesFetchFailure: error => dispatch({ type: 'enemies/FETCH__FAILURE', error}),
      enemiesSetEnemyRNG: () => dispatch({ type: 'enemies/SET_ENEMY_RNG'}),
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

    this.props.playerStatsCalcAttPowMin()
    this.props.playerStatsCalcAttPowMax()
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
  }


  handleStoryUpdate = () => {
    if (this.props.playView.inputValue === 'explore' && this.props.playView.possibleActions.includes('explore')) {
      this.setState({
        isDisabled: true,
      })
      this.props.areasSetAreaRNG()
      this.props.playViewSetEventRNG()
      this.props.playerStatsCalcAttPowMin()
      this.props.playerStatsCalcAttPowMax()
      setTimeout(() => {
        if (this.props.playView.events[this.props.playView.eventRNG] === 'fight') {
          this.props.playerStatsCalcAttPowMin()
          this.props.playerStatsCalcAttPowMax()
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('attack')
        }
        if (this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent') {
          this.props.playerStatsCalcAttPowMin()
          this.props.playerStatsCalcAttPowMax()
          let exploreIndex = this.props.playView.possibleActions.indexOf('explore');
          exploreIndex > -1 ? this.props.playView.possibleActions.splice(exploreIndex, 1) : null
          this.props.playView.possibleActions.push('choose')
        }
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemiesSetEnemyRNG() : null
        this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ? this.props.choiceEventsSetChoiceEventRNG() : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.playView.storyOutput.push(this.props.areas.data[this.props.areas.areaRNG].description,
            'You encounter ' + this.props.enemies.data[this.props.enemies.enemyRNG].name + '!') : this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ?
            this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].description) : null
        this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemyStatsSetEnemy(this.props.enemies.data[this.props.enemies.enemyRNG].health, this.props.enemies.data[this.props.enemies.enemyRNG].maxHealth, this.props.enemies.data[this.props.enemies.enemyRNG].energy, this.props.enemies.data[this.props.enemies.enemyRNG].maxEnergy) : null
        this.setState({
          isDisabled: false
        })
      }, 0)
    }
    if(this.props.playView.inputValue === 'attack' && this.props.playView.possibleActions.includes('attack')) {
      if (this.props.enemyStats.health > 0) {
          this.props.hitEnemy(Math.round(Math.random() * (this.props.playerStats.attackPowerMax - this.props.playerStats.attackPowerMin) + this.props.playerStats.attackPowerMin));
          this.props.playerStatsLoseHealth(Math.round(Math.random() * (this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMax - this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin) + this.props.enemies.data[this.props.enemies.enemyRNG].attackPowerMin))
          setTimeout(() => {
            if (this.props.playerStats.health <= 0) {
             this.props.playerStatsKillPlayer()
           }
          }, 100)
          setTimeout(() => {
            if (this.props.enemyStats.health <= 0) {
              this.props.playView.storyOutput.push(`You've killed ${this.props.enemies.data[this.props.enemies.enemyRNG].name}!`)
              this.props.enemyStatsHideEnemy();
              let attackIndex = this.props.playView.possibleActions.indexOf('attack');
              attackIndex > -1 ? this.props.playView.possibleActions.splice(attackIndex, 1) : null;
              this.props.playView.possibleActions.push('explore')
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
                      < textarea style={this.storyOutputStyle} readOnly
                                 value={this.props.playView.storyOutput.join('\n')}/>
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
