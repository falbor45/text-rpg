import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      playView: state.playView
    }),
    dispatch => ({
      hitPlayer: value => dispatch({ type: 'playerStats/HIT_PLAYER', value}),
      inputChange: value => dispatch({ type: 'playView/INPUT_CHANGE', value})
    })
)(
class PlayView extends Component {

  state ={
    areas: null,
  }

  componentWillMount() {
    fetch(
        process.env.PUBLIC_URL + '/data/areas.json'
    ).then(
        response => response.json()
    ).then(
        areas => this.setState({
          areas: areas
        })
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

  render() {
    return (
        <Col lg={6}>
          <hr/>
          <textarea style={this.storyOutputStyle} readOnly value=""/>
          <input style={this.playerInputStyle} onChange={event => this.props.inputChange(event.target.value)}/>
          <button style={this.playerButtonStyle} onClick={() => (this.props.playView.inputValue) === 'hit' ? this.props.hitPlayer(2) : null }>Perform action</button>
        </Col>
    )
  }
}
)
