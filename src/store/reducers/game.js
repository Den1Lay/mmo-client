import store from '../index'

//develop edition
const defaultState = {
  me: [
    {
      id: 'WKnight1', 
      Y: 17, X: 9, // after PP
      pY: 17, pX: 9, // after PP
      xp: 20,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        ignore: [],
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
        ignore: [],
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
        dopDirs: [],
        blockDirs: ['me', 'rocks'],
        ignore: ['partner'],
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
      spells: [
        {
          id: 'Fireball',
          icon: 'F',
          target: 'partner',
          color: {r: 150, g: 0, b: 24},
          dopDirs: [],
          blockDirs: ['me'],
          ignore: [],
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
          ],
          //func: new Function('return '+"({payload: {y, x}, sources, target, who}) => {if(who === 'me') { let newPartner = sources['partner'].slice();let newFire = [{newY: y, newX: x, time: 2, postDmg: 0}];let newOldPartner = [];let spellMap = ['fire'];let direction = [{xDir:1, yDir:1, pathLenght:1},{xDir:1, yDir:-1, pathLenght:1},{xDir:1, yDir: 0, pathLenght:1},{xDir:-1, yDir:-1, pathLenght:1},{xDir:-1, yDir:1, pathLenght:1},{xDir:-1, yDir: 0, pathLenght:1},{xDir:0, yDir: 1, pathLenght:1},{xDir:0, yDir: -1, pathLenght:1}];direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newFire, sources, ['partner'], ['me', 'rocks'], [], y, x, []));console.log('LAST_COMPAR:',newPartner, newFire);newFire.forEach(({newY, newX}, fi) => {newPartner.forEach(({Y, X}, i) => {if(newY === Y && newX === X) {let newXp = newPartner[i].xp - 6;if(newXp > 0) {console.log('TAAAAAAAAAAAAAAAAKE ITTTTT: ',)newPartner[i].xp = newXpspellMap.push('partner')} else {newOldPartner.push(newPartner[i]);newPartner.splice(i, 1);spellMap.push('oldPartner')}}})newFire[fi].time = 2;newFire[fi].postDmg = 0;});console.log('PREV_RES_PARTNER:',newPartner);return {me: sources.me,partner: newPartner,rocks: sources.rocks,oldMe: [],oldPartner: newOldPartner,oldRocks: null,fire: newFire,venom: [],spellMap}} else {}}")()
          func: ({payload: {y, x}, sources, target, who, pathBuilder}) => {
            if(who === 'me') {
              let newPartner = sources['partner'].slice()
              let newFire = [{newY: y, newX: x, time: 2, postDmg: 0}];
              let newOldPartner = [];
              let spellMap = ['fire'];
              let direction = [
                {xDir:1, yDir:1, pathLenght:1},
                {xDir:1, yDir:-1, pathLenght:1},
                {xDir:1, yDir: 0, pathLenght:1},
                {xDir:-1, yDir:-1, pathLenght:1},
                {xDir:-1, yDir:1, pathLenght:1},
                {xDir:-1, yDir: 0, pathLenght:1},
                {xDir:0, yDir: 1, pathLenght:1},
                {xDir:0, yDir: -1, pathLenght:1}
              ];
              direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newFire, sources, ['partner'], ['me', 'rocks'], [], y, x, []))
              console.log('LAST_COMPAR:',newPartner, newFire)
              newFire.forEach(({newY, newX}, fi) => {
                newPartner.forEach(({Y, X}, i) => {
                  if(newY === Y && newX === X) {
                    let newXp = newPartner[i].xp - 6;
                    if(newXp > 0) {
                      console.log('TAAAAAAAAAAAAAAAAKE ITTTTT: ',)
                      newPartner[i].xp = newXp
                      spellMap.push('partner')
                    } else {
                      newOldPartner.push(newPartner[i]);
                      newPartner.splice(i, 1);
                      spellMap.push('oldPartner')
                    }
                  }
                })
                newFire[fi].time = 2;
                newFire[fi].postDmg = 0;
              })
              console.log('PREV_RES_PARTNER:',newPartner)
              return {
                me: sources.me,
                partner: newPartner,
                rocks: sources.rocks,
                oldMe: [],
                oldPartner: newOldPartner,
                oldRocks: null,
                fire: newFire,
                venom: [],
                spellMap
              } 
            } else {

            }
          }   // Новые lightPos.. 
        }     // Спелы противника это просто спел в другую сторону
      ],
    },
    {
      id: 'WKnight2', 
      Y: 1, X: 7,
      pY: 1, pX: 7,
      xp: 12,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        ignore: [],
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
        ignore: [],
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
        ignore: [],
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
      spells: [
        {
          id: 'Teleport',
          icon: 'T',
          target: 'partner',
          color: {r: 25, g: 25, b: 112},
          dopDirs: [],
          blockDirs: ['me'],
          ignore: [],
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
          ],
          func: ({payload: {y, x}, sources, target, who, pathBuilder}) => {
            if(who === 'me') {
              let aimIndex = null
              let workArr = sources[target].slice()
              let rockArr = sources.rocks.slice()
              let meArr = sources.me.slice()
              let newOldPartner = []
              let newOldMe = []
              let newOldRocks = []
              let spellMap = ['partner']
              workArr.forEach(({Y, X}, i) => {
                if(Y === y && X === x) {
                  aimIndex = i
                }
              })
              const {Y, X} = workArr[aimIndex]
              let newY = Y+5
              let rockStunIndex = null
              let meStunIndex = null
              sources.rocks.forEach(({Y:rY, X:rX},i) => {
                if(rY === newY && rX === X) {
                  rockStunIndex = i
                }
              })
              sources.me.forEach(({Y:mY, X:mX}, mi) => {
                if(mY === newY && mX === X) {
                  meStunIndex = mi
                }
              })
              if(rockStunIndex === null && meStunIndex === null) {
                if(newY - X > 12 && X <= 4) {
                  newY = 12 + X
                  //workArr[aimIndex] = {...workArr[aimIndex], Y: newY, pY: workArr[aimIndex].Y}
                } else if (newY - (17 - X) > 12 && X >= 13) {
                  newY = 12 + (17 - X)
                  //workArr[aimIndex] = {...workArr[aimIndex], Y: newY, pY: workArr[aimIndex].Y}
                } else if (newY > 17 && X <= 12 && X >= 5) {
                  newY = 17
                  //workArr[aimIndex] = {...workArr[aimIndex], Y: newY, pY: workArr[aimIndex].Y}
                } else {
                  console.log('NOTH1NG')
                }
                workArr[aimIndex] = {...workArr[aimIndex], Y: newY, pY: workArr[aimIndex].Y, pX: workArr[aimIndex].X}
              } else if(meStunIndex === null) {
                newY = rockArr[rockStunIndex].Y
                newOldRocks.push(rockArr[rockStunIndex])
                //console.log('ROCK_STUN_INDEX:', rockStunIndex)
                //console.log('NEW_OLD_ROCKS:', newOldRocks)
                rockArr.splice(rockStunIndex, 1)
                spellMap.push('oldRocks')
                spellMap.push('rocks')
                let resXp = workArr[aimIndex].xp - 5
                if(resXp > 0) {
                  workArr[aimIndex] = {...workArr[aimIndex], Y: newY, pY: workArr[aimIndex].Y, pX: workArr[aimIndex].X, xp: resXp, stunned: 3}
                } else { // RIP
                  newOldPartner.push(workArr[aimIndex])  
                  workArr.splice(aimIndex, 1)
                  spellMap.push('oldPartner')
                }
              } else { // Stunk at me
                let resPartnerXp = workArr[aimIndex].xp - 3
                let resMyXp = meArr[meStunIndex].xp - 2
                if(resPartnerXp > 0) { // survive
                  workArr[aimIndex] = {...workArr[aimIndex], Y:sources.me[meStunIndex].Y, pY: workArr[aimIndex].Y, pX: workArr[aimIndex].X, xp: resPartnerXp, stunned: 2}
                } else { //RIP OF ME
                  newOldPartner.push(workArr[aimIndex])
                  workArr.splice(aimIndex, 1)
                  spellMap.push('oldPartner')
                }
                spellMap.push('me')
                if(resMyXp > 0) { //RIP ME
                  meArr[meStunIndex] = {...meArr[meStunIndex], xp: resMyXp, stunned: 1}
                } else {
                  newOldMe.push(meArr[meStunIndex])
                  meArr.splice(meStunIndex, 1)
                  spellMap.push('oldMe')
                }
                
              }
              console.log("RES_CONTENT:", workArr)
              return {
                me: meArr,
                partner: workArr,
                rocks: rockArr,
                oldMe: newOldMe,
                oldPartner: newOldPartner,
                oldRocks: newOldRocks,
                fire: [],
                venom: [],
                spellMap
              } 
            } else {

            }
          }   // Новые lightPos.. 
        }     // Спелы противника это просто спел в другую сторону
      ]
    }  //17, 9
  ],
  partner: [
    {
      id: 'DKnight1',
      Y:2, X:9,
      pY: 2, pX: 9,
      xp: 14,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        ignore: [],
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
        ignore: [],
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
        dopDirs: [],
        blockDirs: ['me', 'rocks'],
        ignore: ['partner'],
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
  oldMe: [],
  oldPartner: [], // массив если будут ауе спелы
  inAir: null,
  canMove: [],
  canSpell: [],
  spellInd: null,
  oldCanMove: [],
  oldCanSpell: [],
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
  oldCanAttack: [],
  timeDepend: [],
  spellMap: [],
  fire: [],
  venom: [],
  moveFromShadow: null,
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_FUNC_FROM_SERVER': {
      return {
        ...state,
        me: addNewFunc(payload, state.me)
      }
    }
    case 'TRANSFORM_FUNC': {
      return {
        ...state,
        transformStaff: state.me[0].spells[0].func.toString()
      }
    }
    case 'SET_HEROES': {
      //payload -> [{}, {}, {}, ...]
      return {
        ...state,
        heroes: payload // cash if noCash refresh
      }
    }
    case 'SET_USER_DATA': {
      //payload === user -> avatar, cards, progress, username ...
      return {
        ...state,
        user: payload
      }
    }
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
        canSpell: [],
        spellInd: null,
        oldCanSpell: state.canSpell.length !== 0 ? state.canSpell : [],
        updateSign: 'D'+Math.random()
      }
    case 'PARTNER:ANIME_MOVE':
      //check from what 
      return preparePartnerAnimeMove(payload, state.newInLight, state)
      break
    case 'PARTNER:MOVE_TO':
      console.log('INTRESTING_PAYLOAD:', payload)
      return partnerMoveTo(payload, state)
      break
    case 'KNIGHT:MOVE_TO':
      console.log('PRE_GET_NEW_STAFF:', state.inAir)
      const newMe = getNewStaff(state.me, state.inAir, payload)
      //newPartner
      return updateNextStep({
        ...state, 
        me: newMe,
        inAir: null,
        canMove: [],
        oldCanMove: state.canMove,
        newInLight: getLightPosition(newMe, state.partner, state.rocks),
        oldInLight: state.newInLight, // точечная перерисовка, если траблы с опти
        animeMove: null,  // for what, i don't know
        updateSign: 'M'+Math.random(),
      })
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
      console.log("PAYLOOOOOOOOOAD", payload) ///НАХУЙ афтерКлик? //updateMap => func in Board
      return {
        ...state, // нижней строчки может и не быть.
        treasures: state.treasures.filter(({Y, X}) => !( Y === payload.Y && X === payload.X)),
        deletedTreasures: [payload],
        myTreasures: [...state.myTreasures].concat(state.treasures.filter(({Y, X}) => Y === payload.Y && X === payload.X)),
        updateSign: 'T'+Math.random()
      }
    case 'KNIGHT:PREPARE_TO':
      let {pass, dls} = payload
      console.log(`BIIIIIIIIIIIIIIIG PREPARE DLS: ${dls} PASS:`, pass)
      console.log(state.canSpell.length === 0 && pass === 'SPELL')
      return {
        ...state,
        canMove: state.canMove.length === 0 && pass === 'MOVE' ? checkMove(state.me, state.partner, state.rocks, state.inAir) : [],
        oldCanMove: state.canMove.length !== 0 && pass !== 'MOVE' ? state.canMove : [],
        canAttack: state.canAttack.length === 0 && pass === 'ATTACK' ? checkAttack(state.me, state.partner, state.rocks, state.inAir) : [],
        oldCanAttack: state.canAttack.length !== 0 && pass !== 'ATTACK' ? state.canAttack : [],
        canSpell: pass === 'SPELL' ? checkSpell(state.me, state.partner, state.rocks, state.inAir, dls) : [],
        oldCanSpell: state.canSpell.length !== 0 ? state.canSpell : [], // spell will here
        spellInd: dls, 
        updateSign: 'U'+Math.random()
      }
    case 'KNIGHT:ATTACK_TO': //будет вызываться нескольколько раЗ, если необходимо, АУЕ
      let {y, x, cause} = payload //refactory this
      let partnerRes =  findAndKill(state.partner, y, x, cause, 'partner', state.inAir)
      let rocksRes =  findAndKill(state.rocks, y, x, cause, 'rocks', state.inAir)
      return updateNextStep({  
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
      })
    case 'KNIGHT:KAMICK_ATTACK':
      const {me, partner, deadM, deadP} = payload
      console.log('DEEEEEEBBAG_PAYLOAD:',payload)
      let updatedMe = deadM ? state.me.filter(({id}) => id !== deadM.id) : getNewStaffAfterKamick(state.me, me)
      let updatedPartner = deadP ? state.partner.filter(({id}) => id !== deadP.id) : getNewStaffAfterKamick(state.partner, partner)

      return {
        ...state,
        me: updatedMe,
        partner: updatedPartner,
        oldPartner: deadP ? [deadP] : [],
        oldMe: deadM ? [deadM] : [],
        newInLight: getLightPosition(updatedMe, updatedPartner, state.rocks),
        oldInLight: state.newInLight,
        updateSign: 'K'+Math.random()
      }
    case 'KNIGHT:SPELL_TO': 
      //const {me, partner, rocks} = state
      const spellObj = state.inAir.spells[state.spellInd]
      const spellRes = spellObj.func(
        {
          payload, 
          sources: {me: state.me, partner: state.partner, rocks: state.rocks}, 
          target: spellObj.target, 
          who: 'me',
          pathBuilder
        }) //target enemy, me, rock
        console.log('%c%s','color: red, font-size: 24px','SPEEL_TO')
      return updateNextStep({
        ...state,
        partner: spellRes.partner,
        me: spellRes.me,
        rocks: spellRes.rocks,
        oldMe: spellRes.oldMe,
        oldPartner: spellRes.oldPartner,
        oldRocks: spellRes.oldRocks,
        canSpell: [],
        oldCanSpell: state.canSpell,
        fire: state.fire.concat(spellRes.fire),
        venom: state.venom.concat(spellRes.venom),
        spellMap: spellRes.spellMap,
        updateSign: 'S'+Math.random()
      }, state )
    default: {
      return {
        ...state
      }
    }
  }
}
const addNewFunc = (newFunc, me) => {
  let workArr = me;
  workArr[0].spells[0].func = newFunc
  return workArr
}

