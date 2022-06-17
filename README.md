<p align="left">
  <img src="https://github.com/AdamGonda/loop/blob/main/logo-v2.png">
</p>

# The missing game loop for your Pure function

You just have to define your `initial state` and an `update` function
then the loop takes care of the rest of it, calling update in each iteration
with the `currentState` and an `input` if any, or terminating the cycle if the
`isGameOver` is true or you press `q`.

# Example usage

Install:
```console
npm install adamgonda/loop
```

```js
// in your index.js
const { run } = require('console-runner')

run({
  initialState: { player: { x: 10, y: 5, isHappy: true }, view: { width: 20, height: 10 }},
  update: (state, input) => state,
  toCommon: (state) => [{ ...state.player, tag: 'player' }],
  renderMap: { player: 'X' },
  dimensions: { width: 20, height: 10 }
})
```

when you run `node ./index.js` it will produce
a running app/game which looks like this 👇

```md
{ player: { x: 10, y: 5 } }
input null
-----------------------
|                     |
|                     |
|                     |
|                     |
|                     |
|          X          |
|                     |
|                     |
|                     |
|                     |
|                     |
-----------------------
```

# API

Loop exports one function `run`.

```js
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
```
