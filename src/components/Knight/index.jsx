import React, {useState, useRef, useEffect} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo, partnerMoveTo} from '@/store/actions'

import './Knight.scss'

const Knight = (
  {
    id,
    inAir,
    simbol,
    isPartner,
    y: Y, x: X,
    addToAir,
    deleteFromAir, 
    moveTo, 
    animeMove, 
    takeTreasure, 
    takeIt, 
    prepareTo, 
    canAttack, 
    canSpell,
    mouseEvent,
    moveFromShadow,
    partnerMoveTo
  }) => {
  //console.log(inAir)
  takeIt && takeTreasure({y:Y, x:X})

  if(moveFromShadow) {
    console.log(`MOVE_FROM_SHADOW y:${Y} x:${X}`,moveFromShadow)
  }
  if(animeMove) {
    console.log(`ANIME_MOVE:`, animeMove)
  }
  if(isPartner){
    //console.log('ISSSSSSSSSPPPPPPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAAAAAAAAAAARRRRRRRRT')
  }
  //const [action, setAction] = useState(true)
  const [prevSpell, setPrevSpell] = useState(null)
  const mainRef = useRef(null)
  //console.log(`WRONG PROPS: y: ${Y}, x: ${X}`)
  let moveOnTreasure = false;

  //console.log('React.ClonePass:', `${Y}, ${X}`)
  const [{isDragging, ...another}, drag] = useDrag({
    item: { type: 'knight', id},
    begin: monitor => {
      console.log({id, Y, X})
      addToAir({id, Y, X})  
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult) {
        const {y, x, isTreasure} = dropResult
        if(!(y === Y && x === X )) {
          moveTo({y, x})
          if(isTreasure) {
            takeTreasure({y, x})
            moveOnTreasure = true
          }
        }
        // 
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  useEffect(() => {
    if(moveFromShadow) { mainRef.current.style['opacity'] = '0' }
    if(animeMove && animeMove.id === id || moveFromShadow) {
      const {y, x, shadow} = animeMove || moveFromShadow
      //console.log('IS HAPPENED')
     
     // console.log("%cExample %s", css, 'all code runs happy');
      console.info('%c%s','color: red; font: 20px Verdana;','MAIN_ANIME_REF:',mainRef.current)
      anime({
        targets: mainRef.current, //transition on timeline to zero in 60%
        translateY: [0, (y-Y)*52],
        translateX: [0, (x-X)*52],
        duration: 1200,
        easing: 'easeInOutExpo',
        complete: anim => {  // may take 90% event
          if(anim.completed) {
            console.log('ISTIME')
            !isPartner ? moveTo({y, x}) : partnerMoveTo({id, y, x})
          }
        },
        update: anim => {
          if(shadow) { mainRef.current.style['opacity'] = 1/anim.progress+'' }
          if(moveFromShadow) { mainRef.current.style['opacity'] = anim.progress*0.01+''}
        }
      });
    }
  });
  const clickHandler = () => {
    // console.log('CLIIIIIIIIIIICK HANDLER');
    // console.log(inAir);
    // console.log(inAir && (inAir.id !== id));
    if(inAir && (inAir.id !== id)) {
      deleteFromAir()
      setTimeout(() => addToAir({id, Y, X}), 0) //
    } else {
      inAir && inAir.id === id ? deleteFromAir() : addToAir({id, Y, X})
    }
  }

  const controlHandler = (e) => {
    e.stopPropagation()
    canAttack.length === 0 ? prepareTo('ATTACK', null) : prepareTo('MOVE', null)
  }

  const spellHandler = (e, ind) => {
    e.stopPropagation()
    //console.log(canSpell)
    canSpell.length === 0 
    ? prepareTo('SPELL', ind) : prevSpell !== ind 
    ? prepareTo('SPELL', ind) : prepareTo('SPELL', null)  // removeSpell
    //console.log('PREPATE_TO_SPELL: ',id)
    setPrevSpell(ind)
  }

  let spells = null
  if(inAir) {
    spells = inAir.spells.map(({icon}, ind) => {
      return (
      <div className={classNames('buttleButton', 'buttleButton__spell')} onClick={(e) => spellHandler(e, ind)}>{icon}</div>
      )
    })
  }

  return (
    <div
    onMouseEnter={() => mouseEvent(true)}
    //onMouseOut={() => mouseEvent(false)}
    onClick={!isPartner ? clickHandler : () => ({})}
    ref={!isPartner ? drag : () => ({})}
    className={
      classNames('knight',
        isPartner && 'knight__isPartner', // либо в сразу anime...
    )}
    >
      <div ref={mainRef}>
      {simbol}
      </div>
      {inAir && inAir.id == id ? <div className={classNames('buttleButton','buttleButton__attack' )} onClick={controlHandler}/> : null}
      {spells && inAir.id == id ? <div className='spellArea'>{spells}</div> : null}
    </div>
  )
}

export default connect(({inAir, animeMove, canAttack, canSpell}) => ({inAir, animeMove, canAttack, canSpell}), {addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo, partnerMoveTo})(Knight)