const updateNextStep = (data, state) => {
    const afterClickPartner = updateGameStats(data.partner ? data.partner : state.partner, data.venom ? data.venom : state.venom);
    const afterClickMe = updateGameStats(data.me ? data.me : state.me, data.venom ? data.venom : state.venom);
    const newFire = updateSpells(data.fire ? data.fire : state.fire);
    const newVenom = updateSpells(data.venom ? data.venom : state.venom);
  return {
    ...data,
    partner: afterClickPartner.res,
    me: afterClickMe.res,
    oldPartner:data.oldPartner ? data.oldPartner.concat(afterClickPartner.dead) : afterClickPartner.dead,
    oldMe:data.oldMe ? data.oldMe.concat(afterClickMe.dead) : afterClickMe.dead,
    oldFire: newFire.dead,
    fire: newFire.res,
    oldVenom: newVenom.dead,
    venom: newVenom.res,
  }
}
// вызывается если есть совпадения 
const preparePartnerAnimeMove = ({id, y, x, fY, fX}, newInLight, state) => {
  let res = {}
  if(!newInLight.some(({newY, newX}) => newY === fY && newX === fX)) { // выход из тени
    res = {
      ...state,
      moveFromShadow: {y, x, fY, fX}, //пропсы с нижних уровней
      updateSign: 'Q'
    }
  } else if (!newInLight.some(({newY, newX}) => newY === y && newX === x)) { // уход в тень
    res = {
      ...state,
      animeMove: {id, y, x, shadow: true},
      //updateSign: 'Q'
    }
  } else {
    res = {
      ...state,
      animeMove: {id, y, x, shadow: false},
      //updateSign: 'Q'
    }
  }
  return res
}

