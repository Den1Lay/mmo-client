import React, {useEffect, useState, useMemo} from 'react';
import { connect } from 'react-redux'

import './timeScss.scss'

import  Square from './Square'

const Board = ({me, updateSign, canMove, moveTo, uselessCanMove}) => { // canMove: [{y, x}, {y, x}]

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
        return arr.map(({y,x}) => <Square y={y} x={x} me={me} canMove={false} moveTo={moveTo}/>)
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
    } else if(updateSign !== updateId) {
      //console.log('GREAT SIGN:',updateSign)
      //console.log('GREAT SIGN_IND:',updateSign.substr(0,1))
      let cloneMainMemoPlant = mainMemoPlant.slice()
      setUpdateId(updateSign)
      const cleaner = () => {
        canMove.forEach(({newY, newX}) => { //cleaner вот оно
          let deathIndex = null;
          resSchema[newY].forEach(({x}, i) => {
            if(newX === x) {
              deathIndex = i
            }
          })
          cloneMainMemoPlant[newY][deathIndex] = <Square y={newY} x={newX} me={me} canMove={false} moveTo={moveTo}/>
        })
      }
      const mover = () => {
        me.forEach(({id, Y, X, pY, pX}) => {
          //console.log(`PPPPPPY: ${pY}, ${pX} `)
          // if(pY+''  pX+'') { ----------------
          //console.log('CLONE',cloneMainMemoPlant)
          //console.log('pY', pY)
          let index = null; 
          let deleteIndex = null;
          resSchema[pY].forEach(({x}, di) => {
            if(x === pX) {
              deleteIndex = di
            }
          })
          resSchema[Y].forEach(({x}, i) => {
            if(x === X) { 
              index = i
            }
          })
          //console.log(`MAIN DATA CHANGE Y: ${Y}, X:${X} and pY:${pY}, delIndx: ${pX}`)
          cloneMainMemoPlant[Y][index] = <Square y={Y} x={X} me={me} canMove={false} moveTo={moveTo}/>
          cloneMainMemoPlant[pY][deleteIndex] = <Square y={pY} x={pX} me={me} canMove={false} moveTo={moveTo}/>
       // } --------------
      })
      }
      const setter = () => {
        console.log('Aliiiiiiiiiiive CHECKER')
        console.log('CANMOVE:', canMove)
        let checkIndex = null;
        canMove.forEach(({newY, newX}) => {
          resSchema[newY].forEach(({x}, i) => {
            if(newX === x) {
              checkIndex = i
            }
          })
          console.log('Do your work')
          cloneMainMemoPlant[newY][checkIndex] = <Square y={newY} x={newX} me={me} canMove={true}/> 
        })
      }
      switch(updateSign.substr(0,1)) {
        case 'M':
          cleaner()
          mover()
          break
        case 'C':
          setter()
          break
        case 'D':
          //console.log('TRY CLEAR IT')
          cleaner()
          break
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
  }
  ) => ({me, updateSign, canMove, uselessCanMove}))(Board)