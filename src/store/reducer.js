const defaultState = {
  me: [
    {id: 'WKnight1', Y: 17, X: 9, pY: 17, pX: 9},
    {id: 'WKnight2', Y: 1, X: 7, pY: 1, pX: 7}  //17, 9
  ],
  partner: [],
  inAir: null,
  canMove: [],
  updateSign: ''+Math.random(),
  animeMove: null,
  newInLight: [],
  oldInLight: [],
  rocks: [],
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
        canMove: checkMove(state.me, state.partner, state.rocks, payload),
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
        newInLight: getLightPosition(newMe, state.partner, state.rocks),
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
        newInLight: getLightPosition(state.me, state.partner, state.rocks),  //добавить сдесь скало креатор
        rocks: rocksCreator(),
        updateSign: 'P'+Math.random() // добавить небольшой прелоад и рипать его тут
      }
    default: {
      return {
        ...state
      }
    }
  }
}


const rocksCreator = () => {
  return [
    {Y: 6, X: 3},
    {Y: 8, X: 4},
    {Y: 9, X: 5},
    {Y: 10, X: 5},
    {Y: 11, X: 4},
    {Y: 8, X: 8},
    {Y: 7, X: 9},
    {Y: 8, X: 10},
    {Y: 9, X: 11},
    {Y: 10, X: 11},
    {Y: 7, X: 13},
    {Y: 7, X: 14},
    {Y: 6, X: 15},
    {Y: 10, X: 14},
  ]
}

const pathBuilder = (yDir, xDir, pathLenght, realPath, me, partner, rocks, Y, X, misses) => {
  let counter = pathLenght
  let ripFlag = true;
  let newPlace = {newY: Y, newX: X}
  const rockInclude = ({y, x}) => rocks.some(({Y, X}) => y === Y && x === X)
  const pusher = (newPlace) => {
    let modYDir = Math.abs(yDir);
    let modXDir = Math.abs(xDir)
    if(modYDir === modXDir
    && (rockInclude({y:newPlace.newY-yDir, x:newPlace.newX}) 
      && rockInclude({y:newPlace.newY, x:newPlace.newX-xDir}))) {
      ripFlag = false
    } else if(partner.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
      modYDir+modXDir <=2 ? realPath.push(newPlace) : misses.push(newPlace)
      ripFlag = false
    } else if(me.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
      ripFlag = false
    } else if(rocks.some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
      //console.log('PUSH', newPlace)
      ripFlag = false
      //console.log('RESULT',realPath)
    } else {
      modYDir+modXDir <=2 ? realPath.push(newPlace) : misses.push(newPlace)
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

const checkMove = (me, partner, rocks, {id, Y, X}) => { // через PathBuilder
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
  direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, me, partner, rocks, Y, X, []))
  return realPath
}

const fillTheGaps = (yDir, xDir, realPath, Y, X, misses) => {
  
  let res = {newY: Y+yDir, newX: X+xDir}
  let incY = realPath.some(({newY, newX}) => newY === Y+yDir && newX === X);
  let incX = realPath.some(({newY, newX}) => newY === Y && newX === X+xDir);
  let midY = realPath.some(({newY, newX}) => newY === Y+yDir*0.5 && newX === X+xDir)
  let midX = realPath.some(({newY, newX}) => newY === Y+yDir && newX === X+xDir*0.5)
  
  if(misses.some(({newY, newX}) => newY === res.newY && newX === res.newX)) {
    if( Math.abs(xDir) === 1 && ((incY && midY) || (incX && midY))) 
    { realPath.push(res)} 
    else if ((incX && midX) || (incY && midX)) 
    { realPath.push(res)}
  }
}

const getLightPosition = (me, partner, rocks) => {
  let realPath = [];
  let misses = []
  //МАНИПУЛЯЦИИ С МАССИВАМИ: Отдельный массив на каждого перса, с последующей передачей в metFunc и проверкой значимых позиций. --> Модификация исходника. --> склеивание массивов
  me.forEach(({id, Y, X}, i) => {
    realPath.push([])
    realPath[i].push({newY:Y, newX:X})
    switch(id.substr(1,4)) {
      case 'Knig':
        [ // Take it from server and save at localStore || Redux
        {xDir:1, yDir:1, pathLenght:2}, // можно сыграть от последовательности...
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
        ].forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath[i], me, partner, rocks, Y, X, misses));
        [
        {xDir:-2, yDir:-1, pathLenght:1},
        {xDir:-2, yDir:1, pathLenght:1},
        {xDir: 2, yDir:-1, pathLenght:1},
        {xDir: 2, yDir:1, pathLenght:1},
        {xDir:-1, yDir:-2, pathLenght:1},
        {xDir:1, yDir:-2, pathLenght:1},
        {xDir:-1, yDir:2, pathLenght:1},
        {xDir:1, yDir: 2, pathLenght:1}
        ].forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath[i], Y, X, misses))
        break;
    }
  })
  return realPath.flat()
}

const getNewStaff = (staff, {id}, {y, x}) => {
  let index = null;
  staff.forEach(({id: checkId}, a) => {
    if(checkId === id) {
      index = a
    }
  })
  console.log(`REDUCER INNNNNNNNNNNNNNSA_index: ${index}, Staff:`,staff)
  staff[index] = {id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X}
  console.log({id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X})
  console.log(staff)
  return staff
}
