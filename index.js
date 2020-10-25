const { pipe, isInRange, awsd, QUIT } = require('./utils')
const EventEmitter = require('events')

const BACKGROUND = ' '
const TOP_AND_BOTTOM = '-'
const LEFT_AND_RIGHT = '|'

const exitEmitter = new EventEmitter()
exitEmitter.on('exit', () => process.exit())

function run({
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
}) {
  let currentState = initialState
  const bridge = {
    input: null,
  }

  process.stdin.setRawMode(true)
  process.stdin.on('data', buffer => {
    let key = buffer.toJSON().data[0].toString()

    if (key == QUIT) {
      process.exit()
    }
    if (Object.keys(inputMap).includes(key)) {
      bridge.input = inputMap[key]
    }
  })

  setInterval(() => {
    currentState = update(currentState, bridge.input)

    if (currentState.isGameOver) {
      exitEmitter.emit('exit')
    }

    renderToConsole(
      currentState,
      toCommon,
      renderMap,
      dimensions,
      header,
      footer,
      isDebug,
      bridge.input,
    )

    bridge.input = null
  }, updateTime)
}

function renderToConsole(
  state,
  toCommon,
  renderMap,
  dimensions,
  header,
  footer,
  isDebug,
  input,
) {
  const { width, height } = dimensions
  const common = toCommon(state)

  const base = [...Array(height + 1)].map(() =>
    Array(width + 3).fill(BACKGROUND),
  )

  // prettier-ignore
  let screen = pipe(base)
    (
      drawToScreen(common, renderMap, dimensions),
      showLeftAndRightBorder,
      joinChars
    )

  if (isDebug) {
    console.log(state)
    console.log('input', input)
  } else {
    console.log('\033[2J')
  }

  header && header(state)
  console.log(getVerticalBorder(width + 3))
  console.log(screen)
  console.log(getVerticalBorder(width + 3))
  footer && footer(state)
}

function drawToScreen(state, renderMap, dimensions) {
  return screen => {
    state.forEach(obj => {
      if (isOnScreen(obj, dimensions)) {
        screen[obj.y][obj.x + 1] = renderMap[obj.tag]
      }
    })

    return screen.reverse()
  }
}

function isOnScreen(obj, dimensions) {
  const { width, height } = dimensions
  return isInRange(0, obj.x, width) && isInRange(0, obj.y, height)
}

function showLeftAndRightBorder(screen) {
  return screen.map(line =>
    line.map((c, idx, arr) =>
      idx == 0 || idx == arr.length - 1 ? LEFT_AND_RIGHT : c,
    ),
  )
}

function joinChars(screen) {
  return screen
    .map((line, idx, arr) =>
      idx == arr.length - 1 ? line.join('') : line.join('') + '\n',
    )
    .join('')
}

function getVerticalBorder(width) {
  return Array(width).fill(TOP_AND_BOTTOM).join('')
}

function validateArgs(args) {
  const {
    initialState,
    update,
    toCommon,
    renderMap,
    inputMap,
    dimensions,
    header,
    footer,
    updateTime,
    isDebug,
  } = args

  const msg = property =>
    `You missed the '${property}' property from run's config, or it is not `

  const isObject = value =>
    !!value && typeof value == 'object' && !Array.isArray(value)

  const isFunction = value => !!value && typeof value === 'function'

  if (!isObject(initialState)) {
    throw Error(msg('initialState') + 'an object.')
  }

  if (!isFunction(update)) {
    throw Error(msg('update') + 'a function.')
  }

  if (!isFunction(toCommon)) {
    throw Error(msg('toCommon') + 'a function.')
  }

  if (!isObject(renderMap)) {
    throw Error(msg('renderMap') + 'an object.')
  }
  
  if (!isObject(dimensions)) {
    throw Error(msg('dimensions') + 'an object.')
  }
  
  // optional
  if (inputMap && !isObject(inputMap)) {
    throw Error('inputMap is not an object.')
  }

  if (header && !isFunction(header)) {
    throw Error('header is not a function.')
  }

  if (footer && !isFunction(footer)) {
    throw Error('footer is not a function.')
  }

  if (updateTime && isNaN(updateTime)) {
    throw Error('updateTime is not a number.')
  }

  if (isDebug && typeof isDebug === "boolean") {
    throw Error('isDebug is not a boolean.')
  }

  run(args)
}

exports.run = validateArgs
