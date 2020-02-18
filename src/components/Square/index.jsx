import React, {useRef, useEffect, useState} from 'react';
import classNames from 'classnames'
import Color from 'color'

import lightPlace from '@/img/LightPlace.png'
import darkPlace from '@/img/DarkPlace.png'

import './Square.scss'
                                                                      // underSpell will src
const Square = ({x, y, children, overlay, isLight, isRock, isTreasure, underSpell, herePartner, mouseEvent, moveFromShadow}) => {
  //overlay && x === 8 && y === 1 && console.log('OOOOOOOOOOOOOVVVVVVVVVVVEEEEEEEEEEEERL',overlay)
  const mainRef = useRef(null)
  // useEffect(() => {
    //console.log('%c%s', 'color: blue; font-size: 20px', `RE_RENDER_SQUARE: x: ${x}, y: ${y}`)
    //underSpell  = {rgb, src}
    useEffect(() => {
      if(underSpell.length > 0) {
        console.log('%c%s','color: green; font-size: 22px;','GET_NEW_UNDER_SPELL:', underSpell)
        mainRef.current.style['background'] = Color(underSpell[0].color)
      } else {
        mainRef.current.style['background'] = '';
      }
    })
    // if(isLight && !lightState) {
    //   let progress = 100
    //   let lightMalyr = () => {
    //     if(progress > 0) {
    //       progress--
    //       darkRef.current.style.opacity = progress/100+'';
    //       lightRef.current.style.opacity = 1 - progress/100+'';
    //       setTimeout(() => lightMalyr(), 10)
    //     } else {
    //       setLightState(true)
    //     }
    //   }
    //   lightMalyr()
    // }
    // if(!isLight && lightState) { // state is saved
    //   let darkProgress = 100
    //   let darkMalyr = () => {
    //     if(darkProgress > 0) {
    //       darkProgress--
    //       darkRef.current.style.opacity = 1 - darkProgress/100+'';
    //       lightRef.current.style.opacity = darkProgress/100+'';
    //       setTimeout(() => darkMalyr(), 10)
    //     } else {
    //       setLightState(false)
    //     }
    //   }
    //   darkMalyr()
    //   // make smoke
    // }
  //})
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
       />
        <img ref={}  // spell
        src={} // local..
        style={{position: 'absolute', width: '48px', zIndex: '-1', opacity: '0'}}
       />
        <img ref={}  // rock
        src={} // local..
        style={{position: 'absolute', width: '48px', zIndex: '-1', opacity: '0'}}
       /> */}
        
         {/* <img ref={lightRef}
        src={lightPlace} // local..
        style={{position: 'absolute', width: '52  px', zIndex: '-1', opacity: '0'}}
       /> */}
       {/**
        * <div ref={lightRef} style={{position:'absolute', width: '52px', height: '52px', zIndex: '-1', opacity: '0', backgroundColor: '#8be2ff'}}/>
        * <div ref={darkRef} style={{position:'absolute', width: '52px', height: '52px', zIndex: '-1', opacity: '1', backgroundColor: '#00BFFF'}}/>
        */}
       {/* <img ref={darkRef}
        src={darkPlace} // local..
        style={{position: 'absolute', width: '52px', zIndex: '-1', opacity: '1'}}
       /> */}
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