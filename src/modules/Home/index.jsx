import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import anime from 'animejs'
import classNames from 'classnames'

import { Button } from 'antd'
import { Dialogs, Chat, Heroes, Progress } from '@/components'
import SignIn from '../SignIn'

import {makeSlide, overMakeSlide, registControl} from '@/actions/base'
import { fetchHeroes } from '@/actions/network'

import './Home.scss'

const HomeHoc = ({makeSlide, overMakeSlide, show, nowIsReg, registControl, fetchHeroes}) => {
  const [homeHid, setHomeHid] = useState(false)
  const homeRef = useRef(null)

  useEffect(() => {
    if(!window.localStorage['heroes']) {
      fetchHeroes()
    }
  })
  if(show) {
    const pass = show === 'game'
    anime({
      targets: homeRef.current,
      translateX: pass ? -window.innerWidth : 0,
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
  
  const registHandler = () => {
    console.log('START_REG')
    registControl()
  }

  return(
    <div className={classNames('home', homeHid && 'home__hidden')} ref={homeRef}>
      {
        nowIsReg && <SignIn />
      }
      <div className='home__header'>
        <span className='home__header_logo'>Hero or Zero</span>
        <div className='home__header_reg'>
          <Button type='primary' onClick={() => registHandler()}>REG/LOG</Button>
        </div>
      </div>
      <div className='home__firstTab'>
        <Dialogs /> 
        <div className='home__firstTab__gameState'>
          <Progress />
          <Heroes />
          <Chat />
        </div>
      </div>
      <div className='home__footer'>
        FOOTER BY DENILAY
      </div>
    </div>
  )
}

export default connect(({admin: {show, nowIsReg}}) => ({show, nowIsReg}), {makeSlide, overMakeSlide, registControl, fetchHeroes})(HomeHoc)