import React, {useRef, useEffect, useState} from 'react';
import classNames from 'classnames'
import Color from 'color'

import lightPlace from '@/img/LightPlace.png'
import darkPlace from '@/img/DarkPlace.png'

import './Square.scss'
                                                                      // underSpell will src
const Square = React.memo(({x, y, children, overlay, isLight, isRock, isTreasure, underSpell, herePartner, mouseEvent, moveFromShadow, showOnSecond}) => {
  console.log('%c%s','color: navy; font-size: 22px;',`X: ${x}, Y: ${y}, REAL_RE_RENDER:`, underSpell)
  const mainRef = useRef(null)

    useEffect(() => {
      if(underSpell.length > 0) {
        //console.log('%c%s','color: green; font-size: 22px;','GET_NEW_UNDER_SPELL:', underSpell)
        if(isLight) {
          mainRef.current.style['background'] = Color(underSpell[0].color)
        } else {
          mainRef.current.style['background'] = '';
        } // think some-thing
      } else { 
        mainRef.current.style['background'] = '';
      }
    })
  return (
    <div
      ref={mainRef}
      //style={ overlay ? {border: `1px solid rgb(${overlay.r}, ${overlay.g}, ${overlay.b})`} : null}
      onMouseEnter={() => mouseEvent(true)}
      onMouseOut={() => mouseEvent(false)}
      className={classNames(
      'square',
      isLight && 'square__isLight',
      isTreasure && isLight
      ? 'square__isTreasure'
      : isRock && 'square__isRock')
      }>
        {/* <img ref={} // treasure
        src={} // local..
        style={{position: 'absolute', width: '48px', zIndex: '-1', opacity: '0'}}
       /> */}
      
      {
        children && !herePartner ? children // React.createElement is the best
        : moveFromShadow && herePartner ? children
        : showOnSecond && herePartner ? children
        : herePartner && isLight ? children
        : `${y}, ${x}`
      }
    </div>
  )
}, ({y, x, children, isLight, isRock, isTreasure, underSpell, herePartner, moveFromShadow, showOnSecond}, nextProps) => {
  //console.log('%c%s', 'color: indigo; font-size:22px', 'THAT_CHILDREN:', children)
  //console.log('%c%s', 'color: indigo; font-size:22px', 'THAT_NEXT_PROPS:', nextProps)

  const checkUnderSpell = (prevUnder, nextUnder) => {
    if(y=== 1 && x===8) {
      console.log('%c%s', 'color: gold; font-size:22px', 'THAT_PREV', prevUnder)
      console.log('%c%s', 'color: gold; font-size:22px', 'THAT_NEXT', nextUnder)
    }
    if(prevUnder.length === nextUnder.length) {
      let res = true
      prevUnder.forEach(({src},i) => {
        if(src !== nextUnder[i].src) {
          res = false
        }
      })
      return res;
    } else {
      return false
    }
  }
  const checkChildren = (prevChild, nextChild) => {
    if(React.isValidElement(prevChild) && React.isValidElement(nextChild)) {
      return prevChild.props.id === nextChild.props.id
    } else if(React.isValidElement(prevChild) || React.isValidElement(nextChild)) {
      return false
    } else {
      return true
    }
  }
  const checkMoveFromShadow = (prevMove, nextMove) => {
    //console.log('%c%s', 'color: indigo; font-size:33px', 'THAT_MOVE:', move)
    return !!prevMove === !!nextMove // make complex check in future
  }

  let res = isLight === nextProps.isLight
  && isRock === nextProps.isRock 
  && isTreasure === nextProps.isTreasure
  && checkUnderSpell(underSpell, nextProps.underSpell)
  && checkChildren(children, nextProps.children)
  && herePartner === nextProps.herePartner
  && checkMoveFromShadow(moveFromShadow)
  && !!showOnSecond === !!nextProps.showOnSecond
  return res 
})

export default Square