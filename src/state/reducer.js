import playerStats from './parts/playerStats'
import playView from './parts/playView'

export default (state = {}, action) => {
  return {
    playerStats: playerStats(state.playerStats, action),
    playView: playView(state.playView, action)
  }
}