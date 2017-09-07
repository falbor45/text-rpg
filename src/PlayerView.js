import React, { Component } from 'react'
import { Col, ProgressBar } from 'react-bootstrap'
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
import blockPlaceholder from './assets/images/blockplaceholder.png'

export default connect (
    state => ({
      playerStats: state.playerStats,
      blockMechanic: state.blockMechanic
    }),
    dispatch => ({
      blockMechanicChangeLeftBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_LEFT_BLOCK', what}),
      blockMechanicChangeFrontBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_FRONT_BLOCK', what}),
      blockMechanicChangeRightBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_RIGHT_BLOCK', what})
    })
)(
    class PlayerView extends Component {

      handleLeftBlockClick = (e) => {
        if (e.nativeEvent.which === 1) {
          this.props.blockMechanicChangeLeftBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeLeftBlock('substract')
        }
      }

      handleFrontBlockClick = (e) => {
        if (e.nativeEvent.which === 1) {
          this.props.blockMechanicChangeFrontBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeFrontBlock('substract')
        }
      }

      handleRightBlockClick = (e) => {
        if (e.nativeEvent.which === 1 ) {
          this.props.blockMechanicChangeRightBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeRightBlock('substract')
        }
      }

      attrStyleLeft = {
        float: 'left'
      }
      attrStyleRight = {
        float: 'right'
      }

      imageBlockStyle = {
        width: '33.3%'
      }

      centerBarText = {
        position: 'absolute',
        left: '50%'
      }

      barOverlap = {
        position: 'relative',
        left: '-50%'
      }

      render() {
        for (let i = 0; i < document.getElementsByTagName('img').length; i++) {
          document.getElementsByTagName('img')[i].oncontextmenu = () => {
            return false
          }
        }
        return (
            <Col lg={3}>
              <h1>Player</h1>
              <h2>Health</h2>
              <div style={this.centerBarText}>
              <p style={this.barOverlap}>{`${this.props.playerStats.health}/${this.props.playerStats.maxHealth}`}</p>
              </div>
              <ProgressBar bsStyle="success" now={Math.round((this.props.playerStats.health / this.props.playerStats.maxHealth) * 100)}/>
              <h2>Energy</h2>
              <div style={this.centerBarText}>
              <p style={this.barOverlap}>{`${this.props.playerStats.energy}/${this.props.playerStats.maxEnergy}`}</p>
              </div>
              <ProgressBar bsStyle="info" now={Math.round((this.props.playerStats.energy / this.props.playerStats.maxEnergy) * 100)}/>
              <h2>Attack power</h2>
              <h3>{this.props.playerStats.attackPowerMin} - {this.props.playerStats.attackPowerMax}</h3>
              <h2>Dodge chance</h2>
              <h3>{this.props.playerStats.baseDodgeChance}%</h3>
              <h2>Armour</h2>
              <h3>{this.props.playerStats.armour}</h3>
              <p>Damage reduction: {this.props.playerStats.damageReduction}%</p>
              <h2>Block setup </h2>
              <img onMouseDown={(e) => this.handleLeftBlockClick(e)} src={this.props.blockMechanic.leftBlockPoints === 1 ? blockLeft1 : this.props.blockMechanic.leftBlockPoints === 2 ? blockLeft2 : this.props.blockMechanic.leftBlockPoints === 3 ? blockLeft3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <img onMouseDown={(e) => this.handleFrontBlockClick(e)} src={this.props.blockMechanic.frontBlockPoints === 1 ? blockFront1 : this.props.blockMechanic.frontBlockPoints === 2 ? blockFront2 : this.props.blockMechanic.frontBlockPoints === 3 ? blockFront3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <img onMouseDown={(e) => this.handleRightBlockClick(e)} src={this.props.blockMechanic.rightBlockPoints === 1 ? blockRight1 : this.props.blockMechanic.rightBlockPoints === 2 ? blockRight2 : this.props.blockMechanic.rightBlockPoints === 3 ? blockRight3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <p>Points undistributed: {this.props.blockMechanic.unusedBlockPoints}</p>
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