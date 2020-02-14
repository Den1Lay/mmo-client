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
        blockDirs: ['me'],//'rocks'
        ignore: [],
        enlarge: ['rocks'],
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
        moveeffect: ({sources, Y, X}) => {
          return {
            dlsLight: []
          }
        },
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
        enlarge: [],
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