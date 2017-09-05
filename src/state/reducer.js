import playerStats from './parts/playerStats'
import enemyStats from './parts/enemyStats'
import playView from './parts/playView'
import areas from './parts/areas'
import enemies from './parts/enemies'
import choiceEvents from './parts/choiceEvents'
import blockMechanic from './parts/blockMechanic'

export default (state = {}, action) => {
  return {
    playerStats: playerStats(state.playerStats, action),
    enemyStats: enemyStats(state.enemyStats, action),
    playView: playView(state.playView, action),
    areas: areas(state.areas, action),
    enemies: enemies(state.enemies, action),
    choiceEvents: choiceEvents(state.choiceEvents, action),
    blockMechanic: blockMechanic(state.blockMechanic, action)
  }
}