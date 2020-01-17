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

export const prepareTo = (pass, dls) => ({
  type: 'KNIGHT:PREPARE_TO',
  payload: {pass, dls}
})

export const attackTo = ({y, x, cause}) => ({
  type: 'KNIGHT:ATTACK_TO',
  payload: {y, x, cause}
})

export const kamickAttack = ({me, partner, deadM, deadP}) => ({
  type: 'KNIGHT:KAMICK_ATTACK',
  payload: {me, partner, deadM, deadP}
})

export const spellTo = ({y, x}) => ({
  type: 'KNIGHT:SPELL_TO',
  payload: {y, x}
})

export const partnerAnimeMove = ({id, y, x, fY, fX}) => ({
  type: 'PARTNER:ANIME_MOVE',
  payload: {id, y, x, fY, fX}
})

export const partnerMoveTo = ({id, y, x}) => ({
  type: 'PARTNER:MOVE_TO',
  payload: {id, y, x}
})
// export const moveToUseClick = ({}) => ({ ///DAAVVAAY
//   type: 'KNIGHT:MOVE_TO_USE_CLICK'
// })