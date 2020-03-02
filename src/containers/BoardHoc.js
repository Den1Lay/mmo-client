import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import anime from 'animejs'
import classNames from 'classnames'

import Board from './Board'
import ActionBar from './ActionBar'
import { Button } from 'antd'

import { makeSlide, overMakeSlide } from '@/actions/base'
import { partnerAnimeMove, transformFunc, partnerStartSpell, spellTo, partStartAttack, deleteDeadBoys } from '@/actions/game'
import { dropData } from '@/actions/network'
import { SpellBtn } from '@/components'
import { socket } from '@/core'

import arrow from '../img/umbrells.png'
import arrow1 from '../img/arrow.png'

const BoardHoc = (
  {
    partnerAnimeMove, 
    partnerStartSpell,
    spellTo,
    show, makeSlide, 
    overMakeSlide, 
    transformFunc, 
    transformStaff, 
    me, dropData,
    act, actTick,
    stateHistory,
    partStartAttack, 
    myDeadBoys, partDeadBoys,
    deleteDeadBoys, energy,
    whoseMove
  }) => {
  const [boardHid, setBoardHid] = useState(true)
  const [deleting, setDeleting] = useState(false)
  //const [exp, setExp] = useState(null)
  const mainRef = useRef(null)
  const moveHandler = () => {
    makeSlide('home')
  }
  
  useEffect(() => {
    if((myDeadBoys.length > 0 || partDeadBoys.length > 0) && !deleting) {
      //  debugger
      setTimeout(() => {
        deleteDeadBoys();
        setDeleting(false)
      }, 1300)
      setDeleting(true)
    }
    
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
  // pass 
  //console.log('VISIBILITY:', pass)
  //console.log('FUNK:', func)
  return (
    <div className={classNames('game')} ref={mainRef}>
      <Board />
      <div className='game__rightTab'> 
        <span style={{color: 'crimson', fontSize: '22px'}}>{whoseMove === 'my' ? "YOU'R MOVE" : "PARTNER MOVE"}</span>
        <span className='energyBar'>{energy}</span>
        <Button type='default'>END_TURN</Button>
      </div>
      <div className='game__upLeftTab'>
        <Button type='danger' disabled={show === 'home'} onClick={() => moveHandler()}>CHANGE</Button>
        <Button type='primary' onClick={() => dropData(
          { // отправка данных на mongodb
            func: func.toString(), 
            visibility
          })}>INS</Button>
          
      </div>
      <div className='game__topRightTab'>
        <Button type='primary' onClick={() => {
            console.log('CLIIIIICK')
            partnerAnimeMove({id: 'DKnight1', y: 3, x: 7, fY: 2, fX: 9}) //, isDrag: false
            //socket.emit('GET_URL')
        }}>$$$</Button>
        <Button type='link' onClick={() => {
          // isLight.some(({}) => payload.x === newX && payload.y === newY)
          partnerStartSpell({id: 'DKnight1', y: 3, x: 7, spellInd: 0, withAnime: true, show: false}) // superShow
          //spellTo()
        }}>
          $PELL
        </Button>
        <hr />
        <Button type='danger' onClick={() => {
          partStartAttack({id: 'DKnight1', y: 3, x: 4, aim: null, withAnime: true})
        }}>
          ATTACK
        </Button>
      </div>
      <div className='game__bottomLeftTab'>
        <ActionBar />
      </div>
    </div>
  )
}

export default connect(({admin: {show}, game: {transformStaff, me, act, actTick, stateHistory, myDeadBoys, partDeadBoys, energy, inAir, whoseMove}}) => ({show, transformStaff, me, act, actTick, stateHistory, myDeadBoys, partDeadBoys, energy, inAir, whoseMove}),
{ partnerAnimeMove, makeSlide, overMakeSlide, transformFunc, dropData, partnerStartSpell, spellTo, partStartAttack, deleteDeadBoys})(BoardHoc)