import React, {useState, useRef, useEffect} from 'react'
import { useDrag } from 'react-dnd'
import { connect, batch } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, animeMoveHandler, moveTo, takeTreasure, prepareTo, partnerMoveTo, spellTo, attackTo, cleanAfterPartSpell} from '@/actions/game'
import './Knight.scss'

const Knight = React.memo((
  {
    id, me, partner,
    inAir,
    simbol,
    isPartner,
    y: Y, x: X,
    addToAir,
    deleteFromAir, 
    moveTo,
    animeMoveHandler,
    animeMove, 
    takeTreasure, 
    takeIt, 
    prepareTo, 
    canAttack, 
    canSpell,
    attackTo,
    mouseEvent,
    moveFromShadow, // {y, x}
    partnerMoveTo,
    spellTo,
    spellAnimations,
    animeAttack,
    cleanAfterPartSpell,
    //showOnSecond
  }) => {
  //console.log('I_D_:',id)
  Y === 3 && X === 7 && console.log('%c%s', 'color: lightblue; font-size: 55px;', 'REEEE_RENDER__BECOUSE:', {inAir, animeMove, canAttack, spellAnimations, animeAttack, me, partner})
 

  if(moveFromShadow) {
    //console.log(`MOVE_FROM_SHADOW y:${Y} x:${X}`,moveFromShadow)
  }
  if(animeMove) {
    //console.log(`ANIME_MOVE:`, animeMove)
  }
  if(isPartner){
    //console.log('ISSSSSSSSSPPPPPPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAAAAAAAAAAARRRRRRRRT')
  }
  //const [action, setAction] = useState(true)
  const [spellReady, setSpellReady] = useState(false)
  const [animeTick, setAnimeTick] = useState(false)
  const [xp, setXp] = useState(null)

  const heartRef = useRef(null)
  const mainRef = useRef(null)
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const thirdRef = useRef(null)
  const fourthRef = useRef(null)
  const fifthRef = useRef(null)

  let refStorage = [firstRef, secondRef, thirdRef, fourthRef, fifthRef]
  let particles = [
    <img ref={firstRef} 
      src={'https://sun9-40.userapi.com/c841028/v841028013/36cf8/LWcgCtaFt5A.jpg?ava=1'}
      style={{display: 'none', position: 'absolute', width: '20px'}}
      onClick={(ev) => {
      ev.stopPropagation()
      firstRef.current.src = ''
      console.log('GREAT_DIR:', firstRef.current.src )
    }}/>,
    <img ref={secondRef} 
      style={{display: 'none', position: 'absolute'}}/>,
    <img ref={thirdRef} 
      style={{display: 'none', position: 'absolute'}}/>,
    <img ref={fourthRef} 
      style={{display: 'none', position: 'absolute'}}/>,
    <img ref={fifthRef} 
      style={{display: 'none', position: 'absolute'}}/>,
    // <div ref={secondRef} style={
    //   {
    //     position: 'absolute', 
    //     bottom: '0px', 
    //     width: '50px', height: '50px', 
    //     backgroundColor: 'gold',
    //     borderRadius: '30%',
    //     opacity: '0',
    //     backgroundImage: "https://sun9-40.userapi.com/c841028/v841028013/36cf8/LWcgCtaFt5A.jpg?ava=1",  
    //   }}>11</div>
  ]
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
          debugger
          animeMoveHandler({y, x, isDrag: true})
          moveTo()
          if(isTreasure) {
            setTimeout(() => takeTreasure({y, x}),1000)
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
    // if(showOnSecond && !shadow) { // go throug ref....... 
    //   shadow = true // go throung setTimeout..
    // }  else if (showOnSecond && shadow) {
    //   //spell here

    // }
    if(isPartner) {
    } else {
      //debugger
      let meObj
      me.forEach(({id: ID}, i) => {
        if(id === ID) {
          meObj = me[i]
        }
      })
  
      console.log('%c%s', 'color: gold; font-size: 44px;', `X:${X}, Y: ${Y} ID: ${id}__ ME_OBJ:`,meObj)
      if(xp === null) {
        setXp(meObj.xp)
      } else if(meObj && xp > meObj.xp && !spellAnimations) { // nice obxod well well..
        // let workCurrent = firstRef.current;
        // workCurrent.style.opacity = 1;
        // workCurrent.style.display = 'block';
        // workCurrent.src = 'data:image/png;base64,'+window.localStorage.mainSrc+'';
        // workCurrent.style.width = '20px'
        
        anime({
          targets: heartRef.current, //transition on timeline to zero in 60%
          translateY: [0, 400], // from args (y-Y)*52
          //opacity: [1, 0],
          //translateX: [0, -300], // from args (x-X)*52
          duration: 1200,
          //easing: 'spring(1, 90, 12, 0)',
          complete: anim => {  // may take 90% event
            if(anim.completed) {
              setXp(meObj.xp)
            }
          }
        });
      }
    }
    //takeIt && takeTreasure({y:Y, x:X})
    console.log('CHECK_REFS:', firstRef)
    if(moveFromShadow) { mainRef.current.style['opacity'] = '0' }
    if(animeMove && animeMove.id === id || moveFromShadow) {
      const {y, x, shadow} = animeMove || moveFromShadow
      //console.log('IS HAPPENED')
     console.log('%c%s', 'color: midnightblue; font-size: 33px;','ITS_HAPPENED')
     // console.log("%cExample %s", css, 'all code runs happy');
      //console.info('%c%s','color: red; font: 20px Verdana;','MAIN_ANIME_REF:',mainRef.current)
      anime({
        targets: mainRef.current, //transition on timeline to zero in 60%
        translateY: [0, (y-Y)*52],
        translateX: [0, (x-X)*52],
        duration: 1200,
        easing: 'spring(1, 90, 12, 0)',
        complete: anim => {  // may take 90% event
          if(anim.completed) {
            console.log('ISTIME')
            !isPartner ? moveTo({y, x}) : partnerMoveTo({id, y, x})
          }
        },
        update: anim => {
          if(shadow) { mainRef.current.style['opacity'] = 1/anim.progress+''}
          if(moveFromShadow) { mainRef.current.style['opacity'] = anim.progress*0.01+''}
        }
      });
    }
    //console.log('%c%s', 'color: orange; font: 40px; ','ANIME_TiCK:', animeTick)
    //console.log('SPELL_ANIMATIONS', spellAnimations)
    if(spellAnimations && spellAnimations.personId === id ) {
      console.log('SPELL_ANIMATIONS:INSIDE')
      if(particles.length === 0) {
        // let refs = [];
        // let elements = [];
        // spellAnimations.particles.forEach(({ width, height, color, src }, i) => { 
        //   let newRef = refs[i]
        //       const SuperParticle = ({ref, src, width, height, color}) => {
        //         return(
        //           <div ref={ref} style={{width, height, backgroundColor: color, position: 'absolute', borderRadius: '50%'}}>
        //             {src && <img src={src} alt='kek'/>}
        //           </div>
        //         )
        //       }
        //   let readyParticle = SuperParticle({ref: newRef, src, width, height, color})
        //   refs.push(newRef)
        //   elements.push(readyParticle)
          
        // });
        //setParticles({refs, elements}); // pass.particles
      } else {
        //console.log('CHECK_PARTICLES:', particles)
        //console.log('CHECK_REFS:', secondRef)
        
          // setAnimeTick(true)
          console.log('%c%s', 'color: orange; font: 40px; ','ANIME_TICK_AFTER:', animeTick)
          spellAnimations.animeFunc({particles: refStorage, knight: mainRef, args: spellAnimations.animeArg, anime, spellTo, cleanAfterPartSpell})
        }
        
      }
      if(animeAttack && animeAttack.id === id) {
        const {y, x, type} = animeAttack;
        let workCurrent = firstRef.current

        workCurrent.style.opacity = 1;
        workCurrent.style.display = 'block';
        workCurrent.src = 'data:image/png;base64,'+window.localStorage.mainSrc+'';
        workCurrent.style.width = '20px'
        anime({
          targets: workCurrent, //transition on timeline to zero in 60%
          translateY: [0, (y-Y)*52],
          translateX: [0, (x-X)*52],
          duration: 1600,
          easing: 'spring(1, 90, 12, 0)',
          complete: anim => {  // may take 90% event
            if(anim.completed) {
              console.log('ISTIME')
              !isPartner ? attackTo() : partnerMoveTo({id, y, x})

            }
          },
          update: anim => {
            
          }
        })
      }
    } // невидимые партиклы, которые изменяются за счет реф
  );
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
    //canSpell.length === 0 
    if( spellReady ) {
      prepareTo('SPELL', null)
      setSpellReady(false)
    } else {
      prepareTo('SPELL', ind)
      setSpellReady(true)
    }
    // removeSpell
    //console.log('PREPATE_TO_SPELL: ',id)
    
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
        //showOnSecond && 'knight__goToShadow'
    )}
    >
      <div ref={mainRef}>
      {simbol}
      </div>
      {particles}
      <div ref={heartRef} className={'heart'}>{xp}</div>
      {inAir && inAir.id == id ? <div className={classNames('buttleButton','buttleButton__attack' )} onClick={controlHandler}/> : null}
      {spells && inAir.id == id ? <div className='spellArea'>{spells}</div> : null}
    </div>
  )
}, ({X, Y, me, partner, inAir, animeMove, canAttack, spellAnimations, animeAttack, moveFromShadow}, nextData) => {
  const checkPass = (old, newPass) => {
    if(old.length === newPass.length) {
      let res = false;
      old.forEach(({v}, i) => {
        if(v !== newPass[i].v) {
          res = true
        }
      })
      return res;
    } else {
      return true
    }
  }
  //debugger
  let mainRes = true
  if(checkPass(me, nextData.me)) {
    mainRes = false
  } else if(checkPass(partner, nextData.partner)) { //
    mainRes = false
  } else if(!!inAir !== !!nextData.inAir) {
    mainRes = false
  } else if(inAir && nextData.inAir && (inAir.id !== nextData.inAir.id)) {
    mainRes = false
  } else if(!!animeMove !== !!nextData.animeMove) {
    mainRes = false
  } else if(animeMove && nextData.animeMove && (animeMove.id !== nextData.animeMove.id)) {
    mainRes = false
  } else if(!!spellAnimations !== !!nextData.spellAnimations) {
    mainRes = false
  } else if(!!moveFromShadow !== !!nextData.moveFromShadow) {
    mainRes = false
  }

//console.log("%c%s", 'color: crimson; font-size: 33px;', `X:${X}, Y: ${Y} THAT_RES:`, res)
  return mainRes

})
// слежение за собственным хп
export default connect(({game: {inAir, animeMove, canAttack, spellAnimations, animeAttack, me, partner}}) => ({inAir, animeMove, canAttack, spellAnimations, animeAttack, me, partner}), 
{addToAir, deleteFromAir, moveTo, animeMoveHandler, takeTreasure, prepareTo, partnerMoveTo, spellTo, attackTo, cleanAfterPartSpell})(Knight)