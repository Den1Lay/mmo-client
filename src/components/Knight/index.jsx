import React, {useState, useRef} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo } from '@/store/actions'

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
    mouseEvent
  }) => {
  console.log(inAir)
  takeIt && takeTreasure({y:Y, x:X})
  if(isPartner){
    //console.log('ISSSSSSSSSPPPPPPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAAAAAAAAAAARRRRRRRRT')
  }
  //const [action, setAction] = useState(true)
  const [prevSpell, setPrevSpell] = useState(null)
  const mainRef = useRef(null)
  console.log(`WRONG PROPS: y: ${Y}, x: ${X}`)
  let moveOnTreasure = false;

  console.log('React.ClonePass:', `${Y}, ${X}`)
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
  const clickHandler = () => {
    //onsole.log('CLIIIIIIIIIIICK HANDLER');
    // console.log(inAir);
    // console.log(inAir && (inAir.id !== id));
    if(inAir && (inAir.id !== id)) {
      deleteFromAir()
      setTimeout(() => addToAir({id, Y, X}), 0) //
    } else {
      inAir && inAir.id === id ? deleteFromAir() : addToAir({id, Y, X})
    }
  }

  if(animeMove && animeMove.id === id) {
    const {y, x} = animeMove
    console.log('IS HAPPENED')
    anime({
      targets: mainRef.current, //transition on timeline to zero in 60%
      translateY: [0, (y-Y)*52],
      translateX: [0, (x-X)*52],
      duration: 1200,
      easing: 'easeInOutExpo',
      complete: anim => {  // may take 90% event
        if(anim.completed) {
          console.log('ISTIME')
          moveTo({y, x})
          
        }
      }
    });
  }

  const controlHandler = (e) => {
    e.stopPropagation()
    canAttack.length === 0 ? prepareTo('ATTACK', null) : prepareTo('MOVE', null)
    //setAction(!action)
    console.log('LOOOOK')
  }

  const spellHandler = (e, ind) => {
    e.stopPropagation()
    console.log(canSpell)
    canSpell.length === 0 
    ? prepareTo('SPELL', ind) : prevSpell !== ind 
    ? prepareTo('SPELL', ind) : prepareTo('SPELL', null)  // removeSpell
    console.log('PREPATE_TO_SPELL: ',id)
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
        isPartner && 'knight__isPartner'
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

export default connect(({inAir, animeMove, canAttack, canSpell}) => ({inAir, animeMove, canAttack, canSpell}), {addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo})(Knight)