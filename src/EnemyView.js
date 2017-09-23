import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      enemyStats: state.enemyStats,
      enemies: state.enemies
    }),
    dispatch => ({
    })
)(
    class EnemyView extends Component {
      render() {
        return (
            <Col lg={3} lgPush={1}>
                {
                    this.props.enemyStats.eIsAlive ?
                        <div>
                            <h1>{this.props.enemies.data[this.props.enemies.enemyRNG].name.charAt(0).toUpperCase() + this.props.enemies.data[this.props.enemies.enemyRNG].name.slice(1)}</h1>
                            <h2>Health</h2>
                            <p>{this.props.enemyStats.eHealth}/{this.props.enemyStats.eMaxHealth}</p>
                            <h3>Speed</h3>
                            <p>{this.props.enemyStats.eSpeed}</p>
                        </div> : <div></div>
                }
            </Col>
        )
      }
    }
)