import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y, children, overlay, isLight, isRock, isTreasure, isAttacked, herePartner, mouseEvent}) => {
  overlay && x === 8 && y === 1 && console.log('OOOOOOOOOOOOOVVVVVVVVVVVEEEEEEEEEEEERL',overlay)
  return (
    <div
      style={ overlay ? {border: `2px solid rgb(${overlay.r}, ${overlay.g}, ${overlay.b})`} : null}
      onMouseEnter={() => mouseEvent(true)}
      onMouseOut={() => mouseEvent(false)}
      className={classNames(
      'square',
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