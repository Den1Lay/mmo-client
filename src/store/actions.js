export const addToAir = ({id, Y, X}) => ({
  type: 'KNIGHT:MOVE_TO_AIR',
  payload: {id, Y, X}
})

export const deleteFromAir = () => ({
  type: 'KNIGHT:DELETE_FROM_AIR'
})

export const moveTo = ({id, y, x}) => ({
  type: 'KNIGHT:MOVE_TO',
  payload: {id, y, x}
})