const partnerMoveTo = ({id, y, x}, state) => {
  console.log('NEW_PARNTNER:', {id, y, x})
  const newPartner = getNewStaff(state.partner, {id}, {y, x})
  return {
    ...state,
    partner: newPartner, 
    newInLight: getLightPosition(state.me, newPartner, state.rocks),
    oldInLight: state.newInLight,
    animeMove: null,
    moveFromShadow: null,
    updateSign: 'W'
  }
}

const updateGameStats = (workArr, venomArr) => {
  let res = workArr.slice()
  let dead = []
  //console.log('UPDATE_GAME_STATE:',workArr)
  
    res.forEach(({Y, X, stunned}, i) => {
      //console.log('STUNNED:',stunned)
      if(stunned) {
        res[i].stunned = stunned-=1
      }
      
      venomArr.forEach(({newY, newX, postDmg}) => {
      if(newY === Y && newX === X) {
        let newXp = res[i].xp - postDmg
        if(newXp < 0) {
          dead.push(res[i])
          res.splice(i, 1)
        } else {
          res[i].xp = newXp
        }
      }
    })
  })
  return {res, dead}
}

const updateSpells = workArr => {
 // console.log('UPDATE_SPELLS:',workArr)
  let res = workArr.map(({time, newX, newY, postDmg}) => ({newX, newY, postDmg, time: time-=1}))
  let dead = res.filter(({time}) => time <= 0)
  res = res.filter(({time}) => time >= 1)
  return {res, dead}
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
  let target = [];
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
      target.push(aim[aimIndex])
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


const pathBuilder = (yDir, xDir, pathLenght, realPath, mainSource, dop, block, ignore, Y, X, misses) => {
  let counter = pathLenght
  let ripFlag = true;
  let newPlace = {newY: Y, newX: X}
  const rockInclude = ({y, x}) => mainSource['rocks'].some(({Y, X}) => y === Y && x === X)
  const pusher = (newPlace) => {
    let modYDir = Math.abs(yDir);
    let modXDir = Math.abs(xDir);
    let isEmptyPlace = [true]
    const passFunc = () => modYDir+modXDir <=2 ? realPath.push(newPlace) : misses.push(newPlace)
    const checkPaths = (workArr, permit, igno) => {
      workArr.forEach((name) => {
        if(modYDir === modXDir
          && (rockInclude({y:newPlace.newY-yDir, x:newPlace.newX}) 
            && rockInclude({y:newPlace.newY, x:newPlace.newX-xDir}))) {
              ripFlag = false
              isEmptyPlace[0] = false
        } else if(mainSource[name].some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
          if(!igno) {
            ripFlag = false
            //isEmptyPlace[0] = false
          }
          permit && passFunc() // add dop dist for attack 
          isEmptyPlace[0] = false
        }
      })
    }
    //console.log('DEEEEEEEEEEEEEEEEEEEEBBBBBBBBBAAAG 2222:', block)
    checkPaths(dop, true, false)
    checkPaths(block, false, false)
    checkPaths(ignore, true, true)
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
  const {dirs, dopDirs, blockDirs, missesDirs, ignore} = move
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
  dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, ignore, Y, X, misses))
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
    const {dirs, dopDirs, blockDirs, missesDirs, ignore} = visibility;
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath[i], mainSource, dopDirs, blockDirs, ignore, Y, X, misses));
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

