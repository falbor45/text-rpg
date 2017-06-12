import React, { Component } from 'react';
import {Grid} from 'react-bootstrap'
import PlayerView from './PlayerView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
        <PlayerView/>
        </Grid>
      </div>
    );
  }
}

export default App;
