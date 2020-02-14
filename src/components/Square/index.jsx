import React, {useRef, useEffect, useState} from 'react';
import classNames from 'classnames'
import Color from 'color'

import './Square.scss'
                                                                      // underSpell will src
const Square = ({x, y, children, overlay, isLight, isRock, isTreasure, underSpell, herePartner, mouseEvent, moveFromShadow}) => {
  //overlay && x === 8 && y === 1 && console.log('OOOOOOOOOOOOOVVVVVVVVVVVEEEEEEEEEEEERL',overlay)
  const mainRef = useRef(null)
  const [lightState, setLightState] = useState(false)
  useEffect(() => {
    console.log('%c%s', 'color: blue; font-size: 20px', `RE_RENDER_SQUARE: x: ${x}, y: ${y}`)
    if(underSpell) {
      //console.log('REEEEEEEF:', mainRef.current.style)
      mainRef.current.style['background'] = Color(underSpell.color)
    } else {
      mainRef.current.style['background'] = '';
    }
    if(isLight && !lightState) {
      let progress = 100
      let malyr = () => {
        if(progress > 0) {
          progress--
          mainRef.current.style.opacity = 1 - progress/100
          setTimeout(() => malyr(), 10)
        } else {
          setLightState(true)
        }
      }
      malyr()
    }
    if(!isLight && lightState) { // state is saved
      // make smoke
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
        children && !herePartner ? children // React.createElement is the best
        : moveFromShadow && herePartner ? children
        : herePartner && isLight ? children
        : `${y}, ${x}`
      }
    </div>
  )
}

export default Square