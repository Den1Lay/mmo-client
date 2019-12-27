const defState = {
  value: 'yeas',
  dir: 'none'
}

export default (state = defState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'MOVE': {
      return {
        ...state,
        dir: payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}