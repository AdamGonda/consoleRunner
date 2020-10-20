const { pipe, isInRange, awsd, QUIT } = require("./utils")

const BACKGROUND = " "
const TOP_AND_BOTTOM = "-"
const LEFT_AND_RIGHT = "|"

function getVerticalBorder(w) {
  return Array(w).fill(TOP_AND_BOTTOM).join("")
}

function isOnScreen(obj, ds) {
  return isInRange(-1, obj.x, ds.WIDTH) && isInRange(0, obj.y, ds.HEIGHT)
}

function showObjects(state, renderMap, ds, isReverted) {
  return (screen) => {
    state.forEach((obj) => {
      if (isOnScreen(obj, ds)) {
        screen[obj.y][obj.x + 1] = renderMap[obj.tag]
      }
    })

    // console renders from top to bottom
    if (isReverted){
      return screen
    }
    
    return screen.reverse()
  }
}

function showLeftAndRightBorder(screen) {
  return screen.map((line) =>
    line.map((c, i, arr) =>
      i == 0 || i == arr.length - 1 ? LEFT_AND_RIGHT : c
    )
  )
}

function joinChars(screen) {
  return screen
    .map((line, i, arr) =>
      i == arr.length - 1 ? line.join("") : line.join("") + "\n"
    )
    .join("")
}

function renderToConsole(state, renderMap, ds, header, footer, isDebug, input, isReverted) {
  let screen = pipe(
    [...Array(ds.HEIGHT + 1)].map(() => Array(ds.WIDTH + 3).fill(BACKGROUND))
  )(showObjects(state, renderMap, ds, isReverted), showLeftAndRightBorder, joinChars)

  !isDebug && console.log("\033[2J")
  isDebug && console.log("input", input)
  header && header(state)
  console.log(getVerticalBorder(ds.WIDTH + 3))
  console.log(screen)
  console.log(getVerticalBorder(ds.WIDTH + 3))
  footer && footer(state)
}

const bridge = {
  input: null,
}

exports.run = ({
  initialState,
  update,
  toCommon,
  renderMap,
  inputMap = awsd,
  dimensions,
  header,
  footer,
  updateTime = 100, // bigger is slower
  isDebug = true,
  isReverted = false,
}) => {
  // RUN IN TERMINAL
  let currentState = initialState

  process.stdin.setRawMode(true)
  process.stdin.on("data", (buffer) => {
    let key = buffer.toJSON().data[0].toString()
    const isGameOver = currentState.isGameOver

    if (key == QUIT || isGameOver) process.exit()
    if (Object.keys(inputMap).includes(key)) bridge.input = inputMap[key]
  })

  setInterval(() => {
    currentState = update(currentState, bridge.input)
    isDebug && console.log(currentState)
    renderToConsole(
      toCommon(currentState),
      renderMap,
      dimensions,
      header,
      footer,
      isDebug,
      bridge.input,
      isReverted,
    )
    bridge.input = null
  }, updateTime)
}
