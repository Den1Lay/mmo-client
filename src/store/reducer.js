const defState = {
  me: [
    {id: 'WKnight1', Y: 17, X: 9, pY: null, pX: null} //17, 9
  ],
  partner: [],
  inAir: null,
  canDrop: [],
  updateSign: Math.random()
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
        canDrop: checkMove(state.me, state.partner, payload),
        inAir: payload, //{id, y, x}  
      }
    case 'KNIGHT:DELETE_FROM_AIR':
      return {
        ...state,
        inAir: null
      }
    case 'KNIGHT:MOVE_TO':
      return {
        ...state, 
        me: getNewStaff(state.me, payload),
        updateSign: Math.random()
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const checkMove = (me, partner, {id, Y, X}) => { // через PathBuilder
  let realPath = []
  let direction = []
  let pathLenght = 0;
  switch(id.substr(1, 4)) {
    case 'Knig':
      direction = [
        {xDir:1, yDir:1},
        {xDir:1, yDir:-1},
        {xDir:1, yDir: 0},
        {xDir:-1, yDir:-1},
        {xDir:-1, yDir:1},
        {xDir:-1, yDir: 0},
        {xDir:0, yDir: 1},
        {xDir:0, yDir: -1}
      ]
    pathLenght = 1
  }
  const PathBuilder = (yDir, xDir) => {
    let ripFlag = true;
    let newPlace = {newY: Y, newX: X}
    while(ripFlag) {
      newPlace = {newY: newPlace.newY + yDir, newX: newPlace.newX + xDir}
      if(newPlace.newY <= 17 && newPlace.newX > -1 && newPlace.newY > -1 && newPlace.newX <= 17) {
        if(Y <= 8 && X <= 8 && Math.abs(newPlace.newY + newPlace.newX) >= 5) {
          if(partner.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
            realPath.push(newPlace)
            ripFlag = false
          }
          if(me.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
            ripFlag = false
          } else {
            realPath.push(newPlace)
          }
        } else if(Y >= 9 && X <= 8 && Math.abs(newPlace.newY - newPlace.newX) >= 12) {

        } else if(Y >= 9 && X >= 9 && Math.abs(newPlace.newY + newPlace.newX) >= 29) {

        } else if(Y <= 8 && X >= 9 && Math.abs(newPlace.newX - newPlace.newY) <= 12) {

        } else {

        }
      } else {
        ripFlag = false
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
  staff[index] = {id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X}
  return staff
}