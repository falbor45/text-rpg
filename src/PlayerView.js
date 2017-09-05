import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import blockFront1 from './assets/images/blockfront1.png'
import blockFront2 from './assets/images/blockfront2.png'
import blockFront3 from './assets/images/blockfront3.png'
import blockLeft1 from './assets/images/blockleft1.png'
import blockLeft2 from './assets/images/blockleft2.png'
import blockLeft3 from './assets/images/blockleft3.png'
import blockRight1 from './assets/images/blockright1.png'
import blockRight2 from './assets/images/blockright2.png'
import blockRight3 from './assets/images/blockright3.png'

export default connect (
    state => ({
      playerStats: state.playerStats,
      blockMechanic: state.blockMechanic
    }),
)(
    class PlayerView extends Component {

      attrStyleLeft = {
        float: 'left'
      }
      attrStyleRight = {
        float: 'right'
      }

      imageBlockStyle = {
        width: '33.3%'
      }

      render() {
        return (
            <Col lg={3}>
              <h1>Player</h1>
              <h2>Health</h2>
              <p>{`${this.props.playerStats.health}/${this.props.playerStats.maxHealth}`}</p>
              <h2>Energy</h2>
              <p>{`${this.props.playerStats.energy}/${this.props.playerStats.maxEnergy}`}</p>
              <h2>Attack power</h2>
              <h3>{this.props.playerStats.attackPowerMin} - {this.props.playerStats.attackPowerMax}</h3>
              <h2>Dodge chance</h2>
              <h3>{this.props.playerStats.baseDodgeChance}%</h3>
              <h2>Block setup </h2>
                  <img src={blockLeft1} style={this.imageBlockStyle}/>
                  <img src={blockFront1} style={this.imageBlockStyle}/>
                  <img src={blockRight1} style={this.imageBlockStyle}/>
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