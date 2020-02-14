import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import anime from 'animejs'
import classNames from 'classnames'

import Board from './Board'
import { Button } from 'antd'

import { makeSlide, overMakeSlide } from '@/actions/base'
import { partnerAnimeMove, transformFunc } from '@/actions/game'
import { dropData } from '@/actions/network'
import { SpellBtn } from '@/components'
import { socket } from '@/core'

import arrow from '../img/umbrells.png'
import arrow1 from '../img/arrow.png'

const BoardHoc = (
  {
    partnerAnimeMove, 
    show, makeSlide, 
    overMakeSlide, 
    transformFunc, 
    transformStaff, 
    me, dropData,
    act, actTick,
    stateHistory
  }) => {
  const [boardHid, setBoardHid] = useState(true)
  const mainRef = useRef(null)
  const moveHandler = () => {
    makeSlide('home')
  }
  //console.log('DEBAG_ME:', me)
  console.log('%c%s', 'color: gold; font-size: 33px', `ACT: ${act}, ACT_TICK: ${actTick}`, stateHistory)
  useEffect(() => {
    console.log('ARROW:', arrow)
    console.log('ARROW1:', arrow1)
    // let reader = new FileReader()
    // let res = reader.readAsDataURL(arrow)
    // console.log('GREAT_RES: ', res)
  })

  if(show) {
    const pass = show === 'home'
    anime({
      targets: mainRef.current,
      translateX: pass ? 0 : -window.innerWidth,
      //direction: 'alternate',
      duration: 3000,
      easing: 'spring(1, 80, 10, 0)',
      complete: anim => {
        if(anim.completed) {
          overMakeSlide()
          setBoardHid(pass)
        }

      }
    })
  }
  const visibility = me[0].visibility
  const func = me[0].spells[0].func
  //console.log('VISIBILITY:', pass)
  //console.log('FUNK:', func)
  return (
    <div className={classNames('game')} ref={mainRef}>
      <div className='game__rightTab'> 
        <Button type='primary' onClick={() => {
          console.log('CLIIIIICK')
          partnerAnimeMove({id: 'DKnight1', y: 3, x: 7, fY: 2, fX: 9})
          //socket.emit('GET_URL')
        }}>$$$</Button>
      </div>
      <Board />
      <div className='game__upLeftTab'>
        <Button type='danger' disabled={show === 'home'} onClick={() => moveHandler()}>CHANGE</Button>
        <Button type='primary' onClick={() => dropData(
          {
            func: func.toString(), 
            visibility
          })}>INS</Button>
      </div>
    </div>
  )
}

export default connect(({admin: {show}, game: {transformStaff, me, act, actTick, stateHistory}}) => ({show, transformStaff, me, act, actTick, stateHistory}),{ partnerAnimeMove, makeSlide, overMakeSlide, transformFunc, dropData})(BoardHoc)