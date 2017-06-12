import React, { Component } from 'react'

class PlayerView extends Component {
  render() {
    return (
        <div>
          <h1>Player</h1>
          <h2>Health</h2>
          <p>100/100</p>
          <h2>Energy</h2>
          <p>20/20</p>
        </div>
    )
  }
}

export default PlayerView