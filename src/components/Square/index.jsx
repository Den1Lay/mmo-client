import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y, children, overlay, isLight, isRock, isTreasure}) => {
  console.log(`X:${x}, Y:${y}, isTreasure: ${isTreasure}`)
  return (
    <div className={classNames(
      'square',
      overlay && `square__${overlay}`,
      isTreasure && isLight
      ? 'square__isTreasure'
      : isRock 
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