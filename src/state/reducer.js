import playerStats from './parts/playerStats'
import playView from './parts/playView'
import areas from './parts/areas'
import enemies from './parts/enemies'
import choiceEvents from './parts/choiceEvents'

export default (state = {}, action) => {
  return {
    playerStats: playerStats(state.playerStats, action),
    playView: playView(state.playView, action),
    areas: areas(state.areas, action),
    enemies: enemies(state.enemies, action),
    choiceEvents: choiceEvents(state.choiceEvents, action)
  }
}