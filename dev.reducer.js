import store from '../index'
// ПЕРВАЯ ЗАПОВЕДЬ СПЕЛЛОВ: НЕЛЬЗЯ РЕДАЧИТЬ ГЕРОЯ, КОТОРЫЙ ДРОПНУЛ СПЕЛ ИЛИ КЛЕТКУ НА КОТОРОЙ СТОИТ ГЕРОЙ, ЕСЛИ У СПЕЛА ЕСТЬ АФТЕР ЭФФЕКТЫ. (можно)
// СОБЫТИЕ: START_СОБЫТИЯ (createCash, wp) --> СОБЫТИЕ_TO
// develop edition 

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
              // console.log('LAST_COMPAR:',newPartner, newFire) 
              newFire.forEach(({newY, newX}, fi) => {
                newPartner.forEach(({Y, X}, i) => {
                  if(newY === Y && newX === X) {
                    let newXp = newPartner[i].xp - 6;
                    if(newXp > 0) {
                      console.log('TAAAAAAAAAAAAAAAAKE ITTTTT: ',)
                      newPartner[i].xp = newXp
                      if(!spellMap.some(name => name === 'partner')) {
                        spellMap.push('partner')
                      }
                    } else {
                      newPartner.splice(i, 1);
                      newOldPartner.push(newPartner[i]);
                      if(spellMap.some(name => name === 'oldPartner')) {
                        spellMap.push('oldPartner')
                      }
                    }
                  }
                })
                newFire[fi].time = 1;
                newFire[fi].postDmg = 0;
                newFire[fi].color = {r: 150, g: 0, b: 24};
                newFire[fi].src = '';
              })
              console.log('PREV_RES_PARTNER:',newPartner)
              let firebol_res = {
                me: sources.me,
                partner: newPartner,
                rocks: sources.rocks,
                oldMe: [],
                oldPartner: newOldPartner,
                oldRocks: null,
                fire: newFire,
                venom: [],
                lightRed: false,
                inLightBySpell: [],
                spellMap
              }
              console.log('%c%s', 'color: red; font-size: 50', 'FIREBOLL_RES:', firebol_res)
              return firebol_res
            } else {

            }
          },  // Новые lightPos.. // Спелы противника это просто спел в другую сторону
          // Анимации делают, все тоже, что и reducer, maxSinx
          animeFunc: ({particles, knight, args, anime, spellTo, endSpell}) => {
            console.log('PARTICLES:', particles)
            particles[0].current.style.opacity = 1;
            particles[0].current.src = 'data:image/png;base64,'+window.localStorage.mainSrc+'';
            particles[0].current.style.width = '110px';
            //particles[0].current.style.height = '30px';
            anime({
              targets: particles[0].current, //transition on timeline to zero in 60%
              translateY: [0, -200], // from args (y-Y)*52
              translateX: [0, 200], // from args (x-X)*52
              duration: 1200,
              easing: 'spring(1, 90, 12, 0)',
              complete: anim1 => {  // may take 90% event
                if(anim1.completed) {  
                  console.log('ISTIME')
                  let resCheck = [];
                  particles[0].current.style.opacity = 0;
                  // применение изменений и конец анимаций через различные события
                  let promisses = particles.slice(1).map(({current}, i) => {
                    current.style.opacity = 1;
                    current.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAApUlEQVRIie3VTQ2AMAyG4Q8UIAEJSEDCJCABJ5OABCQgAQmTMAlwYE2A8FdWdqFv0gthe5aMBOBvZcz3J6n9ciYslsIKK6ywwtHwiOWHsJ+7jtaMnAOVAPzJRpzxYS9WRgA2XJSyEah9i1LDC3SIRQGgAO++fVgjUs2AaymUah+grTRK9Rdo/xUKLHfnDlAHwXs9q8L2Y/PhWZKaFdykQqkujPaoGWfIgHyNsYQlAAAAAElFTkSuQmCC'
                    current.style.width = '75px';
                    return new Promise((resolve, reject) => {
                      anime({
                        targets: current,
                        translateY: [-200, -20*i], // 0 --- last position of fireboll    
                        translateX: [200, 20*i+100],
                        //rotateX: 
                        duration: 1200,
                        easing: 'spring(1, 90, 12, 0)',
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
  ], // FS
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
  venom: [],
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
      let sumDlsLight = [];
      let sumDlsVenom = [];
      const sources = {rocks: state.rocks, me: newMe, partner: state.partner}
      newMe.forEach(({move, Y, X}) => {
        let sumDls = move.effect({Y, X, sources, pathBuilder})
        console.log('EACH_SUM_DLS:',sumDls)
        sumDlsLight = sumDlsLight.concat(sumDls.dlsLight);
        sumDlsVenom = sumDlsVenom.concat(sumDls.dlsVenome);
      })
      let allLightPos = getLightPosition(newMe, state.partner, state.rocks).concat(sumDlsLight)
      //newPartner
      console.log('%c%s', 'color: red; font: 1.3rem/2','SUM_DLS_VENOM:', sumDlsVenom)
      
      return updateVenomStep(
        updateBaseStep({
          data: {
            ...state, 
            me: newMe,
            inAir: null,
            canMove: [],
            oldCanMove: state.canMove,
            inLight: allLightPos,
            newInLight: getNewInLight(state.inLight, allLightPos),
            oldInLight: getOldInLight(state.inLight, allLightPos), // точечная перерисовка, если траблы с опти
            animeMove: null,  // for what, i don't know
            venom: state.venom.concat(sumDlsVenom),
            updateSign: 'M'+Math.random(),
          },
          state
        }),
      state)
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
      let attackSumDlsLight = [];
      const attackSources = {rocks: rocksRes.res, me: state.me, partner: partnerRes.res} // Эта длс для камня.. если кто - либо рипает преграду dls lightу
      state.me.forEach(({move, Y, X}) => {attackSumDlsLight = attackSumDlsLight.concat(move.effect({Y, X, sources: attackSources, pathBuilder}).dlsLight)})
      let allLightPosAfterMurder = getLightPosition(state.me, partnerRes.res, rocksRes.res).concat(attackSumDlsLight)
      return updateBaseStep({
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
          animeAttack: null,
          updateSign: 'A'+Math.random(),
        },
        state
      })
    case 'KNIGHT:KAMICK_ATTACK':
      const {me, partner, deadM, deadP} = payload
      //console.log('DEEEEEEBBAG_PAYLOAD:',payload)
      let updatedMe = deadM ? state.me.filter(({id}) => id !== deadM.id) : getNewStaffAfterKamick(state.me, me)
      let updatedPartner = deadP ? state.partner.filter(({id}) => id !== deadP.id) : getNewStaffAfterKamick(state.partner, partner)
      // if knok on stone... handle
      let allLightPosAfterKamick = getLightPosition(updatedMe, updatedPartner, state.rocks)
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
    case 'KNIGHT:START_SPELL':
      // state.spellInd state.inAir
      let spellObj = state.inAir.spells[state.spellInd]
      let spellRes = spellObj.func( // modify this... using call..
        {
          payload,
          sources: {me: state.me, partner: state.partner, rocks: state.rocks}, 
          target: spellObj.target, 
          who: 'me',
          pathBuilder
        }) //target enemy, me, rock
      return {
        ...state,
        spellAnimations: {
          animeFunc: spellObj.animeFunc, 
          animeArg: spellRes.args,
          particles: spellObj.particles,
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
      //const {me, partner, rocks} = state // const {x, y, id, spellId} =  payload 
      // const spellObj = state.inAir.spells[state.spellInd]
      // const spellRes = spellObj.func(
      //   {
      //     payload,
      //     sources: {me: state.me, partner: state.partner, rocks: state.rocks}, 
      //     target: spellObj.target, 
      //     who: 'me',
      //     pathBuilder
      //   }) //target enemy, me, rock
      
      let spellCashRes = state.spellCash
      let allLightPosAfterSpell = spellCashRes.inLightBySpell;
        console.log('%c%s','color: red, font-size: 24px','SPEEL_RES_FIRE:', spellCashRes.fire)
      return updateBaseStep({
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
          fire: state.fire.concat(spellCashRes.fire),
          venom: state.venom.concat(spellCashRes.venom),
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
      }
      )
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

const updateVenomStep = (data, state) => {
    console.log('DATA_PASS:', data)
    const newVenom = updateSpells(data.venom ? data.venom : state.venom);
    const afterClickPartner = updateGameStats(data.partner ? data.partner : state.partner, newVenom.res);
    const afterClickMe = updateGameStats(data.me ? data.me : state.me, newVenom.res);
    const newFire = updateSpells(data.fire ? data.fire : state.fire);
    
    console.log('NEW_FIRE:', newFire.res)
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
  let {id, y, x} = state.workPayload.payload
  const newPartner = getNewStaff(state.partner, {id}, {y, x})
  const lightPosAfterPartnerMove = getLightPosition(state.me, newPartner, state.rocks)
  console.log('LIGHT_POS_AFTER_PARTNER_MOVE:',lightPosAfterPartnerMove)
  return updateVenomStep(
    updateBaseStep({
      data:
      {
        ...state,
        partner: newPartner, 
        inLight: lightPosAfterPartnerMove,
        newInLight: getNewInLight(state.inLight, lightPosAfterPartnerMove),
        oldInLight: getOldInLight(state.inLight, lightPosAfterPartnerMove),
        animeMove: null,
        moveFromShadow: null,
        updateSign: 'W'
      }, 
      state //workPayload inside insert in
    }), state)
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
        }
      }
    })
  })
  return {res, dead}
}

const updateBaseStep = ({data, state}) => {
  const { workPayload: {inAir, payload, me, cause, spellInd} } = state;
  const stunUpdater = (workArr) => {
    let res = workArr.slice();
    res.forEach(({stunned}, i) => {
      if(stunned) {
        res[i].stunned = stunned-=1;
      }
    })
    return res
  }
  let newStateHistory = [].concat(state.stateHistory); // допушиваем старый stateHistory и делаем новый view
  console.log('OLD_STATE_HISTORY:', newStateHistory)
  console.log('BASE_HISTORY:', state.stateHistory)
  let newAct = data.act;
  let newTick = data.actTick+1;
  console.log(`BASE ACT: ${data.act}, BASE ACT TICK: ${data.actTick}, NEW_TICK: ${newTick}`)
  let lastHistory = newStateHistory.length - 1;
  console.log('%c%s', 'color:red; font-size: 55px', 'LAST_HISTORY:', lastHistory)
  let actionsPass = {me, air:inAir, type: cause, payload, spellInd}
  if(newTick > state.maxTick - 1) {
    newTick = 0;
    newAct = newAct+1;
    newStateHistory[lastHistory].actions.push(actionsPass)
    newStateHistory.push({
      me: data.me,
      partner: data.partner,
      rocks: data.rocks,
      fire: data.fire,
      venom: data.venom,
      inLight: data.inLight,
      treasures: data.treasures,
      myTreasures: data.myTreasures,
      actions: []
    })
    //push newAct
  } else {
    console.log('NEW_STATE_HISTORY:', newStateHistory)
    newStateHistory[lastHistory].actions.push(actionsPass)
  }
  // stateHistory: [ // 2 штуки, for light and for dark 
  //   // Game.stateHistory допушивается после каждого акта
  //   {
  //     // map version
  //     map: [{id: 'attack', ind: ''}],
  //     moves: [{air: '', to: ''}],
  //     attacks: [{air: '', to: ''}],
  //     spells: [{air: '', spellInd: '', to: ''}],
  //   }
  // ]
  // act: '',
  // actTick: ''
  console.log("PRE_RES_ACT_TICK:",newTick)
  let res = {
    ...data,
    me: stunUpdater(data.me),
    partner: stunUpdater(data.partner),
    stateHistory: newStateHistory,
    act: newAct,
    actTick: newTick,
  }
  console.log('UPDATE_BASE_STEP:', res)
  return res
}

const updateSpells = workArr => {
 // console.log('UPDATE_SPELLS:',workArr)
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
  //console.log(`REDUCER INNNNNNNNNNNNNNSA_index: ${index}, Staff:`,staff)
  staff[index] = {...staff[index], id, Y:y, X:x, pY:staff[index].Y, pX: staff[index].X}
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