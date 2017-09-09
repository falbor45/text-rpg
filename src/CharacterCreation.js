import React, { Component } from 'react'
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats
    }),
    dispatch => ({
      playerStatsCreateCharacter: (value) => dispatch({ type: 'playerStats/CREATE_CHARACTER', value}),
      playerStatsStatRoll: () => dispatch({ type: 'playerStats/STAT_ROLL'})
    })
)(
    class CharacterCreation extends Component {

      render() {
        return (
            <div>
            <Form horizontal style={{textAlign: 'center'}}>
              <FormGroup>
                <Col smOffset={3} sm={6} xsOffset={3} xs={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
                  What is your name?
                </Col>
                <br/>
                <Col smOffset={3} sm={6} xsOffset={3} xs={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
                  <FormControl type="text" id="name"/>
                </Col>
              </FormGroup>
            </Form>
              <Col xsOffset={3} xs={6} mdOffset={3} md={6} lg={5} lgOffset={4}>
                <h2>Strength</h2>
                <h2>Agility</h2>
                <h2>Wisdom</h2>
                <h2>Constitution</h2>
              </Col>
              <Col xs={2} xsPull={1} md={3} mdPull={1} lg={2} lgPull={2}>
                <h2>{this.props.playerStats.strength}</h2>
                <h2>{this.props.playerStats.agility}</h2>
                <h2>{this.props.playerStats.wisdom}</h2>
                <h2>{this.props.playerStats.constitution}</h2>
              </Col>
              <Col style={{textAlign: 'center'}} xsOffset={3} xs={3} sm={3} md={3} lg={3}>
              <Button style={{marginTop: '12px'}} type="button" onClick={() => {this.props.playerStatsStatRoll()}}>Roll</Button>
              </Col>
              <Col style={{textAlign: 'center'}} xs={3} sm={3} md={3} lg={3}>
                <Button onClick={() => this.props.playerStatsCreateCharacter(document.getElementById('name').value)} style={{marginTop: '12px'}}>Create character</Button>
              </Col>
            </div>
        )
      }
    }
)
