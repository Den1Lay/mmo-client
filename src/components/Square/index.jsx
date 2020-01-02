import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y, children, overlay, isLight, isRock}) => {
  console.log(`X:${x}, Y:${y}, child: ${children}`)
  return (
    <div className={classNames(
      'square',
      overlay && `square__${overlay}`,
      isRock 
        ? 'square__isRock'
        : isLight && 'square__isLight')
      }>
      {
        children 
        ? children // React.createElement is the best
        : `${y}, ${x}`
      }
    </div>
  )
}

export default Square