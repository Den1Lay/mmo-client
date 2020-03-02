// НИКОГДА НЕ МОДИФИЦИРОВАТЬ ЭЛЕМЕНТ ЧЕРЕЗ МОДИФИКАЦИЮ ОБЪЕКТА КОМПОНЕНТА, ДАЖЕ ЕСЛИ ЗАТЕМ ПРИСВАИВАЕШЬ ЕМУ НОВЫЙ СОМП
import React, {useEffect, useState, useRef, cloneElement as setState} from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames'

import { lastPreparation, partnerAnimeMove } from '@/actions/game'
import './timeScss.scss'

import  Square from './Square'

function Board (
  {
    me,
    oldMe,
    partner,
    oldPartner,
    updateSign, 
    canMove,
    oldCanMove,
    canSpell,
    oldCanSpell,
    lastPreparation, 
    newInLight, 
    oldInLight, 
    rocks,
    oldRocks,
    treasures,
    deletedTreasures,
    canAttack,
    oldCanAttack,
    spellMap,
    inAir,
    spellInd,
    fire,
    oldFire,
    myVenom,
    oldMyVenom,
    partVenom,
    oldPartVenom,
    moveFromShadow,
    oldMoveFromShadow,
    showOnSecond,
    //partnerAnimeMove,
    oldShowOnSecond,
  }) { // canMove: [{y, x}, {y, x}]
  const [mainRes, setMainRes] = useState([])
  const [resSchema, setResSchema] = useState([])
  const [mainMemoPlant, setMainMemoPlant] = useState([])
  const [updateId, setUpdateId] = useState(null)
  //const [resolution, setResolution] = useState(mainRes)
  useEffect(() => {
    if(mainRes.length === 0) {
      let topPart = [];
      let board = 4;  //4
      for(let y = 0; y < 9; y++) { //9  
        let line = [];
        
        for(let x = 0; x < 18; x++) {  //18
          if(x > board && x < 17-board) { //17
            line.push({y, x})
          }
        }
        board--
        topPart.push(line)
        line = [];
      }
      let preBottomPart = topPart.slice().reverse();
      let bottomPart = []
      let boost = 1;
      for(let i = 0; i < preBottomPart.length; i++) {
        bottomPart.push(preBottomPart[i].map(({y, x}) => ({y: y+boost, x})))
        boost = boost + 2
      }
      let res = topPart.concat(bottomPart)
      setResSchema(res)
      // let mainRes = res.map((arr, i) => {
      //   return (
      //     <div className='line' key={i}>
      //       {arr.map(({y,x}) => <Square y={y} x={x} me={me} inAir={inAir}/>)}
      //     </div>
      //   )
      // })
      let mainMemoPlant = res.map((arr, a) => { // пересбор дерева с мемоизированными значения
        return arr.map(({y,x}) => <Square y={y} x={x} me={me} partner={partner} canMove={false} isLight={false} isRock={false} isTreasure={false} isAttacked={false} canSpell={false} spellAnime={[]} moveFromShadow={null} showOnSecond={null}/>)
      })
      //setMainRes(mainRes)
      setMainMemoPlant(mainMemoPlant)
      let midMainRes = mainMemoPlant.map((arr, a) => {
        return (
          <div className='line' key={a}>
            {arr}
          </div>
        )
      })
      setMainRes(midMainRes)
      lastPreparation()
    } else if(updateSign !== updateId) {
      //console.log('GREAT SIGN:',updateSign)
      //console.log('GREAT SIGN_IND:',updateSign.substr(0,1))
      let cloneMainMemoPlant = mainMemoPlant.slice()
      setUpdateId(updateSign)
      const indexFinder = (workIndex, newY, newX) => {
        //console.log(`NEWY: ${newY}, NEWX: ${newX}`)
        resSchema[newY].forEach(({x}, i) => {
          if(newX === x) {
            workIndex[0] = i
          }
        })
      }
      const cleaner = () => {
        //debugger
        //console.log('INNNNNNNNNN WOOOOOOOOOORK,', oldCanMove)
        oldCanMove.forEach(({newY, newX}) => { //cleaner вот оно
          let deathIndex = []
          indexFinder(deathIndex, newY, newX)
          // resSchema[newY].forEach(({x}, i) => {
          //   if(newX === x) {
          //     deathIndex = i
          //   }
          // setState === React.cloneElement()
          cloneMainMemoPlant[newY][deathIndex[0]] = setState(cloneMainMemoPlant[newY][deathIndex[0]], {me, canMove:false})
          //deathIndex.pop()
        })
      }
      const mover = () => {
        me.forEach(({id, Y, X, pY, pX}) => {
          //console.log(`PPPPPPY: ${pY}, ${pX} `)
          // if(pY+''  pX+'') { ----------------
          //console.log('CLONE',cloneMainMemoPlant)
         // console.log(`MOOOOOOOOOOOOOOOV_pY: ${pY}, pX: ${pX}`)
          let index = [] 
          let deleteIndex = []
          indexFinder(index, Y, X)
          indexFinder(deleteIndex, pY, pX)
          // resSchema[pY].forEach(({x}, di) => {
          //   if(x === pX) {
          //     deleteIndex = di
          //   }
          // })
          // resSchema[Y].forEach(({x}, i) => {
          //   if(x === X) { 
          //     index = i
          //   }
          // })
          //console.log(`MAIN DATA CHANGE Y: ${Y}, X:${X} and pY:${pY}, delIndx: ${pX}`)
          cloneMainMemoPlant[Y][index[0]] = setState(cloneMainMemoPlant[Y][index[0]], {me, canMove: false})
          cloneMainMemoPlant[pY][deleteIndex[0]] = setState(cloneMainMemoPlant[pY][deleteIndex[0]], {me, canMove: false})
          //index.pop()
          //deleteIndex.pop()
       // } --------------
      })
      } // СДЕЛАТЬ ОГРОМНЫЙ РЕФАКТОРИНГ
      const setter = () => {
        //console.log('Aliiiiiiiiiiive CHECKER')
        //console.log('CANMOVE:', canMove)
        let checkIndex = [];
        canMove.forEach(({newY, newX}) => {
          // resSchema[newY].forEach(({x}, i) => {
          //   if(newX === x) {
          //     checkIndex = i
          //   } 
          // })
          indexFinder(checkIndex, newY, newX);
          //let gebagCheck = cloneMainMemoPlant[newY][checkIndex[0];
          //debugger;
          //console.log('Do your work')
          cloneMainMemoPlant[newY][checkIndex[0]] = setState(cloneMainMemoPlant[newY][checkIndex[0]], {me, canMove: true})
          //checkIndex.pop()
        })
      }
      // const lightCleaner = () => {
      //   let checkIndex = null;
      //   oldInLight.forEach(({newY, newX}) => {
      //     resSchema[newY].forEach(({x}, i) => {
      //       if(newX === x) {
      //         checkIndex = i
      //       }
      //     })
      //     cloneMainMemoPlant[newY][checkIndex] = React.cloneElement(cloneMainMemoPlant[newY][checkIndex], {isLight: false})
      //   })
      // }

      // РЕФАКТОРИНГ ЧЕРЕЗ ПОЛНУЮ ЗАМЕНУ PASS ОБЪЕКТА
      const lightSetter = (workArr, pass) => {
        let checkIndex = [];
        workArr.forEach(({newY, newX}) => {
          // resSchema[newY].forEach(({x}, i) => {
          //   if(newX === x) {
          //     checkIndex = i
          //   }
          // })
          indexFinder(checkIndex, newY, newX)
          cloneMainMemoPlant[newY][checkIndex[0]] = setState(cloneMainMemoPlant[newY][checkIndex[0]], {isLight: pass})
          //  checkIndex.pop()
        })
      }
      const rockSetter = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({Y, X}) => {
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], {isRock: pass})
        })
      }
      const treasureSetter = (workArr, pass) => {
        //console.log(`TREEEEEEAAASURE:`,workArr)
        let checkIndex = []
        workArr.forEach(({Y, X}) => {
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], {isTreasure: pass})
        })
      }
      const attackSetter = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({newY, newX}) => {
          indexFinder(checkIndex, newY, newX)
          cloneMainMemoPlant[newY][checkIndex[0]] = setState(cloneMainMemoPlant[newY][checkIndex[0]], {isAttacked: pass})
        })
      }
      const persenSetter = (person, who, me, partner) => {
        let checkIndex = []
        person.forEach(({Y, X}) => {
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], who === 'me' ? {me} : {partner})
        })
      }
      const updateDefState = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({Y, X}) => {
          let res = pass ? {me: workArr} : {partner: workArr}
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], res)
        })
      }
      const cleanProps = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({pY,pX}) => {
          indexFinder(checkIndex, pY, pX)
          let res = pass ? {me: workArr} : {partner: workArr}
          cloneMainMemoPlant[pY][checkIndex[0]] = setState(cloneMainMemoPlant[pY][checkIndex[0]], res)
        })
      }
      const spellSetter = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({newY, newX}) => {
          indexFinder(checkIndex, newY, newX)
          cloneMainMemoPlant[newY][checkIndex[0]] = setState(cloneMainMemoPlant[newY][checkIndex[0]], {canSpell: pass})
        })
      }
      const spellAnimeSetter = (workArr, flag) => {
        let checkIndex = []
        //console.log(`INSIDE_SPELL_ANIME_PAYLOAD:${payload}`, workArr)
        workArr.forEach(({newY, newX, color, src}) => {
          indexFinder(checkIndex, newY, newX)
          //console.log('%c%s', 'color: blue; font-size: 44px;', 'THAT_CLONE:', cloneMainMemoPlant[newY][checkIndex[0]].props)
          let workElPass = cloneMainMemoPlant[newY][checkIndex[0]].props.spellAnime.slice()
          const modifySpellAnime = () => {
            if(flag) {
              workElPass.push({color, src})  
            } else {
              let deadInd = 0;
              workElPass.forEach(({src: deadSrc}, i) => {
                if(deadSrc === src) {
                  deadInd = i
                }
              })
              workElPass.splice(deadInd, 1)
            }
          }
          modifySpellAnime()
          //console.log('%c%s', 'color: brown; font-size: 13px;',`POS_THAT_WAS_UP: Y:${workEl.props.y}, X:${workEl.props.x}`)
          //console.log('%c%s', 'color: blue; font-size: 44px;', 'THAT_CLONE:', cloneMainMemoPlant[newY][checkIndex[0]].props)
          cloneMainMemoPlant[newY][checkIndex[0]] = setState(cloneMainMemoPlant[newY][checkIndex[0]], {spellAnime: workElPass}) // хилимся живем..
        })
      }

      const moveFromShadowSetter = (workObj, objPass) => {
        let checkIndex = []
        indexFinder(checkIndex, workObj.fY, workObj.fX)
        cloneMainMemoPlant[workObj.fY][checkIndex[0]] = setState(cloneMainMemoPlant[workObj.fY][checkIndex[0]], objPass)  
      }
      switch(updateSign.substr(0,1)) {
        case 'M':
          //console.log()
          
          cleaner()
          mover()
          lightSetter(oldInLight, false)
          lightSetter(newInLight, true)
          oldFire.length > 0 && spellAnimeSetter(oldFire, null)
          oldMyVenom.length > 0 && spellAnimeSetter(oldMyVenom, false)
          oldPartVenom.length > 0 && spellAnimeSetter(oldPartVenom, false) // конфликтик..
          //console.log('PREVIEW_MODIFY:',myVenom)
          myVenom.length > 0 && spellAnimeSetter(myVenom, true)
          partVenom.length > 0 && spellAnimeSetter(partVenom, true)
          oldMe.length > 0 && updateDefState(me, true) // может нет никого уже..
          oldPartner.length > 0 && updateDefState(partner, false)
          oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)
          oldMe.length > 0 && persenSetter(oldMe, 'me', me, partner)
          
          break
        case 'C':
          //debugger
          setter()
          break
        case 'D':
          oldCanMove.length > 0 && cleaner()
          oldCanAttack.length > 0 && attackSetter(oldCanAttack, false)
          oldCanSpell.length > 0 && spellSetter(oldCanSpell, false)
          break
        case 'P':
          lightSetter(newInLight, true)
          rockSetter(rocks, true)
          treasureSetter(treasures, true)
          break;
        case 'T': 
          treasureSetter(deletedTreasures, false)
        case 'U':
          if(!(canMove.length > 0) && canAttack.length > 0) {
            spellSetter(oldCanSpell, false)
            cleaner()
            //spellSetter(, false)
            attackSetter(canAttack, true)
          } else if(canMove.length > 0 && !(canAttack.length > 0)) {
            oldCanAttack.length > 0 && attackSetter(oldCanAttack, false)
            oldCanSpell.length > 0 && spellSetter(oldCanSpell, false)
            setter()
          } else if(canSpell.length > 0 || oldCanSpell.length > 0) {
            oldCanSpell.length > 0 && spellSetter(oldCanSpell, false)
            cleaner()
            oldCanAttack.length > 0 && attackSetter(oldCanAttack, false)
            canSpell.length > 0 && spellSetter(canSpell, inAir.spells[spellInd].color)
          }
          break
        case 'A':

          oldRocks.length > 0 && rockSetter(oldRocks, false);
          attackSetter(oldCanAttack, false)
          newInLight.length > 0 && lightSetter(newInLight, true)
          oldInLight.length > 0 && lightSetter(oldInLight, false)
          updateDefState(partner, false)
          updateDefState(me, true)
          oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)
          //optional time update
          //greatUpdater(['me', 'oldMe', 'fire', 'oldFire', 'venom', 'oldVenom'])
          //oldMe.length > 0 && updateDefState(me, true)
          //debugger
          oldMe.length > 0 && persenSetter(oldMe, 'me', me, partner)
          //debugger
          oldFire.length > 0 && spellAnimeSetter(oldFire, null)
          oldMyVenom.length > 0 && spellAnimeSetter(oldMyVenom, false)
          myVenom.length > 0 && spellAnimeSetter(myVenom, true)
          oldPartVenom.length > 0 && spellAnimeSetter(oldPartVenom, false)
          partVenom.length > 0 && spellAnimeSetter(partVenom, true)
          oldShowOnSecond && moveFromShadowSetter(oldShowOnSecond, {showOnSecond: null}) 
          break
        case 'K': 
          cleanProps(me, true)
          cleanProps(partner, false)
          updateDefState(me, true)
          updateDefState(partner, false)
          oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)
          oldMe.length > 0 && persenSetter(oldMe, 'me', me, partner)
          oldInLight.length > 0 && lightSetter(oldInLight, false)
          lightSetter(newInLight, true)
          //optional time update
          //greatUpdater(['fire', 'oldFire', 'venom', 'oldVenom'])
          //oldFire.length > 0 && spellAnimeSetter(fire, null)
          break
        case 'S':
          // может залпом перересуем??????
          //let sources = {partner, me, rocks, oldMe, oldPartner}
          //console.log('SPELL_MAP:',spellMap)
          oldCanSpell.length > 0 && spellSetter(oldCanSpell, false)
          let newSpellMap = spellMap.slice();
          const checkArr = ['partner', 'oldPartner', 'me', 'oldMe', 'fire', 'oldFire', 'venom', 'oldVenom']
          checkArr.forEach(el => {
            if(!spellMap.some(pass => pass === el)) {
              newSpellMap.unshift(el)
            }
          })
          
          
          oldInLight.length > 0 && lightSetter(oldInLight, false)
          newInLight.length > 0 && lightSetter(newInLight, true)

          newSpellMap.forEach(propsName => {
            switch(propsName){
              case 'partner':
                cleanProps(partner, false)
                updateDefState(partner, false)
                break
              case 'oldPartner':
                oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)  
                break
              case 'me':
                cleanProps(me, true)
                updateDefState(me, true)
                break
              case 'oldRocks':
                rockSetter(oldRocks, false)
                break
              case 'oldMe':
                persenSetter(oldMe, 'me', me, partner)
                break
              
              case 'fire':
                spellAnimeSetter(fire, true)
                break
              case 'oldFire':

                oldFire.length > 0 && spellAnimeSetter(oldFire, false)
                break
              case 'myVenom':
                spellAnimeSetter(myVenom, true)
                break
              case 'oldMyVenom':
                spellAnimeSetter(oldMyVenom, false)
                break
              case 'partVenom': 
                spellAnimeSetter(partVenom, true)
                break
              case 'oldPartVenom':
                spellAnimeSetter(oldPartVenom, false)
                break
              default:
           
            }
          })
          break;
        case 'Q':
          //console.log('MOVE_FROM_SHADOW_PASS:', moveFromShadow)
          moveFromShadowSetter(moveFromShadow, {moveFromShadow})
          break
        case 'W':
          //console.log('W_DEBAG:PARTNER:',partner)
          oldInLight.length > 0 && lightSetter(oldInLight, false)
          newInLight.length > 0 && lightSetter(newInLight, true)
          //console.log('%c%s','color: darkblue; font-size: 33px', 'OLD_MOVE_FROM_SHADOW:', oldMoveFromShadow)
          oldMoveFromShadow && moveFromShadowSetter(oldMoveFromShadow, {moveFromShadow: null})
          cleanProps(partner, false)
          updateDefState(partner, false)
          //=====================TAKEOUT=======================
          //debugger
          oldMe.length > 0 && updateDefState(me, true) // может нет никого уже..
          oldPartner.length > 0 && updateDefState(partner, false)
          oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)
          oldMe.length > 0 && persenSetter(oldMe, 'me', me, partner)
          oldFire.length > 0 && spellAnimeSetter(oldFire, null)
          oldMyVenom.length > 0 && spellAnimeSetter(oldMyVenom, false)
          myVenom.length > 0 && spellAnimeSetter(myVenom, true)
          oldPartVenom.length > 0 && spellAnimeSetter(oldPartVenom, false)
          partVenom.length > 0 && spellAnimeSetter(partVenom, true)
          break
        case 'H': 
          showOnSecond && moveFromShadowSetter(showOnSecond, {showOnSecond})
          break
        case 'Z':
          oldShowOnSecond && moveFromShadowSetter(oldShowOnSecond, {showOnSecond: null}) 
          break
        case 'F': 
          //debugger
          oldPartner.length > 0 && persenSetter(oldPartner, 'partner', me, partner)
          oldMe.length > 0 && persenSetter(oldMe, 'me', me, partner)
          oldInLight.length > 0 && lightSetter(oldInLight, false)
          newInLight.length > 0 && lightSetter(newInLight, true)
          break
        default:
          //console.log('START') // do something with this...
      }
      
      let midMainRes = cloneMainMemoPlant.map((arr, a) => {
        return (
          <div className='line' key={a}>
            {arr}
          </div>
        )
      })
      setMainRes(midMainRes)
    }
  })
  //console.log('%c%s', 'color: blue; font-size: 44px;', 'MAIN_RES:', mainRes)
  return (
      <div className={classNames('board')}>
        {mainRes}
      </div>
  ) 
}
// одна функция для всех обновлений???? net.


