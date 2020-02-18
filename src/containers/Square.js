import React, {useState, useRef, useEffect} from 'react';
import { useDrop } from 'react-dnd'
import store from '@/store'
import anime from "animejs";
import classNames from 'classnames'

import { moveTo, animeMoveHandler, kamickAttack, spellTo, nextClick, startSpell, startAttack, takeTreasure} from '@/actions/game'

import { 
  Square as SquareBase,
  Knight
 } from '@/components'

import './timeScss.scss'

const Square = function({y, x, me, partner, canMove, isLight, isRock, isTreasure, isAttacked, canSpell, spellAnime, moveFromShadow}) {
  
  if(spellAnime) { 
    const {color, src} = spellAnime
    //console.log("SPELL_ANIME:", spellAnime)
  }
  console.log('%c%s', 'color: navy; font-size: 15px;',`REALY_WAS_UPDATE: Y:${y}, X:${x}`, spellAnime)
  // show and hide use true, false or do nothig if null
  //console.log(`PARTNERARR y: ${y}, x: ${x}:`, partner)
  //console.log(`MEEEEEEEEE y: ${y}, x: ${x}:`, me)
  //y === 12 && x === 9 && console.log(`NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|NEW_PACKAGE|X:${x}, Y:${y}`, partner)
  const flyUnitRef = useRef(null);
  //const actionRef = useRef(null);
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

  let backColor = canSpell
  ? canSpell : isAttacked
  ? {r: 180, g:0, b:0} : isOver && !canDrop
  ? {r:255, g:0, b:0} : !isOver && (canDrop || canMove)
  ? {r:0, g:128, b:0} : isOver && canDrop
  ? {r:255, g:215, b:0} : null

  const [first, setFirst] = useState(null)
  const [workSquare, setWorkSquare] = useState({id: null, payload: null, relictProps: {
    moveFromShadow: null,  // may be bag
    isLight: null,
    isRock: null,
    isTreasure: null,
    underSpell: [], // here real bag he dont let start re render
    herePartner: null,
  }})
  if(x === 7 && y === 3) {
    debugger
  }
  //const [prepareTarget, setstate] = useState(false)
  const smokeRef = useRef(null)
  let place = null;
  let herePartner = false;
  let hereMe = false;
  let flyUnit = null;
  //console.log('ME',me) // КАК РАБОТАЮТ СПЕЛЫ???? ()
  const checkSpells = (fromRelict, newSpell) => {
    console.log('%c%s', 'color: orange; font-size: 10px', `INSIDE_CHECK: ${newSpell} and NEW: relict: `,fromRelict )
    if(fromRelict.length === newSpell.length) {
      let res = false;
      fromRelict.forEach(({src}, i) => {
        if(src !== newSpell[i].src) {
          res = true
        }
      })
      return res;
    } else {
      return true;
    }
  }
  const checkRelictProps = () => {
    //console.log('%c%s', 'color: aqua; font-size: 22px', `Y:${y}, X:${x} And Another one`)
    let relictProps = workSquare.relictProps
    if(x === 8 && y === 1) {
      console.log('%c%s', 'color: orange; font-size: 10px',`INSIDE_CHECK
    moveFromShadow: ${!!relictProps.moveFromShadow} and ${!!moveFromShadow}, res: ${!!relictProps.moveFromShadow !== !!moveFromShadow};
    isLight ${relictProps.isLight} and ${isLight}, res: ${relictProps.isLight !== isLight};
    isRock: ${relictProps.isRock} and ${isRock}, res: ${relictProps.isRock !== isRock};
    underSpell: ${checkSpells(relictProps.underSpell, spellAnime)};
    `)
    }
    if(
      !!relictProps.moveFromShadow !== !!moveFromShadow || // may be bag
      relictProps.isLight !== isLight || 
      relictProps.isRock !== isRock ||
      relictProps.isTreasure !== isTreasure ||
      checkSpells(relictProps.underSpell, spellAnime) || // here real bag he dont let start re render or another... in another
      !!relictProps.herePartner !== !!herePartner
    ) {
      return true
    } else {
      return false
    }
  }

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
              place = <Knight   //он сам вытащит все шо надо...
                mouseEvent={(pass) => mouseHereHandl(pass)} 
                id={id} 
                simbol={'♞'} 
                y={y} x={x} 
                takeIt={isTreasure}
                moveFromShadow={moveFromShadow}
                isPartner={isPartner}/> //name of picture to use React.lazy
          }
          
          
          if(workSquare.id !== id || checkRelictProps() || (!herePartner && !hereMe)) {
            x === 8 && y === 1 && console.log('%c%s', 'color: red; font-size: 33px', `RE_RENDOR_TROUNBLE: 1: ${workSquare.id !== id}, 2: ${checkRelictProps()} X:${x}, Y:${y}`) 
            setWorkSquare(
              {
                id, 
                payload: <SquareBase y={y} x={x} 
                            moveFromShadow={moveFromShadow}
                            //overlay={backColor}
                            isLight={isLight}
                            isRock={isRock}
                            isTreasure={isTreasure}
                            underSpell={spellAnime}
                            //isAttacked={isAttacked}
                            herePartner={herePartner}
                            mouseEvent={(pass) => mouseHereHandl(pass)}
                            >
                            {place}
                          </SquareBase>, 
                relictProps: {
                  moveFromShadow,
                  //overlay:backColor,
                  isLight,
                  isRock,
                  isTreasure,
                  underSpell:spellAnime,
                  herePartner
                }
              }
            )
          }
        } else {
            flyUnit = <Knight id={id} simbol={'♞'} y={y} x={x} takeIt={isTreasure} isPartner={isPartner} moveFromShadow={moveFromShadow}/>
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
      console.log('PARTNEEEEEEEEEEEEEER: ',herePartner)
      console.log('ME: ',hereMe)
    }
    let firstIsP = first.substr(0,1) === 'D'

      let dmg = firstIsP ? maxXp*0.25 : maxXpp*0.25
      let myXpRes = xp - dmg;
      let partnerXpRes = xpp - dmg;
      //console.log(`RESSSSSSSSSSSSSSSSSSSSSSSOLT XXXXXXXXXXXP MY: ${myXpRes}, partner: ${partnerXpRes}`)
      if(partnerXpRes <= 0 && myXpRes > 0) {
        if(firstIsP) {place = flyUnit; setFirst(id);} // уничтожил
        flyUnit = null
        store.dispatch(kamickAttack({me: {id, xp: myXpRes, Y, X, pY, pX}, deadP: {id:idp, Y:Yp, X:Xp}, partner: null, deadM: null}))
        //dispatch...
        //console.log('FLY_UNIT:', flyUnit)
        //console.log('LAAAAAAAAAAAAAAAAAST HAAAAAAAAAAAAAANDLER place:', place)
        
      } else if(partnerXpRes > 0 &&  myXpRes > 0) {
        //console.log('%c%s', 'color: navy; font: 18px Verdana;', `Y: ${pY}, X: ${pX}`)
        let YDir = firstIsP ? getNewDir(Y, pY) : getNewDir(Yp, pYp)
        let XDir = firstIsP ? getNewDir(X, pX) : getNewDir(Xp, pXp)
        let newY = firstIsP ? Y-YDir : Yp-YDir
        let newX = firstIsP ? X-XDir : Xp-XDir
        console.log('%c%s', 'color: navy; font: 18px Verdana;', `newY: ${newY}, newX: ${newX} YDir: ${YDir} XDir: ${XDir}`)
        anime({
          targets: flyUnitRef.current, //transition on timeline to zero in 60%
          translateY: [0, -(YDir*52)],
          translateX: [0, -(XDir*52)],
          duration: 600,
          loop: false,
          easing: 'easeInOutExpo',
          complete: anim => {// may take 90% event
            if(anim.completed) {
              flyUnit = null
              console.log(`firstIsP: ${firstIsP}`, {id:idp, xp:partnerXpRes, Y:newY, X:newX, pY:Yp, pX:Xp})
              //console.log(`Y: ${y}, X: ${x} HERE PARTNER: ${herePartner}, HERE ME: ${hereMe}`)
              store.dispatch(kamickAttack({
                  me: firstIsP ? {id, xp: myXpRes, Y:newY, X:newX, pY: Y, pX: X} : {id, xp: myXpRes, Y, X, pY, pX}, 
                  partner: firstIsP ? {id:idp, xp:partnerXpRes, Y:Yp, X:Xp, pY:pYp, pX:pXp} : {id:idp, xp:partnerXpRes, Y:newY, X:newX, pY:Yp, pX:Xp},
                  deadM: null,
                  deadP: null //checkLogic
              })) //after anime
            }
          }
        });
        // оба выжили
        //anime()
      } else if(partnerXpRes > 0 && myXpRes <= 0) {
        //уничтожился об противника me: {id, xp: myXpRes, Y, X, pY, pX}
        store.dispatch(kamickAttack({partner: {id:idp, xp: partnerXpRes, Y:Yp, X:Xp, pY:pYp, pX:pXp}, deadM: {id, Y, X}, me: null, deadP: null}))
        if(!firstIsP) {place = flyUnit; setFirst(idp);}
        flyUnit = null;
      } else {
        //оба анигилировались
        store.dispatch(kamickAttack({deadM:{id, Y, X}, deadP: {id:idp, Y:pYp, X:pXp}, me: null, partner: null}))
        flyUnit = null
        place = null
      }
  }
  if(x === 7 && y === 3) {
    debugger
    console.log('%c%s', 'color: red; font-size: 32px;', `Y:${y}, X:${x}, TRY_TO_UND, check: ${checkRelictProps()}, 
  ALL_CHECK: ${workSquare.payload === null || checkRelictProps() || (workSquare.id !== null && (!hereMe && !herePartner))},
  PAY:`, workSquare.payload)
  }
  if(workSquare.payload === null || checkRelictProps() || (workSquare.id !== null && (!hereMe && !herePartner))) {
    
    setWorkSquare({
      id: null, 
      payload: <SquareBase y={y} x={x} 
                  moveFromShadow={moveFromShadow}
                  //overlay={backColor}
                  isLight={isLight}
                  isRock={isRock}
                  isTreasure={isTreasure}
                  underSpell={spellAnime}
                  //isAttacked={isAttacked}
                  herePartner={herePartner}
                  mouseEvent={(pass) => mouseHereHandl(pass)}
                  >
                  {null}
                </SquareBase>, 
      relictProps: {
        moveFromShadow,
        //overlay:backColor,
        isLight,
        isRock,
        isTreasure,
        underSpell:spellAnime,
        herePartner
      }
    })
  }
  

  const {r, g, b} = canSpell
  let ripFlag = false
  const clickHandler = () => {  
    console.log('WORK_SQUARE:', workSquare)
    ripFlag = true
    // console.log(opct) rip logic
    let aim = place ? 'partner' : isRock ? 'rocks' : null;
    if( canMove ) { 
      if(isTreasure) {
        store.dispatch(animeMoveHandler({y, x, isDrag: false})) // объединение 2 событий???
        setTimeout(() => {store.dispatch(takeTreasure({y, x}))}, 1000)
      } else {
        store.dispatch(animeMoveHandler({y, x, isDrag: false})) 
      }
    }
    if( isAttacked ) { 
      console.log('TRY_TO_ATTACK')
      store.dispatch(startAttack({y, x, aim}));
     }
    if( canSpell ) {
      // let effect = new Promise((resolve, reject) => {
      //   let progress = 100
      //   let spellInt = setInterval(() => {
      //     progress = progress-3
      //     squareRef.current.style['boxShadow'] = `0px 0px ${5.5*progress}px ${1.5*progress}px rgba(${r}, ${g}, ${b}, ${progress/10})`;
      //   }, 45)
      //   setTimeout(() => {clearInterval(spellInt); squareRef.current.style['boxShadow'] = ''; resolve()}, 1500)
      // })
      // где план??
      // effect.then(() => {
        store.dispatch(startSpell({y, x}))
      // })
     }
    // socket.emit(~~{y, x}, inAir.id, spellInd)
  }
