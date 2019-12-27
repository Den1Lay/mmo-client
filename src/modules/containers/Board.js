import React from 'react';

import './timeScss.scss'

import { 
//Board as BoardBase,
  Square
} from '../layout'

const Board = () => {
  let topPart = [];
  let board = 4
  for(let y = 0; y < 9; y++) {
    let line = [];
    
    for(let x = 0; x < 18; x++) {
      if(x > board && x < 17-board) {
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
  let mainRes = res.map((arr, i) => {
    return [
      <div className='line' key={i}>
        {arr.map(({y,x}) => <Square y={y} x={x} />)}
      </div>
    ]
  })
  return (
    <div className='board'>
        {mainRes}
    </div>
  )
}

export default Board