export const addToAir = ({id, Y, X}) => ({
  type: 'KNIGHT:MOVE_TO_AIR',
  payload: {id, Y, X}
})

export const deleteFromAir = () => ({
  type: 'KNIGHT:DELETE_FROM_AIR'
})

export const moveTo = () => ({
  type: 'KNIGHT:MOVE_TO'
})

export const animeMoveHandler = ({y, x, isDrag}) => ({
  type: 'KNIGHT:ANIME_MOVE',
  payload: {y, x, isDrag}
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

export const startAttack = ({y, x, aim}) => ({
  type: 'KNIGHT:START_ATTACK',
  payload: {y, x, aim}
})

export const partStartAttack = ({id, y, x, aim, withAnime}) => ({
  type: 'PARTNER:START_ATTACK',
  payload: {id, y, x, aim, withAnime}
})

export const attackTo = (partner) => ({
  type: 'KNIGHT:ATTACK_TO',
  payload: partner
})

export const kamickAttack = ({me, partner, deadM, deadP}) => ({
  type: 'KNIGHT:KAMICK_ATTACK',
  payload: {me, partner, deadM, deadP}
})

export const startSpell = ({y, x}) => ({
  type: 'KNIGHT:START_SPELL',
  payload: {y, x}
})

export const spellTo = () => ({
  type: 'KNIGHT:SPELL_TO',
})

export const endSpell = () => ({
  type: 'KNIGHT:END_SPELL'
})

export const partnerAnimeMove = ({id, y, x, fY, fX}) => ({
  type: 'PARTNER:ANIME_MOVE',
  payload: {id, y, x, fY, fX}
})

export const partnerMoveTo = ({id, y, x}) => ({
  type: 'PARTNER:MOVE_TO',
  payload: {id, y, x}
})

export const partnerStartSpell = ({id, x, y, spellInd, withAnime, show}) => ({
  //show == combo  from partnerSpell + inLight.some ===> result show
  type: 'PARTNER:START_SPELL',
  payload: {id, x, y, spellInd, withAnime, show}
})

export const cleanAfterPartSpell = () => ({
  type: 'PARTNER:CLEAN_AFTER_SPELL'
})

export const transformFunc = () => ({
  type: 'TRANSFORM_FUNC'
})

export const deleteDeadBoys = () => ({
  type: 'DELETE_DEAD_BOYS'
})

export const updateOldXp = ({isPartner, knightInd}) => ({
  type: 'KNIGHT:UPDATE_OLD_XP',
  payload: {isPartner, knightInd}
})
// export const moveToUseClick = ({}) => ({ ///DAAVVAAY
//   type: 'KNIGHT:MOVE_TO_USE_CLICK'
// })