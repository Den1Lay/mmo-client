const defState = {
  me: [
    {id: 'WKnight1', Y: 17, X: 9} //17, 9
  ],
  inAir: null
}

export default (state = defState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'MOVE': {
      return {
        ...state,
        unit: payload
      }
    }
    case 'KNIGHT:MOVE_TO_AIR':
      console.log('try do this', payload)
      return {
        ...state,
        inAir: payload //{id, y, x}
      }
    case 'KNIGHT:DELETE_FROM_AIR':
      return {
        ...state,
        inAir: null
      }
    case 'KNIGHT:MOVE_TO':
      return {
        ...state, 
        me: getNewStaff(state.me, payload)
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const getNewStaff = (staff, {id, y, x}) => {
  let index = null;
  staff.forEach(({id: checkId}, a) => {
    if(checkId === id) {
      index = a
    }
  })
  staff[index] = {id, Y:y, X:x}
  return staff
}