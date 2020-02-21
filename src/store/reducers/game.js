import store from '../index'
import { getDlsData } from '@/utils'
// ПЕРВАЯ ЗАПОВЕДЬ СПЕЛЛОВ: НЕЛЬЗЯ РЕДАЧИТЬ ГЕРОЯ, КОТОРЫЙ ДРОПНУЛ СПЕЛ ИЛИ КЛЕТКУ НА КОТОРОЙ СТОИТ ГЕРОЙ, ЕСЛИ У СПЕЛА ЕСТЬ АФТЕР ЭФФЕКТЫ. (можно)
// СОБЫТИЕ: START_СОБЫТИЯ (createCash, wp) --> СОБЫТИЕ_TO
// develop edition 
let absThis = this
const defaultState = {
  me: [
    {
      id: 'WKnight1', 
      Y: 17, X: 9, // after PP
      pY: 17, pX: 9, // after PP
      xp: 20,
      maxXp: 12,
      silensed: false,
      buffs: [],
      stunned: 0,
      v: Math.random(),
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],//'rocks'
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
        effect: ({sources, Y, X, pathBuilder}) => {
          let workRocksArr = sources.rocks.slice()
          let dlsLight = [];
          let liveFlag = true;
          let workRocks = [];
          let connectDirs = [{xDir: 1, yDir: 0}, {xDir: -1, yDir: 0}, {xDir: 0, yDir: 1}, {xDir: 0, yDir: -1}];
          const findRocksFrom = (Y, X) => {
            workRocksArr.slice().forEach(({Y: rY, X: rX}, i) => {
              connectDirs.forEach(({xDir, yDir}) => {
                let newY = Y+yDir;
                let newX = X+xDir
                //console.log(`NEW_Y: ${newY}, NEW_X: ${newX}, rY: ${rY}, rX: ${rX} STONES:`, workRocksArr)
                if(rY === newY && rX === newX) {
                  if(!workRocks.some(({Y, X}) => Y === rY && X === rX)) {
                    workRocks.push({Y:rY, X:rX})
                    liveFlag = true
                  }
                  //workRocksArr.splice(i, 1)
                }
              })
            })
          }
          findRocksFrom(Y, X)
          while(liveFlag) {
            console.log('LOGIN_DODO')
            liveFlag = false
            console.log('WORK_ROCKS:', workRocks)
            workRocks.forEach(({Y, X}) => findRocksFrom(Y, X))
          }
          const rocksVisibility = {
            dopDirs: ['partner'],
            blockDirs: ['me', 'rocks'],
            ignore: [],
            enlarge: [],
            dirs: [
              {xDir:1, yDir:1, pathLenght:1},
              {xDir:1, yDir:-1, pathLenght:1},
              {xDir:1, yDir: 0, pathLenght:2},
              {xDir:-1, yDir:-1, pathLenght:1},
              {xDir:-1, yDir:1, pathLenght:1},
              {xDir:-1, yDir: 0, pathLenght:2},
              {xDir:0, yDir: 1, pathLenght:2},
              {xDir:0, yDir: -1, pathLenght:2},
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
          }
          let realPath = [];
          let misses = [];
          const { dirs, dopDirs, blockDirs, ignore, missesDirs } = rocksVisibility;
          workRocks.forEach(({Y, X}) => {
            dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, sources, dopDirs, blockDirs, ignore, Y, X, misses))
          })
          dlsLight = realPath.concat(misses)
          return {
            dlsLight,
            dlsVenome: []
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
          func: ({inAir, payload: {y, x}, sources, target, who, pathBuilder}) => {
            let hero = inAir;
            let newPartner = sources['partner'].slice()
            let newMe = sources['me'].slice()
            let newFire = [{newY: y, newX: x, time: 2, postDmg: 0}];
            let newOldPartner = [];
            let newOldMe = []
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
            let gE = who === 'me'
            direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newFire, sources, [gE ? 'partner' : 'me'], [gE ? 'me' : 'partner', 'rocks'], [], y, x, []))
            let workArr = gE ? newPartner : newMe;
            let workArrPass = gE ? 'partner' : 'me'
            let workSpellMapPass = gE ? 'oldPartner' : 'oldMe';
            newFire.forEach(({newY, newX}, fi) => {
              workArr.forEach(({Y, X}, i) => {
                if(newY === Y && newX === X) {
                  let newXp = workArr[i].xp - 6;
                  if(newXp > 0) {
                    console.log('TAAAAAAAAAAAAAAAAKE ITTTTT: ',)
                    workArr[i].xp = newXp
                    if(!spellMap.some(name => name === workArrPass)) {
                      spellMap.push(workArrPass)
                    }
                  } else {
                    workArr.splice(i, 1);
                    newOldPartner.push(workArr[i]);
                    if(spellMap.some(name => name === workSpellMapPass)) {
                      spellMap.push(workSpellMapPass)
                    }
                  }
                }
              })
              newFire[fi].time = 2;
              newFire[fi].postDmg = 0;
              newFire[fi].color = gE ? {r: 150, g: 0, b: 24} : {r: 255, g: 0, b: 55};
              newFire[fi].src = gE ? 'meFireBollSrc' : 'partFireBollSrc';
            })
            console.log('PREV_RES_PARTNER:',newPartner)
            let firebol_res = {
              me: newMe,
              partner: newPartner,
              rocks: sources.rocks,
              oldMe: newOldMe,
              oldPartner: newOldPartner,
              oldRocks: null,
              fire: newFire,
              myVenom: [],
              partVenom: [],
              lightRed: false,
              inLightBySpell: [],
              args: {
                tX: (x-inAir.X)*52,
                tY: (y-inAir.Y)*52,
              },
              spellMap
            }
            console.log('%c%s', 'color: red; font-size: 50', 'FIREBOLL_RES:', firebol_res)
            return firebol_res
        },  // Новые lightPos.. // Спелы противника это просто спел в другую сторону
          // Анимации делают, все тоже, что и reducer, maxSinx
          animeFunc: ({particles, knight, args: {tY, tX}, anime, spellTo, endSpell}) => {
            console.log('PARTICLES:', particles)
            particles[0].current.style.display = 'block';// 
            particles[0].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
            particles[0].current.style.width = '90px';
            //particles[0].current.style.height = '30px';
            anime({
              targets: particles[0].current, //transition on timeline to zero in 60%
              translateY: [0, tY], // from args (y-Y)*52
              translateX: [0, tX], // from args (x-X)*52
              duration: 450,
              easing: 'easeInCirc',
              complete: anim1 => {  // may take 90% event
                if(anim1.completed) {  
                  console.log('ISTIME')
                  let resCheck = [];
                  particles[0].current.style.opacity = 0;
                  // применение изменений и конец анимаций через различные события
                  let directions = [
                    {ttY: 43, ttX: 43},
                    {ttY: 43, ttX: -43},
                    {ttY: -43, ttX: 43},
                    {ttY: -43, ttX: -43},
                  ]
                  let promisses = particles.slice(1).map(({current}, i) => {
                    let {ttY, ttX} = directions[i]
                    current.style.display = 'block';
                    current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
                    current.style.width = '75px';
                    return new Promise((resolve, reject) => {
                      anime({
                        targets: current,
                        translateY: [tY, tY-ttY], // 0 --- last position of fireboll    
                        translateX: [tX, tX-ttX],
                        //rotateX: 
                        duration: 500,
                        easing: 'easeInOutCirc', //'spring(1, 90, 12, 0)'
                        // update: anim => {
                        //   current.style.opacity = 1-anim.progress/100+''
                        //   console.log('UPDATE: ', anim.progress)
                        // },
                        complete: anim => {
                          if(anim.completed) {
                            resolve(true)
                          }
                        }
                      })
                    })
                  })
                  Promise.all(promisses).then(() => {
                    spellTo()
                    let progress = 0
                    let opacityRed = () => {
                      setTimeout(() => {
                        progress++
                        particles.slice(1).forEach(({current}) => current.style.opacity = 1-progress/100+'')
                        if(progress <100) {
                          opacityRed()
                        } else {
                          particles.forEach(({current}) => {
                            current.style.display = 'none';
                            current.style.transform = 'translateY(0px) translateX(0px)';
                            current.style.opacity = '1'
                          })
                          //display: block; position: absolute; width: 90px; transform: translateY(-104px) translateX(104px); opacity: 0;
                        }
                      }, 10)
                    }
                    opacityRed()
                    //setTimeout(() => endSpell(), )
                    //setTimeout(() => endSpell(), 1000)
                  })
                  console.log('%c%s', 'color: green' ,"AFTER_SHAKE",resCheck)
                  // if(resCheck.length >= 4) {
                  //   
                  // }
                  
                }
              },
              update: anim => {
                
              }
            });
          }, // использование последовательностей
          particles: [
            { width: '10px', height: '10px', color: 'red', src: null },
          ]
        }     
      ],
    },
    {
      id: 'WKnight2', 
      Y: 1, X: 7,
      pY: 1, pX: 7,
      xp: 26,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      buffs: [],
      v: Math.random(),
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
        effect: ({sources, Y, X, pathBuilder})  => {
          let newVenome = [];
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
          direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newVenome, sources, ['partner'], ['me', 'rocks'], [], Y, X, []))
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 2, postDmg: 9, color: {r: 39, g: 202, b: 126}, src: ''}))
          console.log("INSIDE_VENOME_FUNC:",newVenome)
          return {
            dlsVenome: newVenome,
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
                lightRed: false,
                inLightBySpell: [],
                spellMap
              } 
            } else {

            }
          }   // Новые lightPos.. 
        }     // Спелы противника это просто спел в другую сторону
      ]
    },  //   17, 9
    {
      id: 'WKnight3', 
      Y: 1, X: 9,
      pY: 1, pX: 9,
      xp: 12,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      buffs: [],
      v: Math.random(),
      visibility: {
        dopDirs: ['partner'], // mustBe in future
        blockDirs: ['me', 'rocks'],
        ignore: [],
        enlarge: [],
        dirs: [
          {xDir:1, yDir:1, pathLenght:1},
          {xDir:1, yDir:-1, pathLenght:1},
          {xDir:1, yDir: 0, pathLenght:2},
          {xDir:-1, yDir:-1, pathLenght:1},
          {xDir:-1, yDir:1, pathLenght:1},
          {xDir:-1, yDir: 0, pathLenght:2},
          {xDir:0, yDir: 1, pathLenght:2},
          {xDir:0, yDir: -1, pathLenght:2},
          // {xDir:-2, yDir: -1, pathLenght:1},
          // {xDir:-2, yDir: 1, pathLenght:1},
          // {xDir: 2, yDir: -1, pathLenght:1},
          // {xDir: 2, yDir: 1, pathLenght:1},
          // {xDir:-1, yDir: -2, pathLenght:1},
          // {xDir:1, yDir: -2, pathLenght:1},
          // {xDir:-1, yDir: 2, pathLenght:1},
          // {xDir:1, yDir: 2, pathLenght:1},
        ],
        missesDirs: [
          // {xDir:-2, yDir: -1, pathLenght:1},
          // {xDir:-2, yDir: 1, pathLenght:1},
          // {xDir: 2, yDir: -1, pathLenght:1},
          // {xDir: 2, yDir: 1, pathLenght:1},
          // {xDir:-1, yDir: -2, pathLenght:1},
          // {xDir:1, yDir: -2, pathLenght:1},
          // {xDir:-1, yDir: 2, pathLenght:1},
          // {xDir:1, yDir: 2, pathLenght:1}, 
        ]
      }, // обзор
      move: {
        effect: ({sources, Y, X, pathBuilder})  => {
          let newVenome = [];
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
          direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newVenome, sources, ['partner'], ['me', 'rocks'], [], Y, X, []))
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 2, postDmg: 9, color: {r: 39, g: 202, b: 126}, src: ''}))
          console.log("INSIDE_VENOME_FUNC:",newVenome)
          return {
            dlsVenome: [],
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
          id: 'DeathBlow',
          icon: 'B',
          target: 'partner',
          color: {r: 58, g: 201, b: 211},
          dopDirs: [],
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
          ],
          func: ({payload: {y, x}, sources, target, who, pathBuilder}) => {
            if(who === 'me') {
              let aimIndex = null;
              let workArr = sources[target].slice();
              let rockArr = sources.rocks.slice();
              let meArr = sources.me.slice();
              let newOldPartner = [];
              let newOldMe = [];
              let newOldRocks = [];
              let spellMap = ['partner']
              
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
                lightRed: false,
                inLightBySpell: [],
                spellMap
              } 
            } else {

            }
          }   // Новые lightPos.. 
        }     // Спелы противника это просто спел в другую сторону
      ]
    }
  ], // after reduc func
  partner: [
    {
      id: 'DKnight1',
      Y:2, X:9,
      pY: 2, pX: 9,
      xp: 14,
      maxXp: 12,
      silensed: false,
      stunned: 0,
      buffs: [],
      v: Math.random(),
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
        effect: ({sources, Y, X, pathBuilder})  => {
          let newVenome = [{newX: X, newY: Y}];
          let direction = [
            {xDir:1, yDir:1, pathLenght:1},
            {xDir:1, yDir:-1, pathLenght:1},
            {xDir:1, yDir: 0, pathLenght:1},
            {xDir:-1, yDir:-1, pathLenght:1},
            {xDir:-1, yDir:1, pathLenght:1},
            {xDir:-1, yDir: 0, pathLenght:1},
            {xDir:0, yDir:1, pathLenght:1},
            {xDir:0, yDir:-1, pathLenght:1}
          ];
          direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newVenome, sources, [], ['rocks'], [], Y, X, []))
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 2, postDmg: 9, color: {r: 95, g: 255, b: 202}, src: ''})) //(95, 255, 202)
          console.log("INSIDE_VENOME_FUNC:",newVenome)
          return {
            dlsVenome: newVenome,
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
          func: ({inAir, payload: {y, x}, sources, target, who, pathBuilder}) => {
            // то как будут рисоваться спелы зависит от клик позиции, а не от площади спела
            // очень важный момент... решение о том, будет вижен и какой он будет принимаются в функции... ибо индивид... котл, килл
            // как будет строится анимация зависит от выхода
            let hero = inAir;
              let newPartner = sources['partner'].slice()
              let newMe = sources['me'].slice()
              let newFire = [{newY: y, newX: x, time: 2, postDmg: 0}];
              let newOldPartner = [];
              let newOldMe = []
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
              let gE = who === 'me';
              direction.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, newFire, sources, [gE ? 'partner' : 'me'], [gE ? 'me' : 'partner', 'rocks'], [], y, x, []))
              let workArr = gE ? newPartner : newMe;
              let workArrPass = gE ? 'partner' : 'me';
              let workSpellMapPass = gE ? 'oldPartner' : 'oldMe';
              let workDeadArr = gE ? newOldPartner : newOldMe
              newFire.forEach(({newY, newX}, fi) => {
                workArr.forEach(({Y, X}, i) => {
                  if(newY === Y && newX === X) {
                    let newXp = workArr[i].xp - 6;
                    if(newXp > 0) {
                      console.log('TAAAAAAAAAAAAAAAAKE ITTTTT:',);
                      workArr[i].xp = newXp
                      workArr[i].v = Math.random()
                      if(!spellMap.some(name => name === workArrPass)) {
                        spellMap.push(workArrPass)
                      }
                    } else {
                      console.log('%c%s', 'color: darkgreen; font-size: 33px', 'DEAD_ELEMENT:',workArr[i])
                      workDeadArr.push(workArr[i]);
                      workArr.splice(i, 1);
                      //workArr[i].v = Math.random()
                      if(spellMap.some(name => name === workSpellMapPass)) {
                        spellMap.push(workSpellMapPass)
                      }
                    }
                  }
                })
                newFire[fi].time = 2;
                newFire[fi].postDmg = 0;
                newFire[fi].color = gE ? {r: 150, g: 0, b: 24} : {r: 255, g: 0, b: 55};
                newFire[fi].src = gE ? 'meFireBollSrc' : 'partFireBollSrc';
              })
              //console.log('%c%s', 'color: cadetblue; font-size:44px;','IN_AIR:',inAir)
              //console.log('%c%s', 'color: cadetblue; font-size:44px;',`x: ${x}, y: ${y}`)
              let firebol_res = {
                me: newMe,
                partner: newPartner,
                rocks: sources.rocks,
                oldMe: newOldMe,
                oldPartner: newOldPartner,
                oldRocks: null,
                fire: newFire,
                myVenom: [],
                partVenom: [],
                lightRed: false,
                inLightBySpell: [],
                args: {
                  tX: (x-inAir.X)*52,
                  tY: (y-inAir.Y)*52,
                  animeFunc: 'animeFunc',
                  hideKnight: !gE ? !sources['inLight'].some(({newY, newX}) => inAir.Y === newY && inAir.X === newX) : false
                },
                spellMap
              }
              console.log('%c%s', 'color: red; font-size: 50', 'FIREBOLL_RES:', firebol_res)
              return firebol_res
          },

          animeFunc:(payloadShow) => ({particles, knight, args: {tY, tX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {
            // для мастера подгод под конкретное число, inAir известен...
            const opacityRedWrapper = (baseStep, endStep) => {
              return new Promise((resolve) => {
                let progress = 0
                let opacityRed = () => {
                  setTimeout(() => {
                    progress++
                    baseStep(progress)
                    
                    if(progress <100) {
                      opacityRed()
                    } else {
                      endStep()
                      resolve()
                      //display: block; position: absolute; width: 90px; transform: translateY(-104px) translateX(104px); opacity: 0;
                    }
                  }, 10)
                }
                opacityRed()
              })
            }
            
            console.log('PARTICLES:', particles)
            particles[0].current.style.display = 'block'; // 
            particles[0].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
            particles[0].current.style.width = '90px';
            //particles[0].current.style.height = '30px';
            console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`)
            if(hideKnight || payloadShow) {
              opacityRedWrapper(
                (progress) => knight.current.style.opacity = 1-progress/100+'',
                () => {}
              )
              //console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`,animU.progress)
              //knight.current.style.opacity = 1-animU.progress/100;
            }
            anime({
              targets: particles[0].current, //transition on timeline to zero in 60%
              translateY: [0, tY], // from args (y-Y)*52
              translateX: [0, tX], // from args (x-X)*52
              duration: 450,
              easing: 'easeInCirc',
              complete: anim1 => {  // may take 90% event
                if(anim1.completed) {  
                  console.log('ISTIME')
                  let resCheck = [];
                  particles[0].current.style.opacity = 0;
                  // применение изменений и конец анимаций через различные события
                  let directions = [
                    {ttY: 43, ttX: 43},
                    {ttY: 43, ttX: -43},
                    {ttY: -43, ttX: 43},
                    {ttY: -43, ttX: -43},
                  ]
                  let promisses = particles.slice(1).map(({current}, i) => {
                    let {ttY, ttX} = directions[i]
                    current.style.display = 'block';
                    current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
                    current.style.width = '75px';
                    return new Promise((resolve, reject) => {
                      anime({
                        targets: current,
                        translateY: [tY, tY-ttY], // 0 --- last position of fireboll    
                        translateX: [tX, tX-ttX],
                        //rotateX: 
                        duration: 500,
                        easing: 'easeInOutCirc', //'spring(1, 90, 12, 0)'
                        // update: anim => {
                        //   current.style.opacity = 1-anim.progress/100+''
                        //   console.log('UPDATE: ', anim.progress)
                        // },
                        complete: anim => {
                          if(anim.completed) {
                            resolve(true)
                          }
                        }
                      })
                    })
                  })
                  Promise.all(promisses).then(() => {
                    spellTo()
                    opacityRedWrapper(
                      (progress) => particles.slice(1).forEach(({current}) => current.style.opacity = 1-progress/100+''),
                      () => {
                        particles.forEach(({current}) => {
                          current.style.display = 'none';
                          current.style.transform = 'translateY(0px) translateX(0px)';
                          current.style.opacity = '1'
                        })
                      }
                    ).then(() => (hideKnight || payloadShow) && cleanAfterPartSpell())
                    //setTimeout(() => endSpell(), )
                    //setTimeout(() => endSpell(), 1000)
                  })
                  console.log('%c%s', 'color: green' ,"AFTER_SHAKE",resCheck)
                  // if(resCheck.length >= 4) {
                  //   
                  // }
                  
                }
              },
              update: anim => {
                
              }
            });
          }
        }
    ]
  }], // FS
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
  inLight: [],
  newInLight: [],
  oldInLight: [],
  rocks: [], // FS
  oldRocks: null, 
  treasures: [], // FS
  deletedTreasures: [],
  myTreasures: [], // action to spend this
  canAttack: [],
  oldCanAttack: [],
  //timeDepend: [],
  spellMap: [],
  fire: [],
  oldFire: [],
  myVenom: [],
  partVenom: [],
  act: 0, // reduce that
  actTick: 0,
  maxTick: 3,
  moveFromShadow: null, // akt: 2 --> 3 --> 4 any actions, but venom prock onli after muves
  stateHistory: [ // 2 штуки, for light and for dark 
    // Game.stateHistory допушивается после каждого акта
    {
      me: [], // in start of ackt
      partner: [],
      rocks: [],
      fire: [],
      venom: [],
      inLight: [],
      treasures: [], // where action??? 
      myTreasures: [],
      // action version
      actions: [{who: '', air: '', type: 'attack', name: '', ind: '', payload: ''}],
      // map version
      map: [{id: 'attack', ind: ''}],
      moves: [{air: '', to: ''}],
      attacks: [{air: '', to: ''}],
      spells: [{air: '', spellInd: '', to: ''}],
    }
  ], // F
  dispatchHistory: [], // F
  side: 'dark', // or light // FS

  //spellAnimations???
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
      return preparePartnerAnimeMove(payload, state.inLight, state)
    case 'PARTNER:MOVE_TO':
      //console.log('INTRESTING_PAYLOAD:', payload)
      return partnerMoveTo(state)
    case 'KNIGHT:MOVE_TO':
      //console.log('PRE_GET_NEW_STAFF:', state.inAir)
      const newMe = getNewStaff(state.me, state.inAir, state.workPayload.payload)
      let sources = {rocks: state.rocks, me: newMe, partner: state.partner}
      let r = getDlsData({ sources, pathBuilder})
      let allLightPos = getLightPosition(newMe, state.partner, state.rocks).concat(r.sumDlsLight)
      //newPartner
      return updateBaseStep(
        updateVenomStep({ // // for what, i don't know 
          data: {
            ...state, 
            me: newMe,
            inAir: null,
            canMove: [],
            oldCanMove: state.canMove,
            inLight: allLightPos,
            newInLight: getNewInLight(state.inLight, allLightPos),
            oldInLight: getOldInLight(state.inLight, allLightPos), // точечная перерисовка, если траблы с опти
            animeMove: null, 
            myVenom: state.myVenom.concat(r.sumDlsMyVenom),
            partVenom: state.partVenom.concat(r.sumDlsPartVenom),
            updateSign: 'M'+Math.random(),
          },
          state
        }))
    case 'KNIGHT:ANIME_MOVE':
      //payload = {x, y, isDrag}
      return {
        ...state,
        canMove: [],
        oldCanMove: state.canMove.length !== 0 ? state.canMove : [],
        animeMove: !payload.isDrag ? {id:state.inAir.id, y: payload.y, x: payload.x} : null,
        workPayload: {inAir: state.inAir, payload, me: true, cause: 'move', spellInd: null},
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:LAST_PREPARATION':
      //console.log('LOO0000000000000000K_AT_THIS_STATE:', state)
      let previewLight = getLightPosition(state.me, state.partner, state.rocks)
      return {
        ...state,
        inLight: previewLight,
        newInLight: previewLight,  //добавить сдесь скало креатор
        rocks: rocksCreator(),
        treasures: treasuresCreator(),
        stateHistory: [
          {
            me: state.me,
            partner: state.partner,
            rocks: rocksCreator(),
            fire: [],
            venom: [],
            inLight: previewLight,
            treasures: treasuresCreator(),
            myTreasures: [],
            actions: []
          }
        ],
        updateSign: 'P'+Math.random(), // добавить небольшой прелоад и рипать его тут
      }
    case 'KNIGHT:TAKE_TREASURE': 
      //console.log("PAYLOOOOOOOOOAD", payload) /// афтерКлик? //updateMap => func in Board
      return {
        ...state, // нижней строчки может и не быть.
        treasures: state.treasures.filter(({Y, X}) => !( Y === payload.Y && X === payload.X)),
        deletedTreasures: [payload],
        myTreasures: [...state.myTreasures].concat(state.treasures.filter(({Y, X}) => Y === payload.Y && X === payload.X)),
        updateSign: 'T'+Math.random()
      }
    case 'KNIGHT:PREPARE_TO':
      let {pass, dls} = payload
      //console.log(`BIIIIIIIIIIIIIIIG PREPARE DLS: ${dls} PASS:`, pass)
      //console.log(state.canSpell.length === 0 && pass === 'SPELL')
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
      // destuct attack soon to anim
    case 'KNIGHT:START_ATTACK': 
      console.log('TAKE_SIGNAL')
      // payload = {y, x, aim(rock/partner)}
      return {
        ...state,
        canAttack: [],
        oldCanAttack: state.canAttack.length !== 0 ? state.canAttack : [],
        animeAttack: {id:state.inAir.id, y: payload.y, x: payload.x, type: state.inAir.attack.type},
        workPayload: {inAir: state.inAir, payload, me: true, cause: 'attack', spellInd: null},
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:ATTACK_TO': // будет вызываться нескольколько раЗ, если необходимо, АУЕ
      let {y, x, aim} = state.workPayload; // refactory this
      let partnerRes =  findAndKill(state.partner, y, x, aim, 'partner', state.inAir)
      let rocksRes =  findAndKill(state.rocks, y, x, aim, 'rocks', state.inAir)
      // буст от аттаки inAir'а
      const attackSources = {rocks: rocksRes.res, me: state.me, partner: partnerRes.res} // Эта длс для камня.. если кто - либо рипает преграду dls lightу
      let attackR = getDlsData({ sources: attackSources, pathBuilder})
      let allLightPosAfterMurder = getLightPosition(state.me, partnerRes.res, rocksRes.res).concat(attackR.sumDlsLight)
      return updateBaseStep(
        updateVenomStep({
        data: {
          ...state,
          partner: partnerRes.res,
          rocks: rocksRes.res,
          oldPartner: partnerRes.target,
          oldRocks: rocksRes.target,
          // canAttack: [],
          // oldCanAttack: state.canAttack,
          inLight: partnerRes.target || rocksRes.target ? allLightPosAfterMurder : state.inLight,
          newInLight: partnerRes.target || rocksRes.target ? getNewInLight(state.inLight, allLightPosAfterMurder) : [],
          //oldInLight: partnerRes.target || rocksRes.targetgetLigh ? state.newInLight : [],
          myVenom: state.myVenom.concat(attackR.sumDlsMyVenom),
          partVenom: state.partVenom.concat(attackR.sumDlsPartVenom),
          animeAttack: null,
          updateSign: 'A'+Math.random(),
        },
        state
      }))
    case 'KNIGHT:KAMICK_ATTACK':
      const {me, partner, deadM, deadP} = payload
      //console.log('DEEEEEEBBAG_PAYLOAD:',payload)
      let updatedMe = deadM ? state.me.filter(({id}) => id !== deadM.id) : getNewStaffAfterKamick(state.me, me)
      let updatedPartner = deadP ? state.partner.filter(({id}) => id !== deadP.id) : getNewStaffAfterKamick(state.partner, partner)
      // if knok on stone... handle
      let kamikSource = {rocks: state.rocks, me: updatedMe, partner: updatedPartner}
      let kamikR = getDlsData({ sources: kamikSource, pathBuilder})
      
      let allLightPosAfterKamick = getLightPosition(updatedMe, updatedPartner, state.rocks).concat(kamikR.sumDlsLight)
      return {
        ...state,
        me: updatedMe,
        partner: updatedPartner,
        oldPartner: deadP ? [deadP] : [],
        oldMe: deadM ? [deadM] : [],
        inLight: allLightPosAfterKamick,
        newInLight: getNewInLight(state.inLight, allLightPosAfterKamick),
        oldInLight: getOldInLight(state.inLight, allLightPosAfterKamick),
        updateSign: 'K'+Math.random()
      }
    case 'PARTNER:CLEAN_AFTER_SPELL': 
      return {
        ...state,
        showOnSecond: null,
        oldShowOnSecond: state.showOnSecond,
        updateSign: 'Z'+Math.random()
      }
    case 'PARTNER:START_SPELL':
    //if
    //payload = {id, x, y, spellId, withAnime, show}  // withAnime <-- side and if inLight.some(...) 
    //!IMPORTANT 3 вида анимации: 1 без анимации(payload.withAnime === false, show(hide): false), 2 - нормальная аниме(withAnime === true, show: false), 3 - анимация с раскрытием позиции и послед. скрытием(with === true, show: true)
    let pO;
      state.partner.forEach(({id}, i) => {
        if(id === payload.id) {
          pO = state.partner[i]
        }
      })
      //console.log('%c%s', 'color: aquamarine; font-size: 22px;','THAT_PO:', pO)
      let pSO = pO.spells[payload.spellInd]
      let pSR = pSO.func({
        inAir: pO,
        payload: {x: payload.x, y: payload.y},
        sources: {me: state.me, partner: state.partner, rocks: state.rocks, inLight: state.inLight},
        target: pSO.target,
        who: 'part',
        pathBuilder,
      }) //=== купить $taff ===//
      //console.log('%c%s', 'color: aquamarine; font-size: 22px;','THAT_PSR:', pSR)
      return payload.withAnime ? {
        ...state,
          spellAnimations: {
            animeFunc: pSO[pSR.args.animeFunc](payload.show), //[pSR.args.funcChuse] default base
            animeArg: pSR.args, 
            personId: pO.id
          },
          showOnSecond: pSR.args.hideKnight || payload.show ? {fX: pO.X, fY: pO.Y} : null, //if show else dead
          spellCash: pSR,
          workPayload: {inAir: pO, payload: {y: payload.y, x: payload.x}, me: false, cause: 'spell', spellInd: payload.spellInd},
          updateSign: 'H'+Math.random()
        } : {
        ...state,
        spellCash: pSR,
        workPayload: {inAir: pO, payload: {y: payload.y, x: payload.x}, me: false, cause: 'spell', spellInd: payload.spellInd}
      }
    case 'KNIGHT:START_SPELL':
      // state.spellInd state.inAir
      let spellObj = state.inAir.spells[state.spellInd]
      let spellRes = spellObj.func( // modify this... using call..
        { 
          inAir: state.inAir,
          payload, // {y, x}
          sources: {me: state.me, partner: state.partner, rocks: state.rocks}, 
          target: spellObj.target, 
          who: 'me',
          pathBuilder
        }) //target enemy, me, rock
      return {
        ...state,
        spellAnimations: {
          animeFunc: spellObj.animeFunc(false), 
          animeArg: spellRes.args,
          //particles: spellObj.particles,
          personId: state.inAir.id
        },
        spellCash: spellRes,
        workPayload: {inAir: state.inAir, payload, me: true, cause: 'spell', spellInd: state.spellInd},
      }
    case 'KNIGHT:END_SPELL': 
      return {
        ...state,
        spellCash: null,
        spellAnimations: null,
        spellInd: null,
      }
    case 'KNIGHT:SPELL_TO':  // inside Anime
      
      // сперва поджигает затем умирает, Урон, даже если чел убился об яд
      // эксперимент с передачей this и подключением к this функций
      let spellCashRes = state.spellCash
      let spellSources = {rocks: spellCashRes.rocks, me: spellCashRes.me, partner: spellCashRes.partner}
      let sDD = getDlsData({ sources: spellSources, pathBuilder})
      let allLightPosAfterSpell = spellCashRes.inLightBySpell.concat(sDD.sumDlsLight); // абсолютный источник света
      //console.log('%c%s','color: red; font-size: 24px;','DLS_DATA_VENOM:', sDD.sumDlsMyVenom)
      return updateBaseStep(
        updateVenomStep({
        data: {
          ...state,
          partner: spellCashRes.partner,
          me: spellCashRes.me,
          rocks: spellCashRes.rocks,
          oldMe: spellCashRes.oldMe,
          oldPartner: spellCashRes.oldPartner,
          oldRocks: spellCashRes.oldRocks,
          canSpell: [],
          oldCanSpell: state.canSpell,
          fire: state.fire.concat(spellCashRes.fire), //Just flash not real fire
          myVenom: state.myVenom.concat(spellCashRes.myVenom).concat(sDD.sumDlsMyVenom),
          partVenom: state.partVenom.concat(spellCashRes.partVenom).concat(sDD.sumDlsPartVenom),
          spellMap: spellCashRes.spellMap,
          inLight: spellCashRes.lightRed ? allLightPosAfterSpell : state.inLight,
          newInLight: spellCashRes.lightRed ? getNewInLight(state.inLight, allLightPosAfterSpell) : [],
          oldInLight: spellCashRes.lightRed ? getOldInLight(state.inLight, allLightPosAfterSpell) : [],
          updateSign: 'S'+Math.random(), // remuver
          spellCash: null,
          spellAnimations: null,
          spellInd: null,
        },
        state
      }))
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

const getNewInLight = (state, newData) => {
  return newData.filter(({newY, newX}) => {
    return !state.some(({newY:sY, newX:sX}) => sY === newY && sX === newX)
  })
}

const getOldInLight = (state, newData) => {
  return state.filter(({newY:sY, newX:sX}) => {
    return !newData.some(({newY, newX}) => sY === newY && sX === newX)
  })
}

const updateVenomStep = ({data, state}) => {
    //console.log('DATA_PASS:', data)

    const newMyVenom = updateSpells(data.myVenom ? data.myVenom : state.myVenom);
    const newPartVenom = updateSpells(data.partVenom ? data.partVenom : state.partVenom);
    const afterClickPartner = updateGameStats(data.partner ? data.partner : state.partner, newMyVenom.res);
    const afterClickMe = updateGameStats(data.me ? data.me : state.me, newPartVenom.res);
    const newFire = updateSpells(data.fire ? data.fire : state.fire);
    
    //console.log('NEW_FIRE:', newFire.res)
    let getNewSpellMap = () => {
      if(data.spellMap) {
        let newSpellMap = data.spellMap;
        [
          {
            workArr: newMyVenom,
            pushPass: 'oldMyVenom',
            pass: 'dead'
          },
          {
            workArr: newPartVenom,
            pushPass: 'oldPartVenom',
            pass: 'dead'
          },
          {
            workArr: newFire,
            pushPass: 'oldFire',
            pass: 'dead'
          },
          {
            workArr: afterClickMe,
            pushPass: 'oldMe',
            pass: 'dead'
          },
          {
            workArr: afterClickPartner,
            pushPass: 'oldPartner',
            pass: 'dead'
          },
          {
            workArr: newMyVenom,
            pushPass: 'myVenom',
            pass: 'res'
          },
          {
            workArr: newPartVenom,
            pushPass: 'partVenom',
            pass: 'res'
          },
          {
            workArr: newFire,
            pushPass: 'fire',
            pass: 'res'
          }
        ].forEach(({workArr, pushPass, pass}) => {
          if(workArr[pass] && !newSpellMap.some(name => name === pushPass)){
            newSpellMap.push(pushPass)
          }
        })
        
        return newSpellMap
      } else {
        return []
      }
    }
  return {
    ...data,
    partner: afterClickPartner.res, 
    me: afterClickMe.res,
    oldPartner:data.oldPartner ? data.oldPartner.concat(afterClickPartner.dead) : afterClickPartner.dead,
    oldMe:data.oldMe ? data.oldMe.concat(afterClickMe.dead) : afterClickMe.dead,
    oldFire: newFire.dead,
    fire: newFire.res,
    oldMyVenom: newMyVenom.dead,
    oldPartVenom: newPartVenom.dead,
    partVenom: newPartVenom.res,
    myVenom: newMyVenom.res,
    spellMap: getNewSpellMap()
  }
}
// вызывается если есть совпадения 
const preparePartnerAnimeMove = ({id, y, x, fY, fX}, inLight, state) => {
  let res = {} //fY and fX may take from state[id]
  let workPartner = {}
    state.partner.forEach(({id:pID}, i) => {
      if(pID === id) {
        workPartner = state.partner[i]
      }
    })
  //const { fY, fX } = workPartner
  console.log('%c%s', 'color: red;', 'WORK_PARTNER_PASS:',workPartner)
  console.log('inLight: ', inLight)
  let workPayload = {inAir: {id, fY, fX}, payload: {y, x}, me: false, cause: 'move', spellInd: null}
  if(!inLight.some(({newY, newX}) => {
    return newY === workPartner.pY && newX === workPartner.pX
  })) { // выход из тени
    res = {
      ...state,
      moveFromShadow: {y, x, fY: workPartner.pY, fX: workPartner.pX}, //пропсы с нижних уровней
      workPayload,
      updateSign: 'Q'
    }
  } else if (!inLight.some(({newY, newX}) => newY === y && newX === x)) { // уход в тень
    res = {
      ...state,
      animeMove: {id, y, x, shadow: true},
      workPayload,
      //updateSign: 'Q'
    }
  } else { // тригерится даже при отсутствии света. Dont forget of dls
    res = {
      ...state,
      animeMove: {id, y, x, shadow: false},
      workPayload,
      //updateSign: 'Q'
    }
  }
  return res
}

const partnerMoveTo = (state) => {
  //console.log('NEW_PARNTNER:', {id, y, x})
  // alter Payload is state.workPayload where {id, y, x} refactory in f
  //console.log('%c%s', 'color: indigo; font-size: 44px;','WORK_PAYLOAD', state.workPayload)
  let {y, x} = state.workPayload.payload
  let {id} = state.workPayload.inAir
  const newPartner = getNewStaff(state.partner, {id}, {y, x})
  let partMoveSource = {rocks: state.rocks, me: state.me, partner: newPartner}
  let partMoveR = getDlsData({ sources: partMoveSource, pathBuilder})
  const lightPosAfterPartnerMove = getLightPosition(state.me, newPartner, state.rocks).concat(partMoveR.sumDlsLight)
  //console.log('LIGHT_POS_AFTER_PARTNER_MOVE:',lightPosAfterPartnerMove)
  
  return updateBaseStep(
    updateVenomStep({
      data:
      {
        ...state,
        partner: newPartner, 
        inLight: lightPosAfterPartnerMove,
        myVenom: state.myVenom.concat(partMoveR.sumDlsMyVenom),
        partVenom: state.partVenom.concat(partMoveR.sumDlsPartVenom),
        newInLight: getNewInLight(state.inLight, lightPosAfterPartnerMove),
        oldInLight: getOldInLight(state.inLight, lightPosAfterPartnerMove),
        animeMove: null,
        moveFromShadow: null,
        oldMoveFromShadow: state.moveFromShadow,
        updateSign: 'W'
      }, 
      state //workPayload inside insert in
    }))
}

const updateGameStats = (workArr, venomArr) => {
  let res = workArr.slice()
  let dead = []
  console.log('UPDATE_GAME_STATE:VENOME:',venomArr)
  
    res.forEach(({Y, X, stunned}, i) => {
      //console.log('STUNNED:',stunned)
      venomArr.forEach(({newY, newX, postDmg}) => {
      if(newY === Y && newX === X) {
        let newXp = res[i].xp - postDmg
        if(newXp < 0) {
          dead.push(res[i])
          res.splice(i, 1)
        } else {
          res[i].xp = newXp
          res[i].v = Math.random()
        }
      }
    })
  })
  return {res, dead}
}

const updateBaseStep = (data) => {
  const { workPayload: {inAir, payload, me, cause, spellInd} } = data;
  const stunUpdater = (workArr) => {
    let res = workArr.slice();
    res.forEach(({stunned}, i) => {
      if(stunned) {
        res[i].stunned = stunned-=1;
      }
    })
    return res
  }
  // after baff 
  let meAfterStun = stunUpdater(data.me);
  let partnerAfterStun = stunUpdater(data.partner)
  let newStateHistory = [].concat(data.stateHistory); // допушиваем старый stateHistory и делаем новый view

  let newAct = data.act;
  let newTick = data.actTick+1;
  let lastHistory = newStateHistory.length - 1;

  let actionsPass = {me, inAir, type: cause, payload, spellInd}
  if(newTick > data.maxTick - 1) {
    newTick = 0;
    newAct = newAct+1;
    newStateHistory[lastHistory].actions.push(actionsPass)
    newStateHistory.push({
      me: meAfterStun,
      partner: partnerAfterStun,
      rocks: data.rocks,
      fire: data.fire, // just flash
      myVenom: data.myVenom,
      partVenom: data.partVenom,
      inLight: data.inLight,
      treasures: data.treasures,
      myTreasures: data.myTreasures,
      actions: []
    })
    //push newAct
  } else {
    newStateHistory[lastHistory].actions.push(actionsPass)
  }

  let res = {
    ...data,
    me: meAfterStun,
    partner: partnerAfterStun,
    stateHistory: newStateHistory,
    act: newAct,
    actTick: newTick,
  }
  console.log('UPDATE_BASE_STEP:', res)
  return res
}

const updateSpells = workArr => {
  console.log('UPDATE_SPELLS:',workArr)
  let res = workArr.map(({time, ...another}) => ({time: time-=1, ...another}))
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
  workArr[checkIndex] = {...workArr[checkIndex], xp, Y, X, pY, pX, v: Math.random()}
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
    
    //console.log(`Y: ${y}, X: ${x}, aimIndex: ${aimIndex}`, aim)
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
    const checkPaths = (workArr, permit, igno, enlarge) => {
      workArr.forEach((name) => {
        if(modYDir === modXDir
            && rockInclude({y:newPlace.newY-yDir, x:newPlace.newX}) 
                && rockInclude({y:newPlace.newY, x:newPlace.newX-xDir})) { // check on diagon
                  ripFlag = false
                  isEmptyPlace[0] = false
                
                
          // if() {
          //     ripFlag = false
          //     isEmptyPlace[0] = false
          // } 
          // else {
          //   if(!igno) {
          //     ripFlag = false
          //   }
          //   permit && passFunc()
          //   isEmptyPlace[0] = false
          // }
              // if(enlarge) {
              //   console.log('%c%s', 'font: 1.3rem/2 Georgia; color: indigo', 'ALTER_BRANCH:', newPlace)
              //   console.log('%c%s', 'font: 1.3rem/2 Georgia; color: indigo', 'ALTER_BRANCH:COUNTER:', counter)
              //   passFunc()
              //   counter++
              // } else {
              //    // check on body
              // }
              
        } else {
          if(mainSource[name].some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
            if(!igno) {
              ripFlag = false
            }
            // if(enlarge) {
            //   console.log('%c%s', 'font: 1.3rem/2 Georgia; color: indigo', 'ALIVE:', newPlace)
            //   counter++
            // }
            // if(enlarge || (enlarge && modYDir === modXDir)) {
            //   console.log('INCREASE:', newPlace)
            // }
            permit && passFunc() // add dop dist for attack 
            isEmptyPlace[0] = false
          }
        }
      })
    }
    //console.log('DEEEEEEEEEEEEEEEEEEEEBBBBBBBBBAAAG 2222:', block)
    checkPaths(dop, true, false)
    checkPaths(block, false, false)
    checkPaths(ignore, true, true)
    //checkPaths(enlarge, true, true, true)
    //yDir === -1 && xDir === 1 && console.log('%c%s', 'font: 1.3rem/1 Georgia bold; color: gold', `ENLARGE_HANDL: COUNT: ${counter} and flag: ${ripFlag}, isEmpty: ${isEmptyPlace[0]}`, newPlace )
    isEmptyPlace[0] && passFunc()

  }
  // if(yDir === -1 && xDir === 1) {
  //   console.log('%c%s', 'color: green; font: 1.3rem/1', `SIGNALL: flag ${ripFlag}, counter: ${counter}`,{yDir, xDir})
  // }
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
  //console.log(move)
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
    //console.log('VISIBILITY', visibility)
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
  console.log(`REDUCER INNNNNNNNNNNNNNSA THAT_TRY_FIND: ${id} _index: ${index}, Staff:`,staff)
  staff[index] = {...staff[index], id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X, v: Math.random()}
  //console.log({id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X})
  //console.log(staff)

  return staff
}

const checkAttack = (me, partner, rocks, {id, Y, X, attack: {dirs, dopDirs, blockDirs, missesDirs, ignore, type}}) => {
  let realPath = []
  let misses = []
  //console.log('PREPARE_TO_ATTACK:', ignore)
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