import React, {useEffect, useState, cloneElement as setState} from 'react';
import { connect } from 'react-redux'

import { lastPreparation } from '@/store/actions'

import './timeScss.scss'

import  Square from './Square'

const Board = ({me, updateSign, canMove, lastPreparation, newInLight, oldInLight, rocks}) => { // canMove: [{y, x}, {y, x}]

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
        return arr.map(({y,x}) => <Square y={y} x={x} me={me} canMove={false} isLight={false} isRock={false}/>)
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
        console.log(`NEWY: ${newY}, NEWX: ${newX}`)
        resSchema[newY].forEach(({x}, i) => {
          if(newX === x) {
            workIndex[0] = i
          }
        })
      }
      const cleaner = () => {
        canMove.forEach(({newY, newX}) => { //cleaner вот оно
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
          console.log(`MOOOOOOOOOOOOOOOV_pY: ${pY}, pX: ${pX}`)
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
          console.log(`MAIN DATA CHANGE Y: ${Y}, X:${X} and pY:${pY}, delIndx: ${pX}`)
          cloneMainMemoPlant[Y][index[0]] = setState(cloneMainMemoPlant[Y][index[0]], {me, canMove: false})
          cloneMainMemoPlant[pY][deleteIndex[0]] = setState(cloneMainMemoPlant[pY][deleteIndex[0]], {me, canMove: false})
          //index.pop()
          //deleteIndex.pop()
       // } --------------
      })
      } // СДЕЛАТЬ ОГРОМНЫЙ РЕФАКТОРИНГ
      const setter = () => {
        console.log('Aliiiiiiiiiiive CHECKER')
        console.log('CANMOVE:', canMove)
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
      const rockSetter = () => {
        let checkIndex = []
        rocks.forEach(({Y, X}) => {
          indexFinder(checkIndex, Y, X)
          cloneMainMemoPlant[Y][checkIndex[0]] = setState(cloneMainMemoPlant[Y][checkIndex[0]], {isRock: true})
        })
      }
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
          cleaner()
          break
        case 'P':
          lightSetter(newInLight, true)
          rockSetter()
          break;
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
    updateSign, 
    canMove, 
    uselessCanMove,
    newInLight,
    oldInLight,
    rocks
  }
  ) => ({me, updateSign, canMove, uselessCanMove, newInLight, oldInLight, rocks}), 
  {
    lastPreparation
  }
  )(Board)