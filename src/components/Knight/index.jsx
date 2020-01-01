import React, {useState, useRef} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, moveTo } from '@/store/actions'

import './Knight.scss'

const Knight = ({id, simbol, y: Y, x: X, addToAir, deleteFromAir, moveTo, animeMove}) => {
  const [flag, setFlag] = useState(false)
  const mainRef = useRef(null)
  console.log(`WRONG PROPS: y: ${Y}, x: ${X}`)

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
        const {y, x} = dropResult
        if(!(y === Y && x === X )) {
          moveTo({y, x})
        }
        // 
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const clickHandler = () => {
    console.log('CLIIIIIIIIIIICK HANDLER')
    flag ? deleteFromAir() : addToAir({id, Y, X})
    setFlag(!flag)
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
      complete: anim => {
        if(anim.completed) {
          console.log('ISTIME')
          moveTo({y, x})
        }
      }
    });
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
    </div>
  )
}

export default connect(({inAir, animeMove}) => ({animeMove}), {addToAir, deleteFromAir, moveTo})(Knight)