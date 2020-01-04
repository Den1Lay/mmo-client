import React from 'react';
import { useDrop } from 'react-dnd'
import store from '@/store'

import { moveTo, animeMove } from '@/store/actions'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'

const Square = ({y, x, me, canMove, isLight, isRock, isTreasure}) => {
  //console.log('CANNNNNN MOOOOOOOOOVE:', canMove)
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'knight',
    drop: () => ({y, x, isTreasure}), //knight will take it,
    canDrop: () => canMove,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop:monitor.canDrop()
      //canDrop: monitor.canDrop()  
    })
  })

  let place = null;
  //console.log('ME',me)
  const preparePlace = ({array}) => {
    array.forEach(({Y, X, id}) => {
      if(y === Y && x === X) {
        console.log(`Inside Pass: y: ${y}, x: ${x}`)
        switch(id.substr(1, 4)) {
          case 'Knig': 
            place = <Knight id={id} simbol={'♞'} y={y} x={x} takeIt={isTreasure}/> //name of picture to use React.lazy
        }
      }
    })
  }
  preparePlace({array: me})
  let backColor = isOver && !canDrop
  ? "red" : !isOver && (canDrop || canMove)
  ? "yellow" : isOver && canDrop
  ? "green" : null

  const clickHandler = () => {
    if( canMove ) {
      store.dispatch(animeMove({y, x}))
      //store.dispatch(moveTo({y, x}))
    }
  }
  return (
    <div 
      ref={drop}
      onClick={clickHandler}>
      <SquareBase y={y} x={x} overlay={backColor} isLight={isLight} isRock={isRock} isTreasure={isTreasure}>
        {place}
      </SquareBase>
    </div>
  )
}

export default Square