const defaultState = {
  me: [
    {id: 'WKnight1', Y: 17, X: 9, pY: null, pX: null} //17, 9
  ],
  partner: [],
  inAir: null,
  canMove: [],
  updateSign: ''+Math.random(),
  animeMove: null,
  newInLight: [],
  oldInLight: []
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'MOVE': {
      return {
        ...state,
        unit: payload
      }
    }
    case 'KNIGHT:MOVE_TO_AIR':
      //console.log('try do this', payload)
      return {
        ...state,
        canMove: checkMove(state.me, state.partner, payload),
        inAir: payload, //{y, x}  
        updateSign: 'C'+Math.random(),
      }
    case 'KNIGHT:DELETE_FROM_AIR':
      //console.log('TRYYYYYYY DO CLEAR')
      return {
        ...state,
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:MOVE_TO':
      const newMe = getNewStaff(state.me, state.inAir, payload)
      //newPartner
      return {
        ...state, 
        me: newMe,
        updateSign: 'M'+Math.random(),
        newInLight: getLightPosition(newMe, state.partner),
        oldInLight: state.newInLight,
        animeMove: null // for what, i don't know
      }
    case 'KNIGHT:ANIME_MOVE':
      return {
        ...state,
        animeMove: {id:state.inAir.id, y: payload.y, x: payload.x},
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:LAST_PREPARATION':
      //console.log('LOO0000000000000000K_AT_THIS_STATE:', state)
      return {
        ...state,
        newInLight: getLightPosition(state.me, state.partner),  //добавить сдесь скало креатор
        updateSign: 'P'+Math.random() // добавить небольшой прелоад и рипать его тут
      }
    default: {
      return {
        ...state
      }
    }
  }
}



const pathBuilder = (yDir, xDir, pathLenght, realPath, me, partner, Y, X) => {
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
      //console.log('PUSH', newPlace)
      realPath.push(newPlace) 
      //console.log('RESULT',realPath)
    }
  }
  //console.log('SIGNALL',ripFlag && counter)
  while(ripFlag && counter) {
    //console.log('do THIS', counter)
    counter--  // Здесь обитает баг, если counter больше 4, то можем уйти на пративоположную сторону, где происходит ужасные вещи...
    newPlace = {newY: newPlace.newY + yDir, newX: newPlace.newX + xDir}
    if(newPlace.newY <= 17 && newPlace.newX > -1 && newPlace.newY > -1 && newPlace.newX <= 17) {
      //console.log('Alive')
      if(Y <= 8 && X <= 8 && Math.abs(newPlace.newY + newPlace.newX) >= 5) {
        pusher(newPlace)
      } else if(Y >= 9 && X <= 8 && Math.abs(newPlace.newY - newPlace.newX) <= 12) {
        console.log('SRABOTAL')
        pusher(newPlace)
      } else if(Y >= 9 && X >= 9 && Math.abs(newPlace.newY + newPlace.newX) <= 29) {
        //console.log('Insa Alive')
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

const checkMove = (me, partner, {id, Y, X}) => { // через PathBuilder
  let realPath = []
  let direction = []
  switch(id.substr(1, 4)) {
    case 'Knig':
      direction = [
        {xDir:1, yDir:1, pathLenght:3},
        {xDir:1, yDir:-1, pathLenght:3},
        {xDir:1, yDir: 0, pathLenght:4},
        {xDir:-1, yDir:-1, pathLenght:3},
        {xDir:-1, yDir:1, pathLenght:3},
        {xDir:-1, yDir: 0, pathLenght:4},
        {xDir:0, yDir: 1, pathLenght:4},
        {xDir:0, yDir: -1, pathLenght:4}
      ]
    break;
  }
  console.log('WHERE:',realPath)
  direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, me, partner, Y, X))
  return realPath
}

const getLightPosition = (me, partner) => {
  let realPath = [];
  me.forEach(({id, Y, X}) => {
    realPath.push({newY:Y, newX:X})
    switch(id.substr(1,4)) {
      case 'Knig':
        [ // Take it from server and save at localStore || Redux
        {xDir:1, yDir:1, pathLenght:2},
        {xDir:1, yDir:-1, pathLenght:2},
        {xDir:1, yDir: 0, pathLenght:3},
        {xDir:-1, yDir:-1, pathLenght:2},
        {xDir:-1, yDir:1, pathLenght:2},
        {xDir:-1, yDir: 0, pathLenght:3},
        {xDir:0, yDir: 1, pathLenght:3},
        {xDir:0, yDir: -1, pathLenght:3},
        {xDir:-2, yDir: -1, pathLenght:1},
        {xDir:-2, yDir: 1, pathLenght:1},
        {xDir: 2, yDir: -1, pathLenght:1},
        {xDir: 2, yDir: 1, pathLenght:1},
        {xDir:-1, yDir: -2, pathLenght:1},
        {xDir:1, yDir: -2, pathLenght:1},
        {xDir:-1, yDir: 2, pathLenght:1},
        {xDir:1, yDir: 2, pathLenght:1},
        ].forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, me, partner, Y, X))
        break;
    }
  })
  return realPath
}

const getNewStaff = (staff, {id}, {y, x}) => {
  let index = null;
  staff.forEach(({id: checkId}, a) => {
    if(checkId === id) {
      index = a
    }
  })
  staff[index] = {id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X}
  return staff
}