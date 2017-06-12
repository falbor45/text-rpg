import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

class PlayView extends Component {
  storyOutputStyle = {
    width: "100%",
    maxHeight: "90vh",
    resize: "vertical"
  }

  playerInputStyle = {
    width: "100%",
  }
  render() {
    return (
        <Col lg={6}>
          <hr/>
          <textarea style={this.storyOutputStyle} readOnly/>
          <input style={this.playerInputStyle}/>
        </Col>
    )
  }
}

export default PlayView