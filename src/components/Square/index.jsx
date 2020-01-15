import React, {useRef, useEffect} from 'react';
import classNames from 'classnames'
import Color from 'color'

import './Square.scss'
                                                                      // underSpell will src
const Square = ({x, y, children, overlay, isLight, isRock, isTreasure, underSpell, herePartner, mouseEvent}) => {
  overlay && x === 8 && y === 1 && console.log('OOOOOOOOOOOOOVVVVVVVVVVVEEEEEEEEEEEERL',overlay)
  const mainRef = useRef(null)
  useEffect(() => {
    if(underSpell) {
      console.log('REEEEEEEF:', mainRef.current.style)
      mainRef.current.style['background'] = Color(underSpell.color)
    } else {
      mainRef.current.style['background'] = ''
    }
  })
  return (
    <div
      ref={mainRef}
      style={ overlay ? {border: `1px solid rgb(${overlay.r}, ${overlay.g}, ${overlay.b})`} : null}
      onMouseEnter={() => mouseEvent(true)}
      onMouseOut={() => mouseEvent(false)}
      className={classNames(
      'square',
      isTreasure && isLight
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