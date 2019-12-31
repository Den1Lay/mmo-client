const defState = {
  me: [
    {id: 'WKnight1', Y: 17, X: 9, pY: null, pX: null} //17, 9
  ],
  partner: [],
  inAir: null,
  canMove: [],
  updateSign: ''+Math.random()
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
        canMove: checkMove(state.me, state.partner, payload),
        inAir: payload, //{id, y, x}  
        updateSign: 'C'+Math.random()
      }
    case 'KNIGHT:DELETE_FROM_AIR':
      return {
        ...state,
        //canMove: [],
      }
    case 'KNIGHT:MOVE_TO':
      return {
        ...state, 
        me: getNewStaff(state.me, payload),
        updateSign: 'M'+Math.random()
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
  const pathBuilder = (yDir, xDir, pathLenght) => {
    let counter = pathLenght
    let ripFlag = true;
    let newPlace = {newY: Y, newX: X}
    const pusher = (newPlace) => {
      if(partner.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
        realPath.push(newPlace)
        ripFlag = false
      } else if(me.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
        ripFlag = false
      } else {
        console.log('PUSH', newPlace)
        realPath.push(newPlace) 
        console.log('RESULT',realPath)
      }
    }
    console.log('SIGNALL',ripFlag && counter)
    while(ripFlag && counter) {
      console.log('do THIS', counter)
      counter-- 
      newPlace = {newY: newPlace.newY + yDir, newX: newPlace.newX + xDir}
      if(newPlace.newY <= 17 && newPlace.newX > -1 && newPlace.newY > -1 && newPlace.newX <= 17) {
        console.log('Alive')
        if(Y <= 8 && X <= 8 && Math.abs(newPlace.newY + newPlace.newX) >= 5) {
          pusher(newPlace)
        } else if(Y >= 9 && X <= 8 && Math.abs(newPlace.newY - newPlace.newX) <= 12) {
          pusher(newPlace)
        } else if(Y >= 9 && X >= 9 && Math.abs(newPlace.newY + newPlace.newX) <= 29) {
          console.log('Insa Alive')
          pusher(newPlace)  
        } else if(Y <= 8 && X >= 9 && Math.abs(newPlace.newX - newPlace.newY) <= 12) {
          pusher(newPlace)
        } else {
          ripFlag = false
        }
      } else {
        ripFlag = false
      }
    }
    console.log('Down Counter', counter)
  }
  
  console.log('WHERE:',realPath)
  direction.forEach(({yDir, xDir}) => pathBuilder(yDir, xDir, pathLenght))
  return realPath
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