function pipe(seed) {
  return (...ops) => ops.reduce((state, action) => action(state), seed)
}

function find(state, tag) {
  return state.find((x) => x.tag == tag)
}

function getRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function isInRange(start, num, end) {
  return num >= start && num <= end
}

function isOverlap(obj1, obj2) {
  return obj1.x == obj2.x && obj1.y == obj2.y
}

function unfoldArr(acc, x) {
  return Array.isArray(x) ? acc.concat(x) : acc.concat([x])
}

function filterObjFields(fields, keep) {
  return (state) => {
    return Object.keys(state)
      .filter((key) => (keep ? fields.includes(key) : !fields.includes(key)))
      .reduce((clean, key) => {
        clean[key] = state[key]
        return clean
      }, {})
  }
}

function randomBool(chance) {
  return Math.random() <= chance
}

function getRandomItemFrom(iterable) {
  let arr = iterable
  if (!Array.isArray(iterable)) {
    arr = Object.values(iterable)
  }
  return arr[getRange(0, arr.length - 1)]
}

function hasMatch(arr1, arr2, fn) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const a = arr1[i]
      const b = arr2[j]
      if (fn(a, b)) {
        return true
      }
    }
    
  }
  return false
}

function point(x, y) {
  return { x, y }
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
exports.find = find
exports.getRange = getRange
exports.isInRange = isInRange
exports.isOverlap = isOverlap
exports.unfoldArr = unfoldArr
exports.filterObjFields = filterObjFields
exports.randomBool = randomBool
exports.getRandomItemFrom = getRandomItemFrom
exports.hasMatch = hasMatch
exports.point = point
exports.DIRS = DIRS
exports.awsd = awsd
exports.QUIT = QUIT
