export const addToAir = ({id, Y, X}) => ({
  type: 'KNIGHT:MOVE_TO_AIR',
  payload: {id, Y, X}
})

export const deleteFromAir = () => ({
  type: 'KNIGHT:DELETE_FROM_AIR'
})

export const moveTo = ({y, x}) => ({
  type: 'KNIGHT:MOVE_TO',
  payload: {y, x}
})

export const animeMove = ({y, x}) => ({
  type: 'KNIGHT:ANIME_MOVE',
  payload: {y, x}
})

export const lastPreparation = () => ({
  type: 'KNIGHT:LAST_PREPARATION'
})

export const takeTreasure = ({y, x}) => ({
  type: 'KNIGHT:TAKE_TREASURE',
  payload: {Y:y, X:x}
})
// export const moveToUseClick = ({}) => ({ ///DAAVVAAY
//   type: 'KNIGHT:MOVE_TO_USE_CLICK'
// })