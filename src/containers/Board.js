import React, {useEffect, useState, useMemo} from 'react';
import { connect } from 'react-redux'

import './timeScss.scss'

import  Square from './Square'

const Board = ({me, inAir, updateSign}) => { // canMove: [{y, x}, {y, x}]

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
        return arr.map(({y,x}) => <Square y={y} x={x} me={me} inAir={true}/>)
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
      let cloneMainMemoPlant = mainMemoPlant.slice()
      setUpdateId(updateSign)
      me.forEach(({id, Y, X, pY, pX}) => {
        if(pY && pX) {
          console.log('CLONE',cloneMainMemoPlant)
          console.log('pY', pY)
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
        
          cloneMainMemoPlant[Y][index] = <Square y={Y} x={X} me={me}/>
          cloneMainMemoPlant[pY][deleteIndex] = <Square y={pY} x={pX} me={me}/>
        }
      })
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

export default connect(({me, inAir, updateSign}) => ({me, inAir, updateSign}))(Board)