import React from 'react';
import { useDrop } from 'react-dnd'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'




const Square = ({y, x, me}) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'knight',
    drop: () => ({y, x}), //knight will take it,
    canDrop: () => true,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: y > 16 ? monitor.canDrop() : null
      //canDrop: monitor.canDrop()  
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