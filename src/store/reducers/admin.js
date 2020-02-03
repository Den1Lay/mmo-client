const defState = {
  show: null,
  nowIsReg: false,
}

export default (state = defState, action) => {
  const {type, payload} = action
  switch(type) {
    case 'MAKE_SLIDE':
      console.log('TODO')
      return {
        ...state,
        show: payload 
      }
    case 'OVER_MAKE_SLIDE':
      return {
        ...state,
        show: null
      }
    case 'REGISTER_CONTROL':
      return {
        ...state,
        nowIsReg: !state.nowIsReg
      }
    default: 
    return {
      ...state
    }
  }
}