import React from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { addToAir, deleteFromAir, moveTo } from '@/store/actions'

import './Knight.scss'

const Knight = ({id, simbol, y, x, addToAir, deleteFromAir, moveTo}) => {
  console.log('React.ClonePass:', `${y}, ${x}`)
  const [{isDragging, ...another}, drag] = useDrag({
    item: { type: 'knight', id},
    begin: monitor => {
      console.log({id, Y:y, X:x})
      addToAir({id, Y:y, X:x})
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult) {
        const {y, x} = dropResult
        moveTo({id, y, x})
        deleteFromAir()
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div 
    ref={drag}
    className={
      classNames('knight',
        
    )}
    >{simbol}
    </div>
  )
}

export default connect(({inAir}) => ({}), {addToAir, deleteFromAir, moveTo})(Knight)