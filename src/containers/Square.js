import React from 'react';
import { useDrop } from 'react-dnd'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'


const checkMove = (me, inAir, y, x) => {
  console.log('inAir', inAir)
  const {id, Y, X} = inAir
  const dy = Math.abs(Y - y)
  const dx = Math.abs(X - x)
  if(me.some(({Y, X}) => Y === y && X === x)) {
    return false
  }
  switch(id.substr(1, 4)) {
    case 'Pawn':
    case 'Knig':
    return (
      (dy === 1 && dx === 1) ||
      (dy === 0 && dx === 1) ||
      (dy === 1 && dx === 0)
    )
  }
}

const Square = ({y, x, me, inAir}) => {
  const [{isOver, canDrop, ...another}, drop] = useDrop({
    accept: 'knight',
    drop: () => ({y, x}), //knight will take it,
    canDrop: () => checkMove(me, inAir, y, x),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()  
    })
  })
  let place = null;
  console.log('ME',me)
  const preparePlace = ({array}) => {
    array.forEach(({Y, X, id}) => {
      if(y === Y && x === X) {
        switch(id.substr(1, 4)) {
          case 'Knig': 
            place = <Knight id={id} simbol={'♞'} /> //name of picture to use React.lazy
        }
      }
    })
  }
  preparePlace({array: me})
  let backColor = isOver && !canDrop
  ? "red" : !isOver && canDrop
  ? "yellow" : isOver && canDrop
  ? "green" : null

  return (
    <div ref={drop}>
      <SquareBase y={y} x={x} overlay={backColor}>
        {place}
      </SquareBase>
    </div>
  )
}

export default Square