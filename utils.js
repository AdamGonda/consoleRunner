function pipe(seed) {
  return (...ops) => ops.reduce((state, action) => action(state), seed)
}

function isInRange(start, num, end) {
  return num >= start && num <= end
}

// Accepted inputs
// 97, 119, 115, 100, 113
// a   w    s    d    q
const UP = "119"
const DOWN = "115"
const RIGHT = "100"
const LEFT = "97"
const QUIT = "113"

const DIRS = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
}

const awsd = {
  [UP]: DIRS.UP,
  [DOWN]: DIRS.DOWN,
  [RIGHT]: DIRS.RIGHT,
  [LEFT]: DIRS.LEFT,
}

exports.pipe = pipe
exports.isInRange = isInRange
exports.awsd = awsd
exports.QUIT = QUIT