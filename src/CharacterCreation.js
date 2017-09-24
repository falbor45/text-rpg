import React, { Component } from 'react'
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

export default connect(
    state => ({
      playerStats: state.playerStats,
      abilities: state.abilities
    }),
    dispatch => ({
      playerStatsCreateCharacter: (value) => dispatch({ type: 'playerStats/CREATE_CHARACTER', value}),
      playerStatsStatRoll: () => dispatch({ type: 'playerStats/STAT_ROLL'}),
      areasFetchBegin: () => dispatch({ type: 'areas/FETCH__BEGIN'}),
      areasFetchSuccess: data => dispatch({ type: 'areas/FETCH__SUCCESS', data}),
      areasFetchFailure: error => dispatch({ type: 'areas/FETCH__FAILURE', error}),
      enemiesFetchBegin: () => dispatch({ type: 'enemies/FETCH__BEGIN'}),
      enemiesFetchSuccess: data => dispatch({ type: 'enemies/FETCH__SUCCESS', data}),
      enemiesFetchFailure: error => dispatch({ type: 'enemies/FETCH__FAILURE', error}),
      choiceEventsFetchBegin: () => dispatch({ type: 'choiceEvents/FETCH__BEGIN'}),
      choiceEventsFetchSuccess: data => dispatch({ type: 'choiceEvents/FETCH__SUCCESS', data}),
      choiceEventsFetchFailure: error => dispatch({ type: 'choiceEvents/FETCH__FAILURE', error}),
      abilitiesFetchBegin: () => dispatch({ type: 'abilities/FETCH__BEGIN'}),
      abilitiesFetchSuccess: data => dispatch({ type: 'abilities/FETCH__SUCCESS', data}),
      abilitiesFetchFailure: error => dispatch({ type: 'abilities/FETCH__FAILURE', error}),
    })
)(
    class CharacterCreation extends Component {

      componentWillMount() {
        this.props.areasFetchBegin()
        fetch(
          `${process.env.PUBLIC_URL}/data/areas.json`
        ).then(
          response => response.json().then(
            data => this.props.areasFetchSuccess(data)
          ).catch(
            error => this.props.areasFetchFailure('Malformed JSON.')
          )
        ).catch(
          error => this.props.areasFetchFailure('Connection error.')
        )

        this.props.enemiesFetchBegin()
        fetch(
          `${process.env.PUBLIC_URL}/data/enemies.json`
        ).then(
          response => response.json().then(
            data => this.props.enemiesFetchSuccess(data)
          ).catch(
            error => this.props.enemiesFetchFailure('Malformed JSON.')
          )
        ).catch(
          error => this.props.enemiesFetchFailure('Connection error.')
        )

        this.props.choiceEventsFetchBegin()
        fetch(
          `${process.env.PUBLIC_URL}/data/choiceEvents.json`
        ).then(
          response => response.json().then(
            data => this.props.choiceEventsFetchSuccess(data)
          ).catch(
            error => this.props.choiceEventsFetchFailure('Malformed JSON.')
          )
        ).catch(
          error => this.props.choiceEventsFetchFailure('Connection error.')
        )

        this.props.abilitiesFetchBegin()
        fetch(
          `${process.env.PUBLIC_URL}/data/abilities.json`
        ).then(
          response => response.json().then(
            data => this.props.abilitiesFetchSuccess(data)
          ).catch(
            error => this.props.abilitiesFetchFailure('Malformed JSON.')
          )
        ).catch(
          error => this.props.abilitiesFetchFailure('Connection error.')
        )
      }

      state = {
        errorMessage: ''
      }

      createCharacter = (value) => {
        if (value.length <= 16 && value.length >= 3) {
          this.props.playerStatsCreateCharacter(value)
        }
        if (value.length < 3) {
          this.setState({
            errorMessage: 'Your name is too short!'
          })
        }
        if (value.length > 16) {
          this.setState({
            errorMessage: 'Your name is too long!'
          })
        }
        return null
      }

      render() {
        return (
            <div>
            <Form autoComplete="off" horizontal style={{textAlign: 'center'}}>
              <FormGroup>
                <Col smOffset={3} sm={6} xsOffset={3} xs={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
                  What is your name?
                </Col>
                <br/>
                <Col smOffset={3} sm={6} xsOffset={3} xs={6} mdOffset={3} md={6} lgOffset={3} lg={6}>
                  <FormControl type="text" id="name"/>
                  <p style={this.state.errorMessage !== '' ? {color: "red"} : null}>{this.state.errorMessage !== '' ? this.state.errorMessage : 'Your name must be between 3 and 16 characters'}</p>
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
                <h2>{this.props.playerStats.pStrength}</h2>
                <h2>{this.props.playerStats.pAgility}</h2>
                <h2>{this.props.playerStats.pWisdom}</h2>
                <h2>{this.props.playerStats.pConstitution}</h2>
              </Col>
              <Col style={{textAlign: 'center'}} xsOffset={3} xs={3} sm={3} md={3} lg={3}>
              <Button style={{marginTop: '12px'}} type="button" onClick={() => {this.props.playerStatsStatRoll()}}>Roll</Button>
              </Col>
              <Col style={{textAlign: 'center'}} xs={3} sm={3} md={3} lg={3}>
                <Button onClick={() => this.createCharacter(document.getElementById('name').value)} style={{marginTop: '12px'}}>Create character</Button>
              </Col>
            </div>
        )
      }
    }
)
