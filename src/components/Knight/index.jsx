import React, {useState} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { addToAir, deleteFromAir, moveTo } from '@/store/actions'

import './Knight.scss'

const Knight = ({id, simbol, y: Y, x: X, addToAir, deleteFromAir, moveTo}) => {
  const [flag, setFlag] = useState(false)
  
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

  return (
    <div 
    onClick={clickHandler}
    ref={drag}
    className={
      classNames('knight',
        
    )}
    >{simbol}
    </div>
  )
}

export default connect(({inAir}) => ({}), {addToAir, deleteFromAir, moveTo})(Knight)