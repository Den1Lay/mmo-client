import React from 'react';
import { useDrop } from 'react-dnd'
import store from '@/store'

import { moveTo, animeMove, attackTo } from '@/store/actions'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'

const Square = ({y, x, me, canMove, isLight, isRock, isTreasure, isAttacked}) => {
  console.log(`isAttacked y: ${y}, x: ${x}:`, isAttacked)
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
  //console.log('ME',me) // КАК РАБОТАЮТ СПЕЛЫ???? ()
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
    let cause = place ? 'partner' : isRock ? 'rocks' : null;
    if( canMove ) { store.dispatch(animeMove({y, x})) }
    if( isAttacked && cause ) { store.dispatch(attackTo({y, x, cause})) }
    
  }
  return (
    <div 
      ref={drop}
      onClick={clickHandler}>
      <SquareBase y={y} x={x} overlay={backColor} isLight={isLight} isRock={isRock} isTreasure={isTreasure} isAttacked={isAttacked}>
        {place}
      </SquareBase>
    </div>
  )
}

export default Square