export default connect((
   {
     game: {
      me,
      oldMe,
      partner,
      oldPartner,
      updateSign, 
      canMove,
      oldCanMove,
      canSpell,
      oldCanSpell,
      uselessCanMove,
      newInLight,
      oldInLight,
      rocks,
      oldRocks,
      treasures,
      deletedTreasures,
      canAttack,
      oldCanAttack,
      spellMap,
      inAir,
      spellInd,
      fire,
      oldFire,
      myVenom,
      oldMyVenom,
      partVenom,
      oldPartVenom,
      moveFromShadow,
      oldMoveFromShadow,
      showOnSecond,
      oldShowOnSecond,
    }
   }
  ) => (
    {
      me,
      oldMe,
      partner,
      oldPartner,
      updateSign, 
      canMove,
      oldCanMove,
      canSpell,
      oldCanSpell,
      uselessCanMove, 
      newInLight, 
      oldInLight, 
      rocks,
      oldRocks,
      treasures,
      deletedTreasures,
      canAttack,
      oldCanAttack,
      spellMap,
      inAir,
      spellInd,
      fire,
      oldFire,
      myVenom,
      oldMyVenom,
      partVenom,
      oldPartVenom,
      moveFromShadow,
      oldMoveFromShadow,
      showOnSecond,
      oldShowOnSecond,
    }
    ), 
  {
    lastPreparation,

  }
  )(Board)