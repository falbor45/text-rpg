import React, { Component } from 'react';
import {Grid} from 'react-bootstrap'
import PlayerView from './PlayerView'
import PlayView from './PlayView'
import EnemyView from './EnemyView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <PlayerView/>
          <PlayView/>
          <EnemyView/>
        </Grid>
      </div>
    );
  }
}

export default App;
