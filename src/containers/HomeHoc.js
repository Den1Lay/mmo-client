import React, {useState, useRef} from 'react';
import { connect } from 'react-redux'
import anime from 'animejs'
import classNames from 'classnames'

import { Button } from 'antd'

import {makeSlide, overMakeSlide} from '@/store/actions'

const HomeHoc = ({makeSlide, overMakeSlide, show}) => {
  const [homeHid, setHomeHid] = useState(false)
  const homeRef = useRef(null)
  const moveHandler = () => {
    console.log("CLICK_HANDL")
    makeSlide('game')
  }

  if(show) {
    const pass = show === 'game'
    anime({
      targets: homeRef.current,
      translateX: pass ? 0 : window.innerWidth,
      //direction: 'alternate',
      duration: 1000,
      easing: 'easeOutExpo',
      complete: anim => {
        if(anim.completed) {
          overMakeSlide()
          setHomeHid(pass)
        }
        
      }
    })
  }

  return(
    <div className={classNames('homePage', homeHid && 'homePage__hidden')} ref={homeRef}>
      <Button type='danger' disabled={show === 'game'} onClick={() => moveHandler()}>CHANGE</Button>
    </div>
  )
}

export default connect(({admin: {show}}) => ({show}), {makeSlide, overMakeSlide})(HomeHoc)