//  if(y === 8 && x === 0) {
//   console.log(`Y: ${y} X: ${x} END POOOOOOOOOOOOOOOOOOOOOOOOOOOINT RES partnerIsHere? ${herePartner}`, flyUnit)
//  }

// const [shadow, setShadow] = useState({payload: '',})
// const [anime, setAnime] = useState(false)
const squareRef = useRef(null)
//  const setShadowWithAnime = () => {
//    setAnime(true)
//  }
let mouseHere = false
 const setShadow = (r,g,b) => {
  let progress = 0

  const tick = () => {
    progress++
    if(mouseHere && !ripFlag) {
      squareRef.current.style['boxShadow'] = `0px 0px ${5.5*progress}px ${1.2*progress}px rgba(${r}, ${g}, ${b}, ${progress/10})`;
    }
    if(progress < 10 && !ripFlag) {
      setTimeout(() => tick(), 50)
    }
  }
  tick()
  //squareRef.current.style['boxShadow'] = `0px 0px ${5.5*progress}px ${1.2*progress}px rgba(${r}, ${g}, ${b}, ${progress/10})`;
 }

//  if(mouseHere) {
//   //canMove && shadow.color !== 'green' && setShadowWithAnime({payload: {boxShadow:'0px 0px 55px 10px rgba(23, 114,	69, 0.9)'}, color: 'green'})
//   //isAttacked &&
//   canMove && setShadow(23, 114, 69)
//   isAttacked && setShadow(139, 0, 0)
//   canSpell && setShadow(25, 25, 112)
//  } 

 const mouseHereHandl = (pass) => {
  //console.log('CAN_SPELL:', canSpell)
  if(pass) {
    mouseHere = true
      squareRef.current.style['zIndex'] = 2
      canMove && setShadow(23, 114, 69)
      isAttacked && setShadow(139, 0, 0)
      canSpell && setShadow(r, g, b)
  } else {
    mouseHere = false;
    ripFlag = false
    squareRef.current.style['boxShadow'] = '';
    squareRef.current.style['zIndex'] = '';
  }
 }
  const [gameParticles, setGameParticles] = useState([])  
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('USE_EFFECT_MOVE')
  //     if(gameParticles.length === 0) {
  //       // setGameParticles([<div style={{width: '20px', height: '20px', backgroundColor: 'orange'}}></div>])
  //     }
  //   }, 3000)
  // })
  // squareRef.current.style.boxShadow = ''
  // shadow.payload !== null && setShadow({payload: null, color: null})
  // useEffect(() => {
  //   if(first && isTreasure) {
  //     store.dispatch(takeTreasure({y, x}));
  //   }
  // })

  // smoke will here
