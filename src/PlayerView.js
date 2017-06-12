import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

class PlayerView extends Component {
  render() {
    return (
        <Col lg={3}>
          <h1>Player</h1>
          <h2>Health</h2>
          <p>100/100</p>
          <h2>Energy</h2>
          <p>20/20</p>
        </Col>
    )
  }
}

export default PlayerView