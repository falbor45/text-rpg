import playerStats from './parts/playerStats'

export default (state = {}, action) => {
  return {
    playerStats: playerStats(state.playerStats, action)
  }
}