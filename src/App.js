import React, { Component } from 'react';
import {Grid} from 'react-bootstrap'
import { connect } from 'react-redux'
import PlayerView from './PlayerView'
import PlayView from './PlayView'
import EnemyView from './EnemyView'
import CharacterCreation from './CharacterCreation'

export default connect(
    state => ({
      playerStats: state.playerStats
    }),
    dispatch => ({

    })
)(
    class App extends Component {
      render() {
        return (
            <div className="App">
              { this.props.playerStats.isCreated === false ? (
                  <Grid>
                    <CharacterCreation/>
                  </Grid>
              ) : (
                  <Grid>
                    <PlayerView/>
                    <PlayView/>
                    <EnemyView/>
                  </Grid>
              )
              }
            </div>
        );
      }
    }
)
