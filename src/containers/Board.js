import React, {useEffect, useState, cloneElement as setState} from 'react';
import { connect } from 'react-redux'

import { lastPreparation } from '@/store/actions'

import './timeScss.scss'

import  Square from './Square'

const Board = (
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
    spellInd
  }) => { // canMove: [{y, x}, {y, x}]
  console.log('PAAAAARTNER', partner)
  const [mainRes, setMainRes] = useState([])
  const [resSchema, setResSchema] = useState([])
  const [mainMemoPlant, setMainMemoPlant] = useState([])
  const [updateId, setUpdateId] = useState(null)
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
      console.log('PreBotPart', preBottomPart)
      let bottomPart = []
      let boost = 1;
      for(let i = 0; i < preBottomPart.length; i++) {
        bottomPart.push(preBottomPart[i].map(({y, x}) => ({y: y+boost, x})))
        boost = boost + 2
      }
      let res = topPart.concat(bottomPart)
      console.log('RES', res)
      setResSchema(res)
      // let mainRes = res.map((arr, i) => {
      //   return (
      //     <div className='line' key={i}>
      //       {arr.map(({y,x}) => <Square y={y} x={x} me={me} inAir={inAir}/>)}
      //     </div>
      //   )
      // })
      let mainMemoPlant = res.map((arr, a) => { // пересбор дерева с мемоизированными значения
        return arr.map(({y,x}) => <Square y={y} x={x} me={me} partner={partner} canMove={false} isLight={false} isRock={false} isTreasure={false} isAttacked={false} canSpell={false}/>)
      })
      console.log('MAIN_MEMO:',mainMemoPlant)
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
      console.log('AFTER PREPARE EVENT, mainMemoPlant:', mainMemoPlant)
      lastPreparation()
    } else if(updateSign !== updateId) {
      //console.log('GREAT SIGN:',updateSign)
      //console.log('GREAT SIGN_IND:',updateSign.substr(0,1))
      let cloneMainMemoPlant = mainMemoPlant.slice()
      setUpdateId(updateSign)
      const indexFinder = (workIndex, newY, newX) => {
       // console.log(`NEWY: ${newY}, NEWX: ${newX}`)
        resSchema[newY].forEach(({x}, i) => {
          if(newX === x) {
            workIndex[0] = i
          }
        })
      }
      const cleaner = () => {
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
          indexFinder(checkIndex, newY, newX)
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
        //console.log('PERSONSEETTTTTEEEEEEEEEER',person)
        let checkIndex = []
        person.forEach(({Y, X}) => {
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], who === 'me' ? {me} : {partner})
        })
      }
      const updateDefState = (workArr, pass) => {
        let checkIndex = []
        workArr.forEach(({Y, X}) => {
          console.log(`INSIDE UPDATEDEFSTATE: PASS:${pass}`, workArr)
          let res = pass ? {me: workArr} : {partner: workArr}
          console.log('CONTINUE', res)
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
      console.log('THAT MOOOOOOOOOOOOOO0000000000VE:', updateSign)
      switch(updateSign.substr(0,1)) {
        case 'M':
          cleaner()
          mover()
          lightSetter(oldInLight, false)
          lightSetter(newInLight, true)
          break
        case 'C':
          setter()
          break
        case 'D':
          console.log('ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLIVE')
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
            console.log('INSADE:',inAir.spells[spellInd] )
            canSpell.length > 0 && spellSetter(canSpell, inAir.spells[spellInd].color)
          }
          break
        case 'A':
          console.log('A HANDLERRRRRRRRRRRRRRRRRRR', oldPartner)
          oldRocks && rockSetter([oldRocks], false);
          attackSetter(oldCanAttack, false)
          lightSetter(newInLight, true)
          updateDefState(partner, false)
          oldPartner && persenSetter([oldPartner], 'partner', me, partner)
          break
        case 'K': 
          console.log('K-FIIIIIIIIIIIIILTER:', me)
          cleanProps(me, true)
          cleanProps(partner, false)
          updateDefState(me, true)
          updateDefState(partner, false)
          oldPartner && persenSetter([oldPartner], 'partner', me, partner)
          oldMe && persenSetter([oldMe], 'me', me, partner)
          lightSetter(oldInLight, false)
          lightSetter(newInLight, true)
          break
        case 'S':
          let sources = {partner, me, rocks, oldMe, oldPartner}
          spellMap.forEach(propsName => {
            switch(propsName){
              case 'partner':
                cleanProps(partner, false)
                updateDefState(partner, false)
                break
              case 'me':
                cleanProps(me, true)
                updateDefState(me, true)
                break
              case 'oldRocks':
                rockSetter([oldRocks], false)
                break
              case 'oldMe':
                persenSetter([oldMe], 'me', me, partner)
                break
              case 'oldPartner':
                persenSetter([oldPartner], 'partner', me, partner)  
                break
            }
          })
        default:
          console.log('START') // do something with this...
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
  
  return (
    <div className='board'>
        {mainRes}
    </div>
  )
}

export default connect((
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
    spellInd
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
      spellInd
    }
    ), 
  {
    lastPreparation
  }
  )(Board)