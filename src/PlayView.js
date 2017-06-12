import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

class PlayView extends Component {
  storyOutputStyle = {
    width: "100%",
    height: "30vh",
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
          <textarea style={this.storyOutputStyle} readOnly value=""/>
          <input style={this.playerInputStyle}/>
        </Col>
    )
  }
}

export default PlayView