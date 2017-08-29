import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect (
    state => ({
      playerStats: state.playerStats,
    }),
)(
    class PlayerView extends Component {

      attrStyleLeft = {
        float: 'left'
      }
      attrStyleRight = {
        float: 'right'
      }
      render() {
        return (
            <Col lg={3}>
              <h1>Player</h1>
              <h2>Health</h2>
              <p>{`${this.props.playerStats.health}/${this.props.playerStats.maxHealth}`}</p>
              <h2>Energy</h2>
              <p>{`${this.props.playerStats.energy}/${this.props.playerStats.maxEnergy}`}</p>
              <h2>Attack power: {this.props.playerStats.attackPower}</h2>
              <hr/>
              <h2>Attributes</h2>
              <div style={this.attrStyleLeft}>
              <h3>Strength:</h3>
              <h3>Wisdom:</h3>
              <h3>Agility:</h3>
              <h3>Constitution:</h3>
              </div>
              <div style={this.attrStyleRight}>
              <h3>{this.props.playerStats.strength}</h3>
              <h3>{this.props.playerStats.wisdom}</h3>
              <h3>{this.props.playerStats.agility}</h3>
              <h3>{this.props.playerStats.constitution}</h3>
              </div>
            </Col>
        )
      }
    }
)