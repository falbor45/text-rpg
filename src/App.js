import React, { Component } from 'react';
import {Grid} from 'react-bootstrap'
import PlayerView from './PlayerView'
import PlayView from './PlayView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <PlayerView/>
          <PlayView/>
        </Grid>
      </div>
    );
  }
}

export default App;
