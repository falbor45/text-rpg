import playerStats from './parts/playerStats'
import playView from './parts/playView'
import areas from './parts/areas'

export default (state = {}, action) => {
  return {
    playerStats: playerStats(state.playerStats, action),
    playView: playView(state.playView, action),
    areas: areas(state.areas, action)
  }
}