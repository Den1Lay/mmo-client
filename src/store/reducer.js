const defaultState = {
  value: 'yeas'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE': {
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}