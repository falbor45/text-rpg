import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect (
    state => ({
      playerStats: state.playerStats,
    }),
)(
    class PlayerView extends Component {
      render() {
        return (
            <Col lg={3}>
              <h1>Player</h1>
              <h2>Health</h2>
              <p>{`${this.props.playerStats.health}/${this.props.playerStats.maxHealth}`}</p>
              <h2>Energy</h2>
              <p>{`${this.props.playerStats.energy}/${this.props.playerStats.maxEnergy}`}</p>
            </Col>
        )
      }
    }
)