import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      playView: state.playView,
      areas: state.areas,
      enemies: state.enemies,
      choiceEvents: state.choiceEvents
    }),
    dispatch => ({
      hitPlayer: value => dispatch({ type: 'playerStats/HIT_PLAYER', value}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value}),
      areasFetchBegin: () => dispatch({ type: 'areas/FETCH__BEGIN'}),
      areasFetchSuccess: data => dispatch({ type: 'areas/FETCH__SUCCESS', data}),
      areasFetchFailure: error => dispatch({ type: 'areas/FETCH__FAILURE', error}),
      enemiesFetchBegin: () => dispatch({ type: 'enemies/FETCH__BEGIN'}),
      enemiesFetchSuccess: data => dispatch({ type: 'enemies/FETCH__SUCCESS', data}),
      enemiesFetchFailure: error => dispatch({ type: 'enemies/FETCH__FAILURE', error}),
      choiceEventsFetchBegin: () => dispatch({ type: 'choiceEvents/FETCH__BEGIN'}),
      choiceEventsFetchSuccess: data => dispatch({ type: 'choiceEvents/FETCH__SUCCESS', data}),
      choiceEventsFetchFailure: error => dispatch({ type: 'choiceEvents/FETCH__FAILURE', error})
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
    storyOutput: [],
    events: ['fight', 'choiceEvent'],
    areaRNG: 0,
    enemyRNG: 0,
    eventRNG: 0
  }

  handleStoryUpdate = () => {
    this.setState({
      areaRNG: Math.floor(Math.random() * this.props.areas.data.length),
      eventRNG: Math.floor(Math.random() * this.state.events.length),
      enemyRNG: this.state.events[this.state.eventRNG] === 'fight' ? Math.floor(Math.random() * this.props.enemies.data.length) : 0,
      choiceEventRNG: this.state.events[this.state.eventRNG] === 'choiceEvent' ? Math.floor(Math.random() * this.props.choiceEvents.data.length) : 0
    })
    this.setState({
      storyOutput: this.state.events[this.state.eventRNG] === 'fight' ? this.state.storyOutput.concat(this.props.areas.data[this.state.areaRNG].description,
          'You encounter ' + this.props.enemies.data[this.state.enemyRNG].name + '!') : this.state.events[this.state.eventRNG] === 'choiceEvent' ? this.state.storyOutput.concat(this.props.choiceEvents.data[this.state.choiceEventRNG].description) : null,
    })
  }

  render() {
    return (
        <Col lg={6}>
          <hr/>
          <textarea style={this.storyOutputStyle} readOnly value={this.state.storyOutput.join('\n')}/>
          <input style={this.playerInputStyle} onChange={event => this.props.inputChange(event.target.value)}/>
          <button style={this.playerButtonStyle} onClick={() => (this.props.playView.inputValue) === 'explore' ? this.handleStoryUpdate() : null }>Perform action</button>
        </Col>
    )
  }
}
)
