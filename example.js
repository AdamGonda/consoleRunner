const { run } = require('./index')

run({
  // required: starting point for a game
  // it has to contain properties:
  // isGameOver: boolean
  // view: { width: number, height: number }
  // example 👇
  initialState: {
    player: { x: 10, y: 5, isHappy: true },
    view: { width: 20, height: 10 },
    isGameOver: false,
  },

  // required: implements the main game logic
  // example 👇
  update: (state, input) => state,

  // required: transforms every unique game state to a common form
  // which is a list of objects with x, y and a tag property
  // example 👇
  toCommon: (state) => [{ ...state.player, tag: 'player' }],

  // required: maps tags to characters
  // example 👇
  renderMap: { player: 'X' },

  // optional, maps a numeric character from the console to a value relevant to you
  // example 👇
  // inputMap: { '119': 'UP', '115': 'DOWN' }

  // optional, function (state) => void, called before and after render
  // example 👇
  // header: (state) => console.log('This is the header'),
  // footer: (state) => console.log('This is the footer'),

  // optional, default is 100, determines time between renders
  // example 👇
  // timeBetweenRender: 50,

  // optional, default true, logs state and input
  // example 👇
  // isDebug: false
})