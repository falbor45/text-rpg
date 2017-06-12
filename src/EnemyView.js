import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

class EnemyView extends Component {
  render() {
    return (
        <Col lg={3} lgPush={1}>
          <h1>Monster</h1>
          <h2>Health</h2>
          <p>12/12</p>
          <h2>Energy</h2>
          <p>5/5</p>
        </Col>
    )
  }
}

export default EnemyView