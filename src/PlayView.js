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
      hitPlayer: value => dispatch({ type: 'playerStats/HIT_PLAYER', value}),
      hitEnemy: value => dispatch({ type: 'enemyStats/HIT_ENEMY', value}),
      enemyStatsSetEnemy: (health, maxHealth, energy, maxEnergy) => dispatch({ type: 'enemyStats/SET_ENEMY', health, maxHealth, energy, maxEnergy}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value}),
      playViewSetEventRNG: () => dispatch({type: 'playView/SET_EVENT_RNG'}),
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
      this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? (this.props.enemiesSetEnemyRNG(), this.props.playView.possibleActions.push('attack')) : null
      this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ? this.props.choiceEventsSetChoiceEventRNG() : null
      this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.playView.storyOutput.push(this.props.areas.data[this.props.areas.areaRNG].description,
          'You encounter ' + this.props.enemies.data[this.props.enemies.enemyRNG].name + '!') : this.props.playView.events[this.props.playView.eventRNG] === 'choiceEvent' ?
          this.props.playView.storyOutput.push(this.props.choiceEvents.data[this.props.choiceEvents.choiceEventRNG].description) : null
      this.props.playView.events[this.props.playView.eventRNG] === 'fight' ? this.props.enemyStatsSetEnemy(this.props.enemies.data[this.props.enemies.enemyRNG].health, this.props.enemies.data[this.props.enemies.enemyRNG].maxHealth, this.props.enemies.data[this.props.enemies.enemyRNG].energy, this.props.enemies.data[this.props.enemies.enemyRNG].maxEnergy) : null
      setTimeout(() => this.setState({
        isDisabled: false
      }), 3000)
    } else if(this.props.playView.inputValue === 'attack' && this.props.playView.possibleActions.includes('attack')) {
        if(this.props.enemyStats.health > 0) {
            this.props.hitEnemy(Math.ceil(Math.random() * 4))
        } else {
            let indexOfAttackCommand = this.props.playView.possibleActions.indexOf('attack')
            this.props.playView.possibleActions.splice(indexOfAttackCommand, 1)
        }
    } else {
      return null
    }
  }

  render() {
    return (
        <Col lg={6}>
          <hr/>
          <textarea style={this.storyOutputStyle} readOnly value={this.props.playView.storyOutput.join('\n')}/>
          <input style={this.playerInputStyle} onChange={event => this.props.inputChange(event.target.value)}/>
          <button disabled={this.state.isDisabled} style={this.playerButtonStyle} onClick={() => this.handleStoryUpdate()}>Perform action</button>
        </Col>
    )
  }
}
)
