import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y, children, overlay, isLight, isRock, isTreasure, isAttacked, herePartner}) => {
  console.log(`X:${x}, Y:${y}, isAttacked: ${isAttacked}`)
  return (
    <div className={classNames(
      'square',
      overlay && `square__${overlay}`,
      isAttacked
      ? 'square__isAttacked'
      : isTreasure && isLight
      ? 'square__isTreasure'
      : isRock 
        ? 'square__isRock'
        : isLight && 'square__isLight')
      }>
      {
        children && !herePartner
        ? children // React.createElement is the best
        : herePartner && isLight
          ? children
          : `${y}, ${x}`
      }
    </div>
  )
}

export default Square