import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      enemyStats: state.enemyStats
    }),
    dispatch => ({
    })
)(
    class EnemyView extends Component {
      render() {
        return (
            <Col lg={3} lgPush={1}>
                {
                    this.props.enemyStats.isAlive ?
                        <div>
                            <h1>Monster</h1>
                            <h2>Health</h2>
                            <p>{this.props.enemyStats.health}/{this.props.enemyStats.maxHealth}</p>
                        </div> : <div></div>
                }
            </Col>
        )
      }
    }
)