const { run } = require('./index')

run({
  initialState: {
    player: { x: 10, y: 5, isHappy: true },
    view: { width: 20, height: 10 },
    isGameOver: false,
  },
  update: (state, input) => state,
  toCommon: (state) => [{ ...state.player, tag: 'player' }],
  renderMap: { player: 'X' },
  dimensions: { width: 20, height: 10 }
})