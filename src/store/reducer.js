import store from './index'

const defaultState = {
  me: [
    {
      id: 'WKnight1', 
      Y: 17, X: 9,
      pY: 17, pX: 9,
      xp: 12,
      maxXp: 12,
      silensed: false,
      stunned: false,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        dirs: [
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
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      }, // обзор
      move: {
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        dirs: [
          {xDir:1, yDir:1, pathLenght:3},
          {xDir:1, yDir:-1, pathLenght:3},
          {xDir:1, yDir: 0, pathLenght:4},
          {xDir:-1, yDir:-1, pathLenght:3},
          {xDir:-1, yDir:1, pathLenght:3},
          {xDir:-1, yDir: 0, pathLenght:4},
          {xDir:0, yDir: 1, pathLenght:4},
          {xDir:0, yDir: -1, pathLenght:4},
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      },
      attack: {
        dammage: 1,
        type: 'magic', //range and magic
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        dirs: [
          {xDir:0, yDir:-2, pathLenght:1},
          {xDir:1, yDir:-2, pathLenght:1},
          {xDir:-1, yDir:-2, pathLenght:1},
          {xDir:0, yDir:2, pathLenght:1},
          {xDir:1, yDir:2, pathLenght:1},
          {xDir:-1, yDir:2, pathLenght:1},
          {xDir:-2, yDir:0, pathLenght:1},
          {xDir:-2, yDir:1, pathLenght:1},
          {xDir:-2, yDir:-1, pathLenght:1},
          {xDir:2, yDir:0, pathLenght:1},
          {xDir:2, yDir:1, pathLenght:1},
          {xDir:2, yDir:-1, pathLenght:1},
        ],
        missesDirs: []
      },
      spels: [
        {
          id: 'PoisonLine',
          type: '',
          area: [],
          func: () => {}
        }
      ]
    },
    {
      id: 'WKnight2', 
      Y: 1, X: 7,
      pY: 1, pX: 7,
      xp: 12,
      maxXp: 12,
      silensed: false,
      stunned: false,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        dirs: [
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
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      }, // обзор
      move: {
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        dirs: [
          {xDir:1, yDir:1, pathLenght:3},
          {xDir:1, yDir:-1, pathLenght:3},
          {xDir:1, yDir: 0, pathLenght:4},
          {xDir:-1, yDir:-1, pathLenght:3},
          {xDir:-1, yDir:1, pathLenght:3},
          {xDir:-1, yDir: 0, pathLenght:4},
          {xDir:0, yDir: 1, pathLenght:4},
          {xDir:0, yDir: -1, pathLenght:4},
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      },
      attack: {
        dammage: 3,
        type: 'melee', //range and magic
        dopDirs: ['partner', 'rocks'],
        blockDirs: ['me'],
        dirs: [
          {xDir:1, yDir:1, pathLenght:1},
          {xDir:1, yDir:-1, pathLenght:1},
          {xDir:1, yDir: 0, pathLenght:1},
          {xDir:-1, yDir:-1, pathLenght:1},
          {xDir:-1, yDir:1, pathLenght:1},
          {xDir:-1, yDir: 0, pathLenght:1},
          {xDir:0, yDir: 1, pathLenght:1},
          {xDir:0, yDir: -1, pathLenght:1},
        ],
        missesDirs: []
      },
      spels: [
        {
          id: 'PoisonLine', 
          type: '',
          area: [],
          func: () => {}
        }
      ]
    }  //17, 9
  ],
  partner: [
    {
      id: 'DKnight1',
      Y:8, X:0,
      pY: 8, pX: 0,
      xp: 12,
      maxXp: 12,
      silensed: false,
      stunned: false,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        dirs: [
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
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      }, // обзор
      move: {
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        dirs: [
          {xDir:1, yDir:1, pathLenght:3},
          {xDir:1, yDir:-1, pathLenght:3},
          {xDir:1, yDir: 0, pathLenght:4},
          {xDir:-1, yDir:-1, pathLenght:3},
          {xDir:-1, yDir:1, pathLenght:3},
          {xDir:-1, yDir: 0, pathLenght:4},
          {xDir:0, yDir: 1, pathLenght:4},
          {xDir:0, yDir: -1, pathLenght:4},
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ],
        missesDirs: [
          {xDir:-2, yDir: -1, pathLenght:1},
          {xDir:-2, yDir: 1, pathLenght:1},
          {xDir: 2, yDir: -1, pathLenght:1},
          {xDir: 2, yDir: 1, pathLenght:1},
          {xDir:-1, yDir: -2, pathLenght:1},
          {xDir:1, yDir: -2, pathLenght:1},
          {xDir:-1, yDir: 2, pathLenght:1},
          {xDir:1, yDir: 2, pathLenght:1},
        ]
      },
      attack: {
        dammage: 1,
        type: 'magic', //range and magic
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        dirs: [
          {xDir:0, yDir:-2, pathLenght:1},
          {xDir:1, yDir:-2, pathLenght:1},
          {xDir:-1, yDir:-2, pathLenght:1},
          {xDir:0, yDir:2, pathLenght:1},
          {xDir:1, yDir:2, pathLenght:1},
          {xDir:-1, yDir:2, pathLenght:1},
          {xDir:-2, yDir:0, pathLenght:1},
          {xDir:-2, yDir:1, pathLenght:1},
          {xDir:-2, yDir:-1, pathLenght:1},
          {xDir:2, yDir:0, pathLenght:1},
          {xDir:2, yDir:1, pathLenght:1},
          {xDir:2, yDir:-1, pathLenght:1},
        ],
        missesDirs: []
      },
      spels: [
        {
          id: 'PoisonLine',
          type: '',
          area: [],
          func: () => {}
        }
      ]
    }
  ],
  oldMe: null,
  oldPartner: null, // массив если будут ауе спелы
  inAir: null,
  canMove: [],
  oldCanMove: [],
  updateSign: ''+Math.random(),
  animeMove: null,
  newInLight: [],
  oldInLight: [],
  rocks: [],
  oldRocks: null,
  treasures: [],
  deletedTreasures: [],
  myTreasures: [],
  canAttack: [],
  oldCanAttack: []
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
      let inAirPerson = state.me.filter(({id}) => id === payload.id )[0]
      return {
        ...state,
        canMove: checkMove(state.me, state.partner, state.rocks, inAirPerson),
        inAir: inAirPerson, //{id, y, x}  
        updateSign: 'C'+Math.random(),
      }
    case 'KNIGHT:DELETE_FROM_AIR':
      //console.log('TRYYYYYYY DO CLEAR')
      return {
        ...state,
        inAir: null,
        canMove: [],
        oldCanMove: state.canMove.length !== 0 ? state.canMove : [],
        canAttack: [],
        oldCanAttack: state.canAttack.length !== 0 ? state.canAttack : [],
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:MOVE_TO':
      const newMe = getNewStaff(state.me, state.inAir, payload)
      //newPartner
      return {
        ...state, 
        me: newMe,
        inAir: null,
        canMove: [],
        oldCanMove: state.canMove,
        newInLight: getLightPosition(newMe, state.partner, state.rocks),
        oldInLight: state.newInLight, // точечная перерисовка, если траблы с опти
        animeMove: null,  // for what, i don't know
        updateSign: 'M'+Math.random(), 
      }
    case 'KNIGHT:ANIME_MOVE':
      return {
        ...state,
        canMove: [],
        oldCanMove: state.canMove.length !== 0 ? state.canMove : [],
        animeMove: {id:state.inAir.id, y: payload.y, x: payload.x},
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:LAST_PREPARATION':
      //console.log('LOO0000000000000000K_AT_THIS_STATE:', state)
      return {
        ...state,
        newInLight: getLightPosition(state.me, state.partner, state.rocks),  //добавить сдесь скало креатор
        rocks: rocksCreator(),
        treasures: treasuresCreator(),
        updateSign: 'P'+Math.random(), // добавить небольшой прелоад и рипать его тут
      }
    case 'KNIGHT:TAKE_TREASURE': 
      console.log("PAYLOOOOOOOOOAD", payload)
      return {
        ...state, // нижней строчки может и не быть.
        treasures: state.treasures.filter(({Y, X}) => !( Y === payload.Y && X === payload.X)),
        deletedTreasures: [payload],
        myTreasures: [...state.myTreasures].concat(state.treasures.filter(({Y, X}) => Y === payload.Y && X === payload.X)),
        updateSign: 'T'+Math.random()
      }
    case 'KNIGHT:PREPARE_TO':
      const {pass} = payload
      console.log('BIIIIIIIIIIIIIIIG PREPARE:', pass)
      return {
        ...state,
        canMove: state.canMove.length === 0 && pass === 'MOVE' ? checkMove(state.me, state.partner, state.rocks, state.inAir) : [],
        oldCanMove: state.canMove.length !== 0 && pass !== 'MOVE' ? state.canMove : [],
        canAttack: state.canAttack.length === 0 && pass === 'ATTACK' ? checkAttack(state.me, state.partner, state.rocks, state.inAir) : [],
        oldCanAttack: state.canAttack.length !== 0 && pass !== 'ATTACK' ? state.canAttack : [], // spell will here
        updateSign: 'U'+Math.random()
      }
    case 'KNIGHT:ATTACK_TO': //будет вызываться нескольколько раЗ, если необходимо, АУЕ
      const {y, x, cause} = payload //refactory this
      let partnerRes =  findAndKill(state.partner, y, x, cause, 'partner', state.inAir)
      let rocksRes =  findAndKill(state.rocks, y, x, cause, 'rocks', state.inAir)
      return {
        ...state,
        partner: partnerRes.res,
        rocks: rocksRes.res,
        oldPartner: partnerRes.target,
        oldRocks: rocksRes.target,
        canAttack: [],
        oldCanAttack: state.canAttack,
        newInLight: partnerRes.target || rocksRes.target ? getLightPosition(state.me, partnerRes.res, rocksRes.res) : state.newInLight,
        //oldInLight: partnerRes.target || rocksRes.targetgetLigh ? state.newInLight : [],
        updateSign: 'A'+Math.random()
      }
    case 'KNIGHT:KAMICK_ATTACK':
      const {me, partner, deadM, deadP} = payload
      console.log('DEEEEEEBBAG_PAYLOAD:',payload)
      let updatedMe = deadM ? state.me.filter(({id}) => id !== deadM.id) : getNewStaffAfterKamick(state.me, me)
      let updatedPartner = deadP ? state.partner.filter(({id}) => id !== deadP.id) : getNewStaffAfterKamick(state.partner, partner)

      return {
        ...state,
        me: updatedMe,
        partner:  updatedPartner,
        oldPartner: deadP ? deadP : null,
        oldMe: deadM ? deadM : null,
        newInLight: getLightPosition(updatedMe, updatedPartner, state.rocks),
        oldInLight: state.newInLight,
        updateSign: 'K'+Math.random()
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const getNewStaffAfterKamick = (defArr, {id:ID, xp, Y, X, pY, pX}) => {
  let checkIndex = null
  let workArr = defArr.slice()
  defArr.forEach(({id}, i) => {
    if(id === ID) {
      checkIndex = i
    }
  })
  workArr[checkIndex] = {...workArr[checkIndex], xp, Y, X, pY, pX}
  return workArr
}

//SPELS IT's a functions, which we import, and use destruct as arg or switch
const findAndKill = (aim, y, x, cause, label, {attack}) => {
  let aimIndex = 0;
  let res = aim.slice()
  let target = null;
  if( cause === label ) {
    aim.forEach(({Y, X}, i) => { // dependence from type of dammage
      if(Y === y && X === x) {
        aimIndex = i
      }
    })
    
    console.log(`Y: ${y}, X: ${x}, aimIndex: ${aimIndex}`, aim)
    let result = aim[aimIndex].xp - attack.dammage
    if(result <=0) {
      res.splice(aimIndex, 1)
      target = aim[aimIndex]
    } else {
      res[aimIndex] = {...res[aimIndex], Y: res[aimIndex].Y, X: res[aimIndex].X, xp: result}
    }
  }
  return {res, target}
}

const rocksCreator = () => {
  return [
    {Y: 6, X: 3, xp: 8},{Y: 8, X: 4, xp: 8},
    {Y: 9, X: 5, xp: 8},{Y: 10, X: 5, xp: 8},
    {Y: 11, X: 4, xp: 8},{Y: 8, X: 8, xp: 8},
    {Y: 7, X: 9, xp: 8},{Y: 8, X: 10, xp: 8},
    {Y: 9, X: 11, xp: 8},{Y: 10, X: 11, xp: 8},
    {Y: 7, X: 13, xp: 8},{Y: 7, X: 14, xp: 8},
    {Y: 6, X: 15, xp: 8},{Y: 10, X: 14, xp: 8},
  ]
}

const treasuresCreator = () => {
  return [
    {Y: 7, X: 4, id: 'VisualBooster'}, {Y: 8, X: 9, id: 'DammageIncreaser'}
  ]
}


const pathBuilder = (yDir, xDir, pathLenght, realPath, mainSource, dop, block, Y, X, misses) => {
  let counter = pathLenght
  let ripFlag = true;
  let newPlace = {newY: Y, newX: X}
  const rockInclude = ({y, x}) => mainSource['rocks'].some(({Y, X}) => y === Y && x === X)
  const pusher = (newPlace) => {
    let modYDir = Math.abs(yDir);
    let modXDir = Math.abs(xDir);
    let isEmptyPlace = [true]
    const passFunc = () => modYDir+modXDir <=2 ? realPath.push(newPlace) : misses.push(newPlace)
    const checkPaths = (workArr, permit) => {
      workArr.forEach((name) => {
        if(modYDir === modXDir
          && (rockInclude({y:newPlace.newY-yDir, x:newPlace.newX}) 
            && rockInclude({y:newPlace.newY, x:newPlace.newX-xDir}))) {
              ripFlag = false
              isEmptyPlace[0] = false
        } else if(mainSource[name].some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
          permit && passFunc()
          ripFlag = false
          isEmptyPlace[0] = false
        }
      })
    }
    //console.log('DEEEEEEEEEEEEEEEEEEEEBBBBBBBBBAAAG 2222:', block)
    checkPaths(dop, true)
    checkPaths(block, false)
    isEmptyPlace[0] && passFunc()
   
  }
  //console.log('SIGNALL',ripFlag && counter)
  while(ripFlag && counter) {
    //console.log('do THIS', counter)
    counter--  // Здесь обитает баг, если counter больше 4, то можем уйти на пративоположную сторону, где происходят ужасные вещи...
    newPlace = {newY: newPlace.newY + yDir, newX: newPlace.newX + xDir}
    if(newPlace.newY <= 17 && newPlace.newX > -1 && newPlace.newY > -1 && newPlace.newX <= 17) {
      //console.log('Alive')
      if(Y <= 8 && X <= 8 && Math.abs(newPlace.newY + newPlace.newX) >= 5) {
        pusher(newPlace)
      } else if(Y >= 9 && X <= 8 && Math.abs(newPlace.newY - newPlace.newX) <= 12) {
        //console.log('SRABOTAL')
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
  //console.log('Down Counter', counter)
}

const checkMove = (me, partner, rocks, {id, Y, X, move}) => { // через PathBuilder
  console.log(move)
  const {dirs, dopDirs, blockDirs, missesDirs} = move
  let realPath = []
  let misses = []
  let mainSource = {me, partner, rocks}
  // me.forEach(({id: ID, move}) => {
  //   const {dirs, dopDirs, blockDirs, missesDirs: missesDirsRest} = move
  //   if(ID === id) {
  //     direction = dirs
  //     missesDirs = missesDirsRest
  //     dop = dopDirs
  //     block = blockDirs
  //   }
  // })
  //console.log('WHERE:',realPath)
  dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, Y, X, misses))
  missesDirs.forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath, Y, X, misses))
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
  let realPath = []
  let misses = []
  let mainSource = {me, partner, rocks}  // можно сыграть от последовательности...
  me.forEach(({Y, X, visibility}, i) => {
    console.log('VISIBILITY', visibility)
    realPath.push([])
    realPath[i].push({newY:Y, newX:X})
    const {dirs, dopDirs, blockDirs, missesDirs} = visibility;
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath[i], mainSource, dopDirs, blockDirs, Y, X, misses));
    missesDirs.forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath[i], Y, X, misses))
  })
  //МАНИПУЛЯЦИИ С МАССИВАМИ: Отдельный массив на каждого перса, с последующей передачей в metFunc и проверкой значимых позиций. --> Модификация исходника. --> склеивание массивов
  return realPath.flat()
}

const getNewStaff = (staff, {id}, {y, x}) => {
  let index = null;
  staff.forEach(({id: checkId}, a) => {
    if(checkId === id) {
      index = a
    }
  })
  //console.log(`REDUCER INNNNNNNNNNNNNNSA_index: ${index}, Staff:`,staff)
  staff[index] = {...staff[index], id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X}
  //console.log({id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X})
  //console.log(staff)
  return staff
}

const checkAttack = (me, partner, rocks, {id, Y, X, attack: {dirs, dopDirs, blockDirs, missesDirs, type}}) => {
  let realPath = []
  let misses = []

  let mainSource = {me, partner, rocks}

  switch(type) {
    case 'melee': 
    //console.log('DEEEEEEEEEEEEEEEEEEEEEBAAAAAAAAAAG', block)
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, Y, X, []))
    break
    case 'range': 
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, Y, X, misses))
    missesDirs.forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath, Y, X, misses))
    break
    case 'magic':
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, Y, X, misses))
    realPath = realPath.concat(misses) // right way
  }
  return realPath
}
