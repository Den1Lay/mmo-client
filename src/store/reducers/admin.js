const defState = {
  show: null
}

export default (state = defState, action) => {
  const {type, payload} = action
  switch(type) {
    case 'MAKE_SLIDE':
      return {
        ...state,
        show: payload 
      }
    case 'OVER_MAKE_SLIDE':
      return {
        ...state,
        show: null
      }
    default: 
    return {
      ...state
    }
  }
}