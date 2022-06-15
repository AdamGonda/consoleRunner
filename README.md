<p align="left">
  <img src="https://github.com/AdamGonda/loop/blob/main/loop-logo.png">
</p>

A simple game loop in the console, with FP in mind.

# Example usage

```js
// in your index.js
const { run } = require('console-runner')

run({
  initialState: { player: { x: 10, y: 5 }},
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
