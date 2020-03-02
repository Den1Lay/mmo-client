import store from '../index'
import { getDlsData, lightFilter, updateOldXp } from '@/utils'
//import { updateOldXp } from '../../actions/game'
// ПЕРВАЯ ЗАПОВЕДЬ СПЕЛЛОВ: НЕЛЬЗЯ РЕДАЧИТЬ ГЕРОЯ, КОТОРЫЙ ДРОПНУЛ СПЕЛ ИЛИ КЛЕТКУ НА КОТОРОЙ СТОИТ ГЕРОЙ, ЕСЛИ У СПЕЛА ЕСТЬ АФТЕР ЭФФЕКТЫ. (можно)
// СОБЫТИЕ: START_СОБЫТИЯ (createCash, wp) --> СОБЫТИЕ_TO
// IGNORE_ARR: Блокирует возможность наступить,но не продолжение пути, если там не аргумент игнора
// Check energy_cost and my_energy before startSpell, if else just showEnergy
// develop edition 
let absThis = this
const defaultState = {
  me: [
    {
      id: 'WRockMan1', 
      Y: 12, X: 0, // after PP
      pY: 12, pX: 0, // after PP
      xp: 20,
      oldXp: 20,
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
        cost: 2,
        src: 'https://images.freeimages.com/images/large-previews/bb2/bottle-beer-detail-1-1193177.jpg',
        effect: ({id, sources, Y, X, pathBuilder}) => {
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
            liveFlag = false
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
        blockDirs: ['me'],
        ignore: ['rocks'], 
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
        cost: 3,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Red_Army_flag.svg/1200px-Red_Army_flag.svg.png',
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
          src: 'https://images.freeimages.com/images/large-previews/b2d/kiwi-fruit-macros-1313905.jpg',
          color: {r: 150, g: 0, b: 24},
          cost: 4,
          dopDirs: [],
          blockDirs: ['me'],
          ignore: ['rocks'],
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
                      workArr[i].xp = newXp
                      workArr[i].v = Math.random()
                      if(!spellMap.some(name => name === workArrPass)) {
                        spellMap.push(workArrPass)
                      }
                    } else {
                      //console.log('%c%s', 'color: darkgreen; font-size: 33px', 'DEAD_ELEMENT:',workArr[i])
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
              
              //console.log('%c%s', 'color: red; font-size: 50', 'FIREBOLL_RES:', firebol_res)
              return firebol_res
          },  // Новые lightPos.. // Спелы противника это просто спел в другую сторону
          // Анимации делают, все тоже, что и reducer, maxSinx
          animeFunc:(payloadShow) => ({particles, knight, args: {tY, tX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {  
            // для мастера подгод под конкретное число, inAir известен...
            particles[0].current.style.display = 'block'; // 
            particles[0].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
            particles[0].current.style.width = '90px';
            //particles[0].current.style.height = '30px';
            //console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`)
            if(hideKnight || payloadShow) {
              anime({
                targets: knight.current,
                opacity: [1, 0],
                duration: 1600,
                easing: 'easeInOutCirc'
              })
            }
            anime({
              targets: particles[0].current, //transition on timeline to zero in 60%
              translateY: [0, tY], // from args (y-Y)*52
              translateX: [0, tX], // from args (x-X)*52
              duration: 450,
              easing: 'easeInCirc',
              complete: anim1 => {  // may take 90% event
                if(anim1.completed) {  
          
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
                    Promise.all(
                      particles.slice(1).map(({current}) => {
                        return new Promise(resolve => {
                          anime({
                            targets: current,
                            opacity: [1, 0],
                            duration: 777,
                            easing: 'easeInOutCirc',
                            complete: anim2 => {
                              if(anim2.completed) {
                                resolve(true)
                              }
                            }
                          })
                        })
                      })
                    ).then(() => {
                      //debugger
                      particles.forEach(({current}) => {
                        //console.log('%c%s','color: lightblue; font-size: 44px', 'INSIDE_ANIME_FUNC_CURRENT', typeof current.style.transform)
                        current.style.display = 'none';
                        current.style.transform = 'translateY(0px) translateX(0px)';
                        current.style.opacity = '1'
                      });
                      (hideKnight || payloadShow) && cleanAfterPartSpell()
                    })
                  })
                }
              }
            });
          }, // использование последовательностей
          // particles: [
          //   { width: '10px', height: '10px', color: 'red', src: null },
          // ]
        }     
      ],
    },
    {
      id: 'WKnight2', 
      Y: 1, X: 7,
      pY: 1, pX: 7,
      xp: 26,
      oldXp: 26,
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
        cost: 2,
        src: 'https://images.freeimages.com/images/large-previews/bb2/bottle-beer-detail-1-1193177.jpg',
        effect: ({id, sources, Y, X, pathBuilder})  => {
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
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 1, postDmg: 5, color: {r: 39, g: 202, b: 126}, src: ''}))
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
        cost: 3,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Red_Army_flag.svg/1200px-Red_Army_flag.svg.png',
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
          src: 'https://images.freeimages.com/images/large-previews/754/details-of-a-tulip-2-1375972.jpg',
          target: 'partner',
          color: {r: 25, g: 25, b: 112},
          cost: 4,
          dopDirs: [],
          blockDirs: ['me'],
          ignore: ['rocks'],
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
          func: ({inAir, payload: {y, x}, sources, target, who, pathBuilder}) => {
            //what if click on nothing
            //tp random ally to the point
            //debugger 
            let gE = who === 'me';
            let targetInd
            let newMe = sources['me'].slice()
            let newPartner = sources['partner'].slice()
            let rockArr = sources.rocks.slice()
            let newOldPartner = []
            let newOldMe = []
            let newOldRocks = []
            let spellMap = [gE ? 'partner' : 'me']
            let workArr = gE ? newPartner : newMe;
            let attackArr = gE ? newMe : newPartner;
            let attackArrPass = gE ? 'me' : 'partner'
            let workDeadArr = gE ? newOldPartner : newOldMe;
            let altWorkDeadArr = gE ? newOldMe : newOldPartner;
            let workDeadPass = gE ? 'oldPartner' : 'oldMe';
            let altWorkDeadPass = gE ? 'oldMe' : 'oldPartner'
            workArr.forEach(({Y, X}, i) => {
              if(Y === y && X === x) {
                targetInd = i
              }
            })
            const {Y, X} = workArr[targetInd];
            let newY = Y+5;
            let rockStunIndex = null;
            let stunOfAttacker = null;
            let stunOfAlly = null;
            sources.rocks.forEach(({Y:rY, X:rX},i) => {
              if(rY === newY && rX === X) {
                rockStunIndex = i
              }
            })
            attackArr.forEach(({Y:mY, X:mX}, mi) => {
              if(mY === newY && mX === X) {
                stunOfAttacker = mi
              }
            })
            workArr.forEach(({Y:pY, X:pX}, pi) => {
              if(pY === newY && pX === X) {
                stunOfAlly = pi
              }
            })
            const deathFunc = (ind) => {
              workDeadArr.push(workArr[ind])
              workArr.splice(stunOfAlly, 1)
              spellMap.push(workDeadPass)
            }
            if(rockStunIndex === null && stunOfAttacker === null && stunOfAlly === null) {
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
                //console.log('NOTH1NG')
              }
              workArr[targetInd] = {...workArr[targetInd], Y: newY, pY: workArr[targetInd].Y, pX: workArr[targetInd].X}
            } else if(rockStunIndex !== null) {
              newY = rockArr[rockStunIndex].Y
              newOldRocks.push(rockArr[rockStunIndex])
              //console.log('ROCK_STUN_INDEX:', rockStunIndex)
              //console.log('NEW_OLD_ROCKS:', newOldRocks)
              rockArr.splice(rockStunIndex, 1)
              spellMap.push('oldRocks')
              spellMap.push('rocks')
              let resXp = workArr[targetInd].xp - 5
              if(resXp > 0) {
                workArr[targetInd] = {...workArr[targetInd], Y: newY, pY: workArr[targetInd].Y, pX: workArr[targetInd].X, xp: resXp, stunned: 3}
              } else { // RIP
                deathFunc(targetInd)
                // workDeadArr.push(workArr[targetInd])
                // workArr.splice(targetInd, 1)
                // spellMap.push(workDeadPass)
              }
            } else if(stunOfAlly === null) { // Stunk at me or part
              let resSpellObjXp = workArr[targetInd].xp - 3 // spellPerson
              let resAttackerXp = attackArr[stunOfAttacker].xp - 2 // attackerXp
              if(resSpellObjXp > 0) { // survive
                workArr[targetInd] = {...workArr[targetInd], Y:attackArr[stunOfAttacker].Y, pY: workArr[targetInd].Y, pX: workArr[targetInd].X, xp: resSpellObjXp, stunned: 2}
              } else { //RIP OF ME
                deathFunc(targetInd)
                // workDeadArr.push(workArr[targetInd])
                // //newOldPartner.push(workArr[aimIndex]) // to another func
                // workArr.splice(targetInd, 1)
                // spellMap.push(workDeadPass)
              }
              spellMap.push(attackArrPass)
              if(resAttackerXp > 0) { //RIP ME
                attackArr[stunOfAttacker] = {...attackArr[stunOfAttacker], xp: resAttackerXp, stunned: 1}
              } else {
                altWorkDeadArr.push(attackArr[stunOfAttacker])
                attackArr.splice(stunOfAttacker, 1)
                spellMap.push(altWorkDeadPass)
              }
            } else {
              let newSpellObjXp = workArr[targetInd].xp - 3;
              let allyXp = workArr[stunOfAlly].xp - 2;
              if(newSpellObjXp > 0) {
                workArr[targetInd] = {...workArr[targetInd], Y:workArr[stunOfAlly].Y, pY: workArr[targetInd].Y, pX: workArr[targetInd].X, xp: newSpellObjXp, stunned: 2}
              } else {
                deathFunc(targetInd)
                // workDeadArr.push(workArr[targetInd])
                // workArr.splice(targetInd, 1)
                // spellMap.push(workDeadPass)
              }
              if(allyXp > 0) {
                workArr[stunOfAlly] = {...workArr[stunOfAlly], xp: allyXp, stunned: 2}
              } else {
                deathFunc(stunOfAlly)
                // workDeadArr.push(workArr[stunOfAlly])
                // workArr.splice(stunOfAlly, 1)
                // spellMap.push(workDeadPass)
              }
            }
            let res = {
              me: newMe,
              partner: newPartner,
              rocks: rockArr,
              oldMe: newOldMe,
              oldPartner: newOldPartner,
              oldRocks: newOldRocks,
              fire: [],
              myVenom: [],
              partVenom: [],
              lightRed: false,
              inLightBySpell: [],
              args: {
                yPass: newY - y,
                sY: y - inAir.Y,
                sX: x - inAir.X,
                animeFunc: 'animeFunc',
                hideKnight: !gE ? !sources['inLight'].some(({newY, newX}) => inAir.Y === newY && inAir.X === newX) : false
              },
              spellMap
            }
            //debugger
            return res
            
          },   // Новые lightPos.. // Спелы противника это просто спел в другую сторону
          animeFunc: (payloadShow) => ({particles, knight, args: {yPass, sY, sX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {  
            // для мастера подгод под конкретное число, inAir известен...
            // setTimeout(() => {
            //   spellTo()
            // }, 3000);\
            // toHideAttackHeroIfNeed
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
            if(hideKnight || payloadShow) {
              opacityRedWrapper(
                (progress) => knight.current.style.opacity = 1-progress/100+'',
                () => {}
              )
              //console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`,animU.progress)
              //knight.current.style.opacity = 1-animU.progress/100;
            }
            //let workParticles = particles.slice(0, 3);
            let previewPromisses = [];
            let nextTickPromisses = [];
            let contentArr = [
              {
                smesX: 0,
                smesY: 1,
              },
              {
                smesX: 0.834,
                smesY: -0.5,
              },
              {
                smesX: -0.834,
                smesY: -0.5
              }
            ].forEach(({smesX, smesY}, i) => {
              
              particles[i].current.style.display = 'block'; 
              particles[i].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
              particles[i].current.style.width = '90px';
              //particles[i].current.style.height = '90px';
              //debugger
              const natSx = sX * 52,
              natSy = sY * 52,
              natSmesX = smesX * 52*2,
              natSmesY = smesY * 52*2;
              
              previewPromisses.push(
                new Promise((fResolve) => {
                anime({
                  targets: particles[i].current,
                  opacity: [0, 1],
                  translateY: [natSy+natSmesY, natSy], // from args (y-Y)*52
                  translateX: [natSx+natSmesX, natSx], // from args (x-X)*52
                  duration: 700,
                  easing: 'easeInOutQuad',
                  complete: anim1 => {
                    if(anim1.completed) {
                      fResolve(true)
                      // попутный opacityRed
                      nextTickPromisses.push(
                        new Promise((resolve) => {
                          anime({
                            targets: particles[i].current,
                            opacity: [1, 0], // real good news
                            translateY: [natSy+yPass*52, natSy+yPass*52+natSmesY],
                            translateX: [natSx, natSx+natSmesX],
                            duration: 700,
                            easing: 'easeInOutQuad',
                            complete: anim2 => {
                              if(anim2.completed) {
                                resolve(true)
                              }
                            }
                          })
                        })
                      ) 
                    }
                  }
                })
              }))
            })
            Promise.all(previewPromisses).then(() => {
              spellTo()
            })
            Promise.all(nextTickPromisses).then(() => {
              //killParticls here
              (hideKnight || payloadShow) && cleanAfterPartSpell()
            })

            //====================ATTACK_KNIGHT_PART==========================
          }
          //   //====================ATTACK_KNIGHT_PART_END======================

          //   particles[0].current.style.display = 'block'; // 
          //   particles[0].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
          //   particles[0].current.style.width = '90px';
          //   //particles[0].current.style.height = '30px';
          //   console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`)
            
          //   anime({
          //     targets: particles[0].current, //transition on timeline to zero in 60%
          //     translateY: [0, tY], // from args (y-Y)*52
          //     translateX: [0, tX], // from args (x-X)*52
          //     duration: 450,
          //     easing: 'easeInCirc',
          //     complete: anim1 => {  // may take 90% event
          //       if(anim1.completed) {  
          //         console.log('ISTIME')
          //         let resCheck = [];
          //         particles[0].current.style.opacity = 0;
          //         // применение изменений и конец анимаций через различные события
          //         let directions = [
          //           {ttY: 43, ttX: 43},
          //           {ttY: 43, ttX: -43},
          //           {ttY: -43, ttX: 43},
          //           {ttY: -43, ttX: -43},
          //         ]
          //         let promisses = particles.slice(1).map(({current}, i) => {
          //           let {ttY, ttX} = directions[i]
          //           current.style.display = 'block';
          //           current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
          //           current.style.width = '75px';
          //           return new Promise((resolve, reject) => {
          //             anime({
          //               targets: current,
          //               translateY: [tY, tY-ttY], // 0 --- last position of fireboll    
          //               translateX: [tX, tX-ttX],
          //               //rotateX: 
          //               duration: 500,
          //               easing: 'easeInOutCirc', //'spring(1, 90, 12, 0)'
          //               // update: anim => {
          //               //   current.style.opacity = 1-anim.progress/100+''
          //               //   console.log('UPDATE: ', anim.progress)
          //               // },
          //               complete: anim => {
          //                 if(anim.completed) {
          //                   resolve(true)
          //                 }
          //               }
          //             })
          //           })
          //         })
          //         Promise.all(promisses).then(() => {
          //           spellTo()
          //           opacityRedWrapper(
          //             (progress) => particles.slice(1).forEach(({current}) => current.style.opacity = 1-progress/100+''),
          //             () => {
          //               particles.forEach(({current}) => {
          //                 current.style.display = 'none';
          //                 current.style.transform = 'translateY(0px) translateX(0px)';
          //                 current.style.opacity = '1'
          //               })
          //             }
          //           ).then(() => (hideKnight || payloadShow) && cleanAfterPartSpell())
          //           //setTimeout(() => endSpell(), )
          //           //setTimeout(() => endSpell(), 1000)
          //         })
          //         console.log('%c%s', 'color: green' ,"AFTER_SHAKE",resCheck)
          //         // if(resCheck.length >= 4) {
          //         //   
          //         // }
                  
          //       }
          //     },
          //     update: anim => {
                
          //     }
          //   });
          // }  
        }     
      ]
    },  //   17, 9
    {
      id: 'WKnight3', 
      Y: 1, X: 9,
      pY: 1, pX: 9,
      xp: 12,
      oldXp: 12,
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
        cost: 4,
        src: 'https://images.freeimages.com/images/large-previews/bb2/bottle-beer-detail-1-1193177.jpg',
        effect: ({id, sources, Y, X, pathBuilder})  => {
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
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 1, postDmg: 9, color: {r: 39, g: 202, b: 126}, src: ''}))
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
        cost: 3,
        dammage: 3,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Red_Army_flag.svg/1200px-Red_Army_flag.svg.png',
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
          src: 'https://media.gettyimages.com/photos/agave-leaves-in-trendy-pastel-neon-colors-picture-id909651510?b=1&k=6&m=909651510&s=170x170&h=XAF-ICpH7Ub5-cxOhv5d8jZXA_DXor9oROviyMJ6wKk=',
          cost: 4,
          dopDirs: [],
          blockDirs: ['me'],
          ignore: ['rocks'],
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
          func: ({inAir, payload: {y, x}, sources, target, who, pathBuilder}) => { 
            //inLight in source partInLight also
            let gE = who === 'me', 
            targetInd = null,
            meArr = sources.me.slice(),
            partArr = sources.partner.slice(),
            rockArr = sources.rocks.slice(),
            newOldPartner = [],
            newOldMe = [],
            newOldRocks = [],
            spellMap = [],
            workArr = gE ? partArr : meArr,
            allyArr = gE ? meArr : partArr,
            workLightArr = gE ? sources.inLight : sources.partInLight,
            deadArr = gE ? newOldPartner : newOldMe,
            animeFunc;
            
            let meInd;
            allyArr.forEach(({id}, ind) => {
              if(inAir.id === id) {
                meInd = ind
              }
            })
            
            //debugger
            workArr.forEach(({Y, X},i) => {
              if (Y === y && X === x) {
                targetInd = i
              }
            })
            let clickOnLight = workLightArr.some(({newY, newX}) => newY === y && newX === x)
            const makeBlink = () => {
              allyArr[meInd] = {...inAir, Y: y, X: x, pX: inAir.X, pY: inAir.Y};
            };
     
            if(targetInd !== null) {
              if(!clickOnLight) {
                // ultimateBlow
                makeBlink();
                deadArr.push(workArr[targetInd]);
                workArr.splice(targetInd, 1);
                spellMap = spellMap.concat(['me', gE ? 'oldPartner' : 'oldMe', 'partner']);
                //animeFunc = 'mortalBlow';
              } else {
                allyArr[meInd] = {...inAir, xp: inAir.xp+5};
                let resXp = workArr[targetInd].xp - 5;
                spellMap = spellMap.concat(['me', 'partner']);
                //debugger
                if(resXp > 0) {
                  workArr[targetInd] = {...workArr[targetInd], xp: resXp};
                } else {
                  spellMap = spellMap.push(gE ? 'oldPartner' : 'oldMe');
                  deadArr.push(workArr[targetInd]);
                  makeBlink();
                }
                // takeXp and may be kill
              }
            } else {
              spellMap.push(gE ? 'me' : 'partner')
              makeBlink()
              // just blink
            }
            
            let res = {
              me: meArr,
              partner: partArr,
              rocks: rockArr,
              oldMe: newOldMe,
              oldPartner: newOldPartner,
              oldRocks: newOldRocks,
              fire: [],
              myVenom: [],
              partVenom: [],
              lightRed: false,
              inLightBySpell: [],
              args: {
                //yPass: newY - y,
                //sY: y - inAir.Y,
                //sX: x - inAir.X,
                animeFunc: 'animeFunc',
                hideKnight: !gE ? !sources['inLight'].some(({newY, newX}) => inAir.Y === newY && inAir.X === newX) : false
              },
              spellMap
            };
            //debugger
            return res;
            
          },   // Новые lightPos.. 
          animeFunc: (payloadShow) => ({particles, knight, args: {tY, tX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {
            setTimeout(spellTo, 1200)
          }
        }     // Спелы противника это просто спел в другую сторону
      ]
    },
    {
      id: 'WKnight4', 
      Y: 15, X: 9,
      pY: 15, pX: 9,
      xp: 12,
      oldXp: 12,
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
        cost: 2,
        src: 'https://images.freeimages.com/images/large-previews/bb2/bottle-beer-detail-1-1193177.jpg',
        effect: ({id, sources, Y, X, pathBuilder}) => {
          // sources = {me, part, rocks, fire}
          
          const {fire, partner} = sources;
          let sumLight = [];
          // ===============LIGHT_DATA_FOR_BUILDER===================
          const dopDirs = ['partner'], // mustBe in future
          blockDirs = ['me', 'rocks'],
          ignore = [],
          dirs = [
            {xDir:1, yDir: 0, pathLenght:1},
            {xDir:-1, yDir: 0, pathLenght:1},
            {xDir:0, yDir: 1, pathLenght:1},
            {xDir:0, yDir: -1, pathLenght:1},
          ];
          // ===============LIGHT_DATA_FOR_BUILDER====================
          fire.forEach(burn => {
            if(!!burn.dls) {
              const {newY, newX} = burn;
              let {name, owner} = burn.dls;
              if(owner === id) {
                let realPath = [{newY, newX}];
                dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, realPath, sources, dopDirs, blockDirs,ignore, newY, newX, []));
                sumLight = sumLight.concat(realPath)
              }
            }
          })
          partner.forEach(({Y, X, buffs}) => {
            let buffInd = null;
            buffs.forEach(({owner}, b) => {
              if(owner === id) {
                buffInd = b;
              }
            })
            if(buffInd !== null) {
              let partRealPath = [{newY: Y, newX: X}];
              dirs.forEach(({yDir, xDir, pathLenght}) => pathBuilder(yDir, xDir, pathLenght, partRealPath, sources, dopDirs, blockDirs,ignore, Y, X, []));
              sumLight = sumLight.concat(partRealPath)
            }
          })
         // debugger
          return {
            dlsVenome: [],
            dlsLight: sumLight,
          }   
        },
        dopDirs: ['partner'],
        blockDirs: ['me', 'rocks'],
        ignore: [],
        dirs: [
          {xDir:1, yDir:1, pathLenght:7},
          {xDir:1, yDir:-1, pathLenght:7},
          //{xDir:1, yDir: 0, pathLenght:4},
          {xDir:-1, yDir:-1, pathLenght:7},
          {xDir:-1, yDir:1, pathLenght:7},
          //{xDir:-1, yDir: 0, pathLenght:4},
          //{xDir:0, yDir: 1, pathLenght:4},
          //{xDir:0, yDir: -1, pathLenght:4},
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
      },
      attack: {
        cost: 2, 
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Red_Army_flag.svg/1200px-Red_Army_flag.svg.png',
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
          id: 'StickyEyes',
          icon: 'E',
          target: 'partner',
          src: 'https://lh3.googleusercontent.com/proxy/NqMKquCP2I_RFId3v0kpdI-HPKAzdiP4kD0oIMr1OmTjiCdH0n95YTQ9u9G59IAAqc7t0q7d9H-GVnh2CUpt0bfUPW5VYgKzw5MjXwU6DQ',
          color: {r: 58, g: 201, b: 211},
          cost: 3,
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
          func: ({inAir, payload: {y, x}, sources, target, who, pathBuilder}) => { 
            //inLight in source partInLight also
            // поставить вард??? если тап по 
            let gE = who === 'me', 
            targetInd = null,
            meArr = sources.me.slice(),
            partArr = sources.partner.slice(),
            rockArr = sources.rocks.slice(),
            newOldPartner = [],
            newOldMe = [],
            newOldRocks = [],
            spellMap = [],
            newFire = [], // гора id
            workArr = gE ? partArr : meArr,
            // allyArr = gE ? meArr : partArr,
            // workLightArr = gE ? sources.inLight : sources.partInLight,
            // deadArr = gE ? newOldPartner : newOldMe,
            animeFunc;
            
            // let meInd;
            // allyArr.forEach(({id}, ind) => {
            //   if(inAir.id === id) {
            //     meInd = ind
            //   }
            // })
            const getReduceVisibility = (baseVisib) => {
              // makeMoreComplex in future
              //let workPass = baseVisib.slice()
              let newDirs = baseVisib.dirs.map(({xDir, yDir, pathLenght}) => {
                let modX = Math.abs(xDir);
                let modY = Math.abs(yDir);
                let gC = (modX + modY) <= 2;
                return {xDir, yDir, pathLenght: gC ? pathLenght-1 : pathLenght}
              })
              return {
                ...baseVisib,
                dirs: newDirs
              }
            };
            // //debugger
            workArr.forEach(({Y, X},i) => {
              if (Y === y && X === x) {
                targetInd = i
              }
            })
            if(targetInd !== null) {
              // buff partner
              spellMap.push(gE ? 'partner' : 'me');
              workArr[targetInd] = {...workArr[targetInd], 
                visibility: getReduceVisibility(workArr[targetInd].visibility),
                buffs: workArr[targetInd].buffs.concat(
                  {name: 'stickyEyes', time: 5, owner: inAir.id, 
                  changed: {visibility: workArr[targetInd].visibility}}) 
              }
            } else {
              // setUp vard
              spellMap.push('fire')
              newFire.push({newX: x, newY: y, time: 3,
                color: {r: 244,g: 164,b: 96},
                src: 'vardSrc',
                dls: {
                name: 'realVard',
                owner: inAir.id,
              }}) // vards throw move, 
            }
            let res = {
              me: meArr,
              partner: partArr,
              rocks: rockArr,
              oldMe: newOldMe,
              oldPartner: newOldPartner,
              oldRocks: newOldRocks,
              fire: newFire,
              myVenom: [],
              partVenom: [],
              lightRed: false,
              inLightBySpell: [],
              args: {
                //yPass: newY - y,
                //sY: y - inAir.Y,
                //sX: x - inAir.X,
                animeFunc: 'animeFunc',
                hideKnight: !gE ? !sources['inLight'].some(({newY, newX}) => inAir.Y === newY && inAir.X === newX) : false
              },
              spellMap
            };
            //debugger
            return res;
            
          },   // Новые lightPos.. 
          animeFunc: (payloadShow) => ({particles, knight, args: {tY, tX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {
            setTimeout(spellTo, 1200)
          }
        }     // Спелы противника это просто спел в другую сторону
      ]
    }
  ], // after reduc func ++
  partner: [
    {
      id: 'DKnight1',
      Y:2, X:9,
      pY: 2, pX: 9,
      xp: 12,
      oldXp: 12,
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
        cost: 3,
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
          newVenome = newVenome.map(({...staff}) => ({...staff, time: 1, postDmg: 9, color: {r: 95, g: 255, b: 202}, src: ''})) //(95, 255, 202)
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
        cost: 3,
        dammage: 9,
        type: 'melee', //range and magic //mele
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
          cost: 3,
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
            //debugger
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
              let workDeadArr = gE ? newOldPartner : newOldMe;
              newFire.forEach(({newY, newX}, fi) => { 
                workArr.forEach(({Y, X}, i) => {
                  if(newY === Y && newX === X) {
                    let newXp = workArr[i].xp - 6;
                    if(newXp > 0) {
                      workArr[i].xp = newXp
                      workArr[i].v = Math.random()
                      if(!spellMap.some(name => name === workArrPass)) {
                        spellMap.push(workArrPass)
                      }
                    } else {
                      //console.log('%c%s', 'color: darkgreen; font-size: 33px', 'DEAD_ELEMENT:',workArr[i])
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
              //console.log('%c%s', 'color: red; font-size: 50', 'FIREBOLL_RES:', firebol_res)
              return firebol_res
          },

          animeFunc:(payloadShow) => ({particles, knight, args: {tY, tX, hideKnight}, anime, spellTo, cleanAfterPartSpell}) => {  
            // для мастера подгод под конкретное число, inAir известен...
            particles[0].current.style.display = 'block'; // 
            particles[0].current.src = 'data:image/png;base64,'+window.localStorage.Fireboll+'';
            particles[0].current.style.width = '90px';
            //particles[0].current.style.height = '30px';
            //console.log('%c%s', 'color: chocolate; font-size: 33px;', `INSIDE_UPDATE: hide:${hideKnight}`)
            if(hideKnight || payloadShow) {
              anime({
                targets: knight.current,
                opacity: [1, 0],
                duration: 1600,
                easing: 'easeInOutCirc'
              })
            }
            anime({
              targets: particles[0].current, //transition on timeline to zero in 60%
              translateY: [0, tY], // from args (y-Y)*52
              translateX: [0, tX], // from args (x-X)*52
              duration: 450,
              easing: 'easeInCirc',
              complete: anim1 => {  // may take 90% event
                if(anim1.completed) {  
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
                    Promise.all(
                      particles.slice(1).map(({current}) => {
                        return new Promise(resolve => {
                          anime({
                            targets: current,
                            opacity: [1, 0],
                            duration: 777,
                            easing: 'easeInOutCirc',
                            complete: anim2 => {
                              if(anim2.completed) {
                                resolve(true)
                              }
                            }
                          })
                        })
                      })
                    ).then(() => {
                      //debugger
                      particles.forEach(({current}) => {
                        //console.log('%c%s','color: lightblue; font-size: 44px', 'INSIDE_ANIME_FUNC_CURRENT', typeof current.style.transform)
                        current.style.display = 'none';
                        current.style.transform = 'translateY(0px) translateX(0px)';
                        current.style.opacity = '1'
                      });
                      (hideKnight || payloadShow) && cleanAfterPartSpell();
                    })
                  })
                }
              }
            });
          }
        }
    ]
  }], // AM
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
  inLightBySpell: [],
  myDeadBoys: [],
  partDeadBoys: [],
  partInLight: [],
  energy: 10,
  oldEnergy: 10,
  whoseMove: 'my', 
  greatStore: [], //allHeroes without modify, get his with socket request; // FS
  myHeroList: [0, 1, 2, 3], //FS
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
    case 'END_TURN': {
      return {
        ...state, // workWithEnergy
        whoseMove: 'partner',
        energy: state.energy < 0 ? 0 : state.energy,
      }
    }
    case 'START_MY_TURN': {
      return {
        ...state,
        energy: state.energy+payload.energy,
        whoseMove: 'me'
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
    case 'DELETE_DEAD_BOYS': 
      //const mADDB = state.me.filter(({id}) => !myDeadBoys.some(({id: ID}) => id === ID)),
      //pADDB = state.part.filter(({id}) => !partDeadBoys.some(({id: ID}) => id === ID))
      //lADDB = getLightPosition(mADDB, pADDB, state.rocks)
      return {
        ...state,
        me: state.meWDB,
        partner: state.partWDB,
        inLight: state.inLightWDB,
        newInLight: getNewInLight(state.inLight, state.inLightWDB),
        oldInLight: getOldInLight(state.inLight, state.inLightWDB),
        myDeadBoys: [],
        partDeadBoys: [],
        partWDB: [],
        meWDB: [],
        oldMe: state.myDeadBoys,
        oldPartner: state.partDeadBoys,
        updateSign: 'F'+Math.random()
      }
    case 'KNIGHT:UPDATE_OLD_XP': 
      return {
        ...state,
        me: payload.isPartner ? state.me : updateOldXp(state.me, payload.knightInd),
        partner: payload.isPartner ? updateOldXp(state.partner, payload.knightInd) : state.partner,
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
      //let sources = {rocks: state.rocks, me: newMe, partner: state.partner}
      //let r = getDlsData({ sources, pathBuilder})
      //let allLightPos = getLightPosition(newMe, state.partner, state.rocks)
      //newPartner
      return updateBaseStep(
        updateVenomStep({ // // for what, i don't know 
          data: {
            ...state, 
            me: newMe,
            inAir: null,
            canMove: [],
            oldCanMove: state.canMove,
            //inLight: allLightPos,
            //newInLight: getNewInLight(state.inLight, allLightPos),
            //oldInLight: getOldInLight(state.inLight, allLightPos), // точечная перерисовка, если траблы с опти
            animeMove: null, 
            myVenom: state.myVenom,
            partVenom: state.partVenom,
            updateSign: 'M'+Math.random(),
          },
          state
        }))
    case 'KNIGHT:ANIME_MOVE':
      // payload = {x, y, isDrag}
      // cost from state.inAir
      // inAir is fullVolums
      return {
        ...state,
        canMove: [],
        oldCanMove: state.canMove.length !== 0 ? state.canMove : [],
        animeMove: !payload.isDrag ? {id:state.inAir.id, y: payload.y, x: payload.x} : null,
        workPayload: {inAir: state.inAir, payload, me: true, cause: 'move', spellInd: null },
        updateSign: 'D'+Math.random()
      }
    case 'KNIGHT:LAST_PREPARATION':
      //console.log('LOO0000000000000000K_AT_THIS_STATE:', state)
      let previewLight = getLightPosition(state.me, state.partner, state.rocks, 'me')
      // prepare partner positions
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
      // console.log(`BIIIIIIIIIIIIIIIG PREPARE DLS: ${dls} PASS:`, pass)
      // console.log(state.canSpell.length === 0 && pass === 'SPELL')
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
      // payload = {y, x, aim(rock/partner)}
      //cost from state.inAir.attack.cost 
      return {
        ...state,
        canAttack: [],
        oldCanAttack: state.canAttack.length !== 0 ? state.canAttack : [],
        animeAttack: {id:state.inAir.id, y: payload.y, x: payload.x, type: state.inAir.attack.type},
        workPayload: {inAir: state.inAir, payload, me: true, cause: 'attack', spellInd: null},
        updateSign: 'D'+Math.random()
      }
    case 'PARTNER:START_ATTACK': //def in up level
    // const {id, aim: me } = payload aim === 'me'
    let pAO; //cost from state.inAir.attack.cost 
      state.partner.forEach(({id}, i) => {
        if(id === payload.id) {
          pAO = state.partner[i]
        }
      })
      let showFlag = !state.inLight.some(({newX, newY}) => pAO.X === newX && pAO.Y === newY);
      //console.log('%c%s', 'color: aquamarine; font-size: 22px;','THAT_PO:', pO)
      //=== купить $taff ===//
      //console.log('%c%s', 'color: aquamarine; font-size: 22px;','THAT_PSR:', pSR)
      let pAP = {inAir: pAO, payload: {x: payload.x, y: payload.y, aim: payload.aim}, me: false, cause: 'move', spellInd: null}
      return payload.withAnime ? {
        ...state,
          animeAttack: {id:pAO.id, y: payload.y, x: payload.x, type: pAO.attack.type},
          showOnSecond: showFlag ? {fX: pAO.X, fY: pAO.Y} : null, //if show else dead
          workPayload: pAP,
          updateSign: 'H'+Math.random()
        } : {
        ...state,
        workPayload: pAP
      }
    case 'KNIGHT:ATTACK_TO': // будет вызываться нескольколько раЗ, если необходимо, АУЕ
      // const {who: 'me'/'partner'}  = payload
      //debugger

      let {y, x, aim} = state.workPayload.payload; // refactory this
      // aim сущест. для того что бы не делать лишнии фильтры и отсеивать аттаки в пустоту..
      let partnerRes = !payload ? findAndKill(state.partner, y, x, aim, 'partner', state.inAir) : {res: state.partner, target: []};
      let rocksRes = findAndKill(state.rocks, y, x, aim, 'rocks', !payload ? state.inAir : state.workPayload.inAir);
      let meRes = payload ? findAndKill(state.me, y, x, aim, 'me', state.workPayload.inAir) : {res: state.me, target: []};
      // буст от аттаки inAir'а
      //const attackSources = {rocks: rocksRes.res, me: meRes.res, partner: partnerRes.res} // Эта длс для камня.. если кто - либо рипает преграду dls lightу
      //let attackR = getDlsData({ sources: attackSources, pathBuilder})
      //let allLightPosAfterMurder = getLightPosition(meRes.res, partnerRes.res, rocksRes.res).concat(attackR.sumDlsLight)
      //debugger
      return updateBaseStep(
        updateVenomStep({
        data: {
          ...state,
          partner: partnerRes.res,
          rocks: rocksRes.res,
          me: meRes.res,
          oldPartner: partnerRes.target,
          oldRocks: rocksRes.target,
          oldMe: meRes.target,
          showOnSecond: null,
          oldShowOnSecond: state.showOnSecond,
          attackDls: [], // person effect after attack
          // canAttack: [],
          // oldCanAttack: state.canAttack,
          //inLight: allLightPosAfterMurder,
          //newInLight: getNewInLight(state.inLight, allLightPosAfterMurder),
          //oldInLight: getOldInLight(state.inLight, allLightPosAfterMurder),
          //myVenom: state.myVenom,
          //partVenom: state.partVenom,
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
      let kamikSource = {rocks: state.rocks, me: updatedMe, partner: updatedPartner, fire: state.fire}
      let kamikR = getDlsData({ sources: kamikSource, pathBuilder})
      
      let allLightPosAfterKamick = getLightPosition(updatedMe, updatedPartner, state.rocks, "me").concat(kamikR.sumDlsLight)
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
      let pSO = pO.spells[payload.spellInd] //and from here
      let pSR = pSO.func({
        inAir: pO,
        payload: {x: payload.x, y: payload.y},
        sources: {me: state.me, partner: state.partner, rocks: state.rocks, inLight: state.inLight, partInLight: state.partInLight},
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
      let spellObj = state.inAir.spells[state.spellInd]; //take cost from here
      let spellRes = spellObj.func( // modify this... using call..
        { 
          inAir: state.inAir,
          payload, // {y, x}
          sources: {me: state.me, partner: state.partner, rocks: state.rocks, inLight: state.inLight, partInLight: state.partInLight}, 
          target: spellObj.target, 
          who: 'me',
          pathBuilder
        }) //target enemy, me, rock
      return {
        ...state,
        spellAnimations: {
          animeFunc: spellObj.animeFunc(false), 
          animeArg: spellRes.args,
          // particles: spellObj.particles,
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
      //let spellSources = {rocks: spellCashRes.rocks, me: spellCashRes.me, partner: spellCashRes.partner}
      //let sDD = getDlsData({ sources: spellSources, pathBuilder})
      // абсолютный источник света
      //console.log('%c%s','color: red; font-size: 24px;','DLS_DATA_VENOM:', sDD.sumDlsMyVenom)
      //let newBaseLight = getLightPosition(spellCashRes.me, spellCashRes.partner, spellCashRes.rocks)
      //console.log('%c%s', 'color:tomato; font-size: 33px;', 'NEW_BASE_LIGHT:',newBaseLight)
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
          myVenom: state.myVenom.concat(spellCashRes.myVenom),
          partVenom: state.partVenom.concat(spellCashRes.partVenom),
          spellMap: spellCashRes.spellMap,
          inLightBySpell: spellCashRes.inLightBySpell,
          //newInLight: spellCashRes.lightRed ? getNewInLight(state.inLight, allLightPosAfterSpell) : getNewInLight(state.inLight, newBaseLight),
          //oldInLight: spellCashRes.lightRed ? getOldInLight(state.inLight, allLightPosAfterSpell) : getOldInLight(state.inLight, newBaseLight),
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
    // только пришедшие // 2 getDlsData печалена..
    const sDDB = getDlsData({sources: {rocks: data.rocks, me: data.me, partner: data.partner, fire: data.fire}, pathBuilder}),
    survMyVenom = updateSpells(data.myVenom ? data.myVenom : state.myVenom),
    survPartVenom = updateSpells((data.partVenom ? data.partVenom : state.partVenom)),
    newPartVenom = survPartVenom.res.concat(sDDB.sumDlsPartVenom),
    newMyVenom = survMyVenom.res.concat(sDDB.sumDlsMyVenom),
    afterClickPartner = updateGameStats(data.partner ? data.partner : state.partner, newMyVenom),
    afterClickMe = updateGameStats(data.me ? data.me : state.me, newPartVenom),
    newFire = updateSpells(data.fire ? data.fire : state.fire);
    //debugger
    // getDls ({ rocks, me, partner})
    // console.log('NEW_FIRE:', newFire.res)
    // target in deadboys
    // ==============LIGHT_PART_WITH_DEADBOYS===================================
    let sDD = getDlsData({sources: {rocks: data.rocks, me: afterClickMe.res, partner: afterClickPartner.res, fire: newFire.res}, pathBuilder})
    let newInLight = getLightPosition(afterClickMe.res, afterClickPartner.res, data.rocks, 'me')
    let dirtyLightSum = newInLight.concat(sDD.sumDlsLight).concat(data.inLightBySpell)
    //console.log('%c%s', 'color: green; font-size: 33px;', 'BEFORE_FILTER:', dirtyLightSum)
    let cleanLightSum = dirtyLightSum; //lightFilter(dirtyLightSum);
    // ==============LIGHT_PART_WITH_DEADBOYS===================================
    let myDeadBoys = afterClickMe.dead; // they will die after 1.3 sec
    let partDeadBoys = afterClickPartner.dead;
    // ==============LIGHT_PART_WITHOUT_DEADBOYS=================================
    let meWDB = afterClickMe.res.filter(({id}) => !myDeadBoys.some(({id: ID}) => id === ID))
    let partWDB = afterClickPartner.res.filter(({id}) => !partDeadBoys.some(({id: ID}) => id === ID))
    let sDDWDB = getDlsData({sources: {rocks: data.rocks, me: meWDB, partner: partWDB, fire: newFire.res}, pathBuilder})
    let newInLightWDB = getLightPosition(meWDB, partWDB, data.rocks, 'me')
    let dirtyLightSumWDB = newInLightWDB.concat(sDDWDB.sumDlsLight).concat(data.inLightBySpell)
    let cleanLightSumWDB = dirtyLightSumWDB
    // ==============PARTNER_PART================================================
    let newPartInLight = getLightPosition(meWDB, partWDB, data.rocks, 'partner').concat(sDDWDB.sumDlsPartLight) // .concat(data.inLightBySpell)
    //!!!IMPORTANT: check workPayload.inAir and side ===> concat inLightBySpell or not
    //debugger
    // ==============LIGHT_PART_WITHOUT_DEADBOYS=================================
    let getNewSpellMap = () => {
      //debugger
      if(data.spellMap) {
        let newSpellMap = data.spellMap;
        [
          {
            workArr: survMyVenom,
            pushPass: 'oldMyVenom',
            pass: 'dead'
          },
          {
            workArr: survPartVenom,
            pushPass: 'oldPartVenom',
            pass: 'dead'
          },
          {
            workArr: newFire,
            pushPass: 'oldFire',
            pass: 'dead'
          },
          // {
          //   workArr: afterClickMe,
          //   pushPass: 'oldMe',
          //   pass: 'dead'
          // },
          // {
          //   workArr: afterClickPartner,
          //   pushPass: 'oldPartner',
          //   pass: 'dead'
          // },
          {
            workArr: survMyVenom,
            pushPass: 'myVenom',
            pass: 'res'
          },
          {
            workArr: survPartVenom,
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
    //oldPartner:data.oldPartner,
    //oldMe:data.oldMe,
    oldFire: newFire.dead,
    inLight: cleanLightSum,
    newInLight: getNewInLight(state.inLight, cleanLightSum),
    oldInLight: getOldInLight(state.inLight, cleanLightSum),
    partInLight: newPartInLight,
    fire: newFire.res,
    oldMyVenom: survMyVenom.dead,
    oldPartVenom: survPartVenom.dead,
    partVenom: newPartVenom,
    myVenom: newMyVenom,
    myDeadBoys,
    partDeadBoys,
    inLightWDB: cleanLightSumWDB,
    partWDB,
    meWDB,
    spellMap: getNewSpellMap()
  }
}
// вызывается если есть совпадения 
const preparePartnerAnimeMove = ({id, y, x, fY, fX}, inLight, state) => {
  //debugger
  let res = {} //fY and fX may take from state[id]
  let workPartner = {}
    state.partner.forEach(({id:pID}, i) => {
      if(pID === id) {
        workPartner = state.partner[i]
      }
    })
  //const { fY, fX } = workPartner
  let workPayload = {inAir: workPartner, payload: {y, x}, me: false, cause: 'move', spellInd: null}
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
  //let partMoveSource = {rocks: state.rocks, me: state.me, partner: newPartner}
  //let partMoveR = getDlsData({ sources: partMoveSource, pathBuilder})
  //const lightPosAfterPartnerMove = getLightPosition(state.me, newPartner, state.rocks, 'me').concat(partMoveR.sumDlsLight)
  //console.log('LIGHT_POS_AFTER_PARTNER_MOVE:',lightPosAfterPartnerMove)
  
  return updateBaseStep(
    updateVenomStep({
      data:
      {
        ...state,
        partner: newPartner, 
        //inLight: lightPosAfterPartnerMove,
        //myVenom: state.myVenom,
        //partVenom: state.partVenom,
        //newInLight: getNewInLight(state.inLight, lightPosAfterPartnerMove),
        //oldInLight: getOldInLight(state.inLight, lightPosAfterPartnerMove),
        animeMove: null,
        moveFromShadow: null,
        oldMoveFromShadow: state.moveFromShadow,
        updateSign: 'W'
      }, 
      state //workPayload inside insert in
    }))
}

const updateGameStats = (workArr, venomArr) => {
  //debugger
  let res = workArr.slice()
  let dead = []
  //console.log('UPDATE_GAME_STATE:VENOME:',venomArr)
  
    res.forEach(({Y, X, stunned, buffs}, i) => {
      //=========BUFFS_PART==========
      if(buffs.length > 0) {
        buffs.forEach(({time, changed}, b) => {
          let newBuffTime = time-1;
          if(newBuffTime > 0) {
            res[i].buffs[b].time = newBuffTime;
          } else {
            //let changeObj = res[i].buffs[b].changed
            for(let prop in changed) {
              res[i][prop] = changed[prop]
            }
            res[i].buffs.splice(b, 1);
          }
        })
      }
      //=========BUFFS_PART==========
      venomArr.forEach(({newY, newX, postDmg}) => {
      if(newY === Y && newX === X) {
        let newXp = res[i].xp - postDmg
        if(newXp < 0) {
          dead.push(res[i]) // место что бы вешать на них крест.
          res[i].xp = newXp // flat for css filter to stay gray
          //res.splice(i, 1)
        } else {
          res[i].xp = newXp
          res[i].v = Math.random()
        }
      }
    })
  })
  return {res, dead}
}

const updateBaseStep = (data) => { // me is boolean
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
  let partnerAfterStun = stunUpdater(data.partner);
  let newStateHistory = [].concat(data.stateHistory); // допушиваем старый stateHistory и делаем новый view

  let newAct = data.act;
  let newEnergy = data.energy - (cause !== 'spell' ? inAir[cause].cost : inAir.spells[spellInd].cost);
  //let newTick = data.actTick+1;
  let lastHistory = newStateHistory.length - 1;
  let actionsPass = {me, inAir, type: cause, payload, spellInd};
  // if(newTick > data.maxTick - 1) { // TO ANOTHER EVENT THAT AFTER TURN END
  //   //newTick = 0;
  //   newAct = newAct+1;
  //   newStateHistory[lastHistory].actions.push(actionsPass)
  //   newStateHistory.push({
  //     me: meAfterStun,
  //     partner: partnerAfterStun,
  //     rocks: data.rocks,
  //     fire: data.fire, // just flash
  //     myVenom: data.myVenom,
  //     partVenom: data.partVenom,
  //     inLight: data.inLight,
  //     treasures: data.treasures,
  //     myTreasures: data.myTreasures,
  //     actions: []
  //   })
  //   //push newAct
  // } else {
  newStateHistory[lastHistory].actions.push(actionsPass)
  

  let res = {
    ...data,
    me: meAfterStun,
    partner: partnerAfterStun,
    stateHistory: newStateHistory,
    act: newAct,
    //actTick: newTick,
    energy: newEnergy
  }
  //console.log('UPDATE_BASE_STEP:', res)
  return res
}

const updateSpells = workArr => {
  //console.log('UPDATE_SPELLS:',workArr)
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
  let ignoreHaveRocks = ignore.some(name => name === 'rocks')
  const rockInclude = ({y, x}) => mainSource['rocks'].some(({Y, X}) => y === Y && x === X)
  const pusher = (newPlace) => {
    let modYDir = Math.abs(yDir);
    let modXDir = Math.abs(xDir);
    let isEmptyPlace = [true]
    const passFunc = () => modYDir+modXDir <=2 ? realPath.push(newPlace) : misses.push(newPlace)
    const checkPaths = (workArr, permit, igno, enlarge) => {
      workArr.forEach((name) => {
        if(modYDir === modXDir && !ignoreHaveRocks
            && rockInclude({y:newPlace.newY-yDir, x:newPlace.newX}) 
                && rockInclude({y:newPlace.newY, x:newPlace.newX-xDir})) { // check on diagon
                  ripFlag = false
                  isEmptyPlace[0] = false
                
      
        } else { // встреча с чем то..
          if(mainSource[name].some(({Y, X}) => Y === newPlace.newY && X === newPlace.newX)) {
            if(!igno) {
              ripFlag = false
            }
            permit && passFunc() // add dop dist for attack 
            isEmptyPlace[0] = false
          }
        }
      })
    }
    //console.log('DEEEEEEEEEEEEEEEEEEEEBBBBBBBBBAAAG 2222:', block)
    checkPaths(dop, true, false)
    checkPaths(block, false, false)
    checkPaths(ignore, false, true)
    //checkPaths(enlarge, true, true, true)
    //yDir === -1 && xDir === 1 && console.log('%c%s', 'font: 1.3rem/1 Georgia bold; color: gold', `ENLARGE_HANDL: COUNT: ${counter} and flag: ${ripFlag}, isEmpty: ${isEmptyPlace[0]}`, newPlace )
    isEmptyPlace[0] && passFunc()

  }
  // if(yDir === -1 && xDir === 1) {
  //   console.log('%c%s', 'color: green; font: 1.3rem/1', `SIGNALL: flag ${ripFlag}, counter: ${counter}`,{yDir, xDir})
  // }
  while(ripFlag && counter) {
    //console.log('do THIS', counter)
    counter--;  // Здесь обитает баг, если counter больше 4, то можем уйти на пративоположную сторону, где происходят ужасные вещи...
    newPlace = {newY: newPlace.newY + yDir, newX: newPlace.newX + xDir}

    if(newPlace.newY <= 17 && newPlace.newX >= 0 && newPlace.newY >= 0 && newPlace.newX <= 17) {
      //console.log('Alive')
      let checkX = newPlace.newX;
      let checkY = newPlace.newY;
      const checkTab = (x, y, left) => {
        let workX = left ? x : (17-x)
        let maxY = 12+workX;
        let minY = 5-workX;
        return y <= maxY && y >= minY;
      }
      // const rightTabCheck = (x, y) => {
      //   let maxY = 12+(17-x);
      //   let minY = 5-(17-x);
      // }

      if(checkX >= 0 && checkX <= 4) {
        checkTab(checkX, checkY, true) && pusher(newPlace);
      } else if(checkX >= 13 && checkX <= 17) {
        checkTab(checkX, checkY, false) && pusher(newPlace);
      } else {
        pusher(newPlace) // or ripFlag?
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

const fillTheGaps = (yDir, xDir, realPath, Y, X, misses) => { // changeThat
  
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

const getLightPosition = (me, partner, rocks, who) => {
  let realPath = []
  let misses = []
  let mainSource = {me, partner, rocks}  // можно сыграть от последовательности...
  let workArr = who === 'me' ? me : partner;
  workArr.forEach(({Y, X, visibility}, i) => {
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
  //console.log(`REDUCER INNNNNNNNNNNNNNSA THAT_TRY_FIND: ${id} _index: ${index}, Staff:`,staff)
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