const checkAttack = (me, partner, rocks, {id, Y, X, attack: {dirs, dopDirs, blockDirs, missesDirs, ignore, type}}) => {
  let realPath = []
  let misses = []
  console.log('PREPARE_TO_ATTACK:', ignore)
  let mainSource = {me, partner, rocks}

  switch(type) {
    case 'melee': 
    //console.log('DEEEEEEEEEEEEEEEEEEEEEBAAAAAAAAAAG', block)
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, ignore, Y, X, []))
    break
    case 'range': 
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, ignore, Y, X, misses))
    missesDirs.forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath, Y, X, misses))
    break
    case 'magic':
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, ignore, Y, X, misses))
    realPath = realPath.concat(misses) // right way
  }
  return realPath
}

const checkSpell = (me, partner, rocks, {Y, X, spells}, spellInd) => {
  let realPath = []
  let misses = []
  let mainSource = {me, partner, rocks}
  if(!(spellInd === null)) { 
    const {dirs, dopDirs, blockDirs, missesDirs, ignore} = spells[spellInd]
    dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, mainSource, dopDirs, blockDirs, ignore, Y, X, misses))
    missesDirs.forEach(({yDir, xDir}) => fillTheGaps(yDir, xDir, realPath, Y, X, misses))
  }
  return realPath
}