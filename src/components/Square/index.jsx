import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y, children, overlay}) => {
  console.log(`X:${x}, Y:${y}, child: ${children}`)
  return (
    <div className={classNames('square', `square__${overlay && overlay}`)}>
      {
        children 
        ? React.cloneElement(children, {y, x}) //добавит ребенку пропсов?
        : `${y}, ${x}`
      }
    </div>
  )
}

export default Square