// const smokeSetter = (manipExp, pass) => {
//   let smoker = () => {
//     smokeRef.current.style.opacity = manipExp
//     this.progress--
//     if(this.progress > 0) {
//       setTimeout(() => smoker.call(this, manipExp, pass), 10)
//     } else {
//       setSmoke(pass)
//     }
//   }
// } // что с this 
//  useEffect(() => {
//   let progress = 100
//    if(isLight && smoke) { // уход тени
//     smokeSetter.call(this, 1-this.progress/100+'', false)
//    } else if (!isLight && !smoke) { // подъем 
//     smokeSetter.call(this, this.progress/100+'', true)
//    }
//  })
  
  return (
    <div ref={drop}
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {/* <img ref={smokeRef} // preview spellAnime will here
        src={'data:image/png;base64,'+window.localStorage.smoke} // local..
        style={{position: 'absolute', width: '40px', zIndex: '2'}}
       /> */}
      <div 
        ref={squareRef}
        className={classNames('squareBase', mouseHere && 'squareBase__toUp')}
        onClick={clickHandler}
        onMouseEnter={() => mouseHereHandl(true)}
        onMouseOut={() => mouseHereHandl(false)}> 
        <div className={classNames('layout', 'layout__move', canMove && 'layout__show')}/>
        <div className={classNames('layout', 'layout__spell', canSpell && 'layout__show')}/>
        <div className={classNames('layout', 'layout__attack', isAttacked && 'layout__show')}/>
        {/* <SquareBase y={y} x={x} 
          moveFromShadow={moveFromShadow}
          //overlay={backColor}
          isLight={isLight}
          isRock={isRock}
          isTreasure={isTreasure}
          underSpell={spellAnime}
          //isAttacked={isAttacked}
          herePartner={herePartner}
          mouseEvent={(pass) => mouseHereHandl(pass)}
          >
          {place}
        </SquareBase> */}
        {workSquare.payload}
        {gameParticles}
        <div ref={flyUnitRef} className="flyUnit">
          {flyUnit}
        </div>
      </div>
    </div>
  )
}

export default Square

