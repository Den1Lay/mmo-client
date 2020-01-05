import React, {useState, useRef} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo } from '@/store/actions'

import './Knight.scss'

const Knight = ({id, inAir, simbol, y: Y, x: X, addToAir, deleteFromAir, moveTo, animeMove, takeTreasure, takeIt, prepareTo}) => {
  takeIt && takeTreasure({y:Y, x:X})
  
  const [action, setAction] = useState(true)
  const mainRef = useRef(null)
  console.log(`WRONG PROPS: y: ${Y}, x: ${X}`)
  let moveOnTreasure = false;

  console.log('React.ClonePass:', `${Y}, ${X}`)
  const [{isDragging, ...another}, drag] = useDrag({
    item: { type: 'knight', id},
    begin: monitor => {
      console.log({id, Y, X})
      addToAir({id, Y, X})  
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult) {
        const {y, x, isTreasure} = dropResult
        if(!(y === Y && x === X )) {
          moveTo({y, x})
          if(isTreasure) {
            takeTreasure({y, x})
            moveOnTreasure = true
          }
        }
        // 
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const clickHandler = () => {
    console.log('CLIIIIIIIIIIICK HANDLER');
    // console.log(inAir);
    // console.log(inAir && (inAir.id !== id));
    if(inAir && (inAir.id !== id)) {
      deleteFromAir()
      setTimeout(() => addToAir({id, Y, X}), 0) //
    } else {
      inAir && inAir.id === id ? deleteFromAir() : addToAir({id, Y, X})
    }
  }

  if(animeMove && animeMove.id === id) {
    const {y, x} = animeMove
    console.log('IS HAPPENED')
    anime({
      targets: mainRef.current,
      translateY: [0, (y-Y)*52],
      translateX: [0, (x-X)*52],
      duration: 1200,
      easing: 'easeInOutExpo',
      complete: anim => {  // may take 90% event
        if(anim.completed) {
          console.log('ISTIME')
          moveTo({y, x})
          
        }
      }
    });
  }

  const controlHandler = (e) => {
    e.stopPropagation()
    action ? prepareTo('ATTACK') : prepareTo('MOVE')
    setAction(!action)
    console.log('LOOOOK')
  }

  return (
    <div 
    onClick={clickHandler}
    ref={drag}
    className={
      classNames('knight',
        
    )}
    >
      <div ref={mainRef}>
      {simbol}
      </div>
      {inAir && inAir.id == id ? <div className='knight__attackButton' onClick={controlHandler}/> : null}
    </div>
  )
}

export default connect(({inAir, animeMove}) => ({inAir, animeMove}), {addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo})(Knight)