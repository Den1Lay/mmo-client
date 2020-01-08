import React, {useState, useRef} from 'react';
import { useDrop } from 'react-dnd'
import store from '@/store'
import anime from "animejs";

import { moveTo, animeMove, attackTo, kamickAttack, spellTo } from '@/store/actions'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'

import './timeScss.scss'

const Square = ({y, x, me, partner, canMove, isLight, isRock, isTreasure, isAttacked, canSpell}) => {
  //console.log(`PARTNERARR y: ${y}, x: ${x}:`, partner)
  //console.log(`MEEEEEEEEE y: ${y}, x: ${x}:`, me)
  //console.log(`NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|X:${x}, Y:${y}`, partner)
  const flyUnitRef = useRef(null)
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'knight',
    drop: () => ({y, x, isTreasure}), //knight will take it,
    canDrop: () => canMove,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop:monitor.canDrop()
      //canDrop: monitor.canDrop()
    })
  })
  const [first, setFirst] = useState(null)
  let place = null;
  let herePartner = false;
  let hereMe = false;
  let flyUnit = null;
  //console.log('ME',me) // КАК РАБОТАЮТ СПЕЛЫ???? ()
  const preparePlace = ({array, isPartner}) => {
    array.forEach(({Y, X, id, pY, pX, xp, maxXp}) => {
      if(y === Y && x === X) {
        if (isPartner) {
          //console.log('HERE_PARTNER:', herePartner)
          herePartner = {Y, X, pY, pX, id, xp, maxXp}
          //console.log('HERE_PARTNER:', herePartner)
        }
        if (!isPartner) {hereMe = {Y, X, pY, pX, id, xp, maxXp}
          //console.log('HERE_ME', hereMe)
        }
        if(!first) {
          setFirst(id)
        }
        //console.log(`Inside Pass: y: ${y}, x: ${x}`)
        if(id === first) {
          switch(id.substr(1, 4)) {
            case 'Knig':
              place = <Knight id={id} simbol={'♞'} y={y} x={x} takeIt={isTreasure} isPartner={isPartner}/> //name of picture to use React.lazy
          }
        } else {
            flyUnit = <Knight id={id} simbol={'♞'} y={y} x={x} takeIt={isTreasure} isPartner={isPartner}/>
        }
      }
    })
  }
  // ПРОПСЫ ONLY СВЕРХУ ВНИЗ
  
  preparePlace({array: me, isPartner: false})
  preparePlace({array: partner, isPartner: true})
  if(first && !place) {
    setFirst(null)
  }
  if(herePartner && hereMe) {
    //logic

    const {Y, X, pY, pX, id, xp, maxXp} = hereMe
    const {Y: Yp, X: Xp, pY: pYp, pX: pXp, id: idp, xp: xpp, maxXp: maxXpp} = herePartner
    
    const getNewDir = (now, old) => {
      return now - old > 0
      ? 1
      : now - old < 0
        ? -1
        : 0
    }
    if(x === 0 && y === 8) {
      console.log('PARTNEEEEEEEEEEEEEER: ', herePartner)
      console.log('ME: ', hereMe)
    }
    if(first.substr(0,1) === 'D') {
      let dmg = maxXp*0.25
      let myXpRes = xp - dmg;
      let partnerXpRes = xpp - dmg;
      //console.log(`RESSSSSSSSSSSSSSSSSSSSSSSOLT XXXXXXXXXXXP MY: ${myXpRes}, partner: ${partnerXpRes}`)
      if(partnerXpRes <= 0 && myXpRes > 0) {
        place = flyUnit // уничтожил
        flyUnit = null
        store.dispatch(kamickAttack({me: {id, xp: myXpRes, Y, X, pY, pX}, deadP: {id:idp, Y:Yp, X:Xp}, partner: null, deadM: null}))
        setFirst(id)
        //dispatch...
        //console.log('FLY_UNIT:', flyUnit)
        //console.log('LAAAAAAAAAAAAAAAAAST HAAAAAAAAAAAAAANDLER place:', place)
        
      } else if(partnerXpRes > 0 &&  myXpRes > 0) {
        let YDir = getNewDir(Y, pY)
        let XDir = getNewDir(X, pX)
        let newY = Y-YDir;
        let newX = X-XDir;
        anime({
          targets: flyUnitRef.current, //transition on timeline to zero in 60%
          translateY: [0, -(YDir*52)],
          translateX: [0, -(XDir*52)],
          duration: 600,
          loop: false,
          easing: 'easeInOutExpo',
          complete: anim => {  // may take 90% event
            if(anim.completed) {
              flyUnit = null
              //console.log(`Y: ${y}, X: ${x} HERE PARTNER: ${herePartner}, HERE ME: ${hereMe}`)
              store.dispatch(kamickAttack({
                  me: {id, xp: myXpRes, Y:newY, X:newX, pY: Y, pX: X}, 
                  partner: {id:idp, xp:partnerXpRes, Y:Yp, X:Xp, pY:pYp, pX:pXp},
                  deadM: null,
                  deadP: null //checkLogic
              })) //after anime
            }
          }
        });
        // оба выжили
        //anime()
      } else if(partnerXpRes > 0 && myXpRes <= 0) {
        //уничтожился об противника       me: {id, xp: myXpRes, Y, X, pY, pX}
        store.dispatch(kamickAttack({partner: {id:idp, xp: partnerXpRes, Y:Yp, X:Xp, pY:pYp, pX:pXp}, deadM: {id, Y, X}, me: null, deadP: null}))
        flyUnit = null
      } else {
        //оба анигилировались
        store.dispatch(kamickAttack({deadM:{id, Y, X}, deadP: {id:idp, Y:pYp, X:pXp}, me: null, partner: null}))
        flyUnit = null
        place = null
        
      }
    }
  }
  let backColor = canSpell
  ? "indigo" : isOver && !canDrop
  ? "red" : !isOver && (canDrop || canMove)
  ? "yellow" : isOver && canDrop
  ? "green" : null

  const clickHandler = () => {
    let cause = place ? 'partner' : isRock ? 'rocks' : null;
    if( canMove ) { store.dispatch(animeMove({y, x})) }
    if( isAttacked ) { store.dispatch(attackTo({y, x, cause})) }
    if( canSpell ) { store.dispatch(spellTo({y, x}))}
    //socket.emit(~~{y, x}, inAir.id, spellInd)
  }
 if(y === 8 && x === 0) {
  console.log(`Y: ${y} X: ${x} END POOOOOOOOOOOOOOOOOOOOOOOOOOOINT RES partnerIsHere? ${herePartner}`, flyUnit)
 }
  return (
    <div 
      className='squareBase'
      ref={drop}
      onClick={clickHandler}>
      <SquareBase y={y} x={x} overlay={backColor} isLight={isLight} isRock={isRock} isTreasure={isTreasure} isAttacked={isAttacked} herePartner={herePartner}>
        {place}
      </SquareBase>
      <div ref={flyUnitRef} className="flyUnit">
        {flyUnit}
      </div>
    </div>
  )
}

export default Square