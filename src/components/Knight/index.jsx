import React, {useState, useRef, useEffect} from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import anime from "animejs";

import { addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo, partnerMoveTo, spellTo, attackTo, endSpell} from '@/actions/game'
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
    attackTo,
    mouseEvent,
    moveFromShadow,
    partnerMoveTo,
    spellTo,
    spellAnimations,
    animeAttack,
    endSpell
  }) => {
  //console.log('I_D_:',id)
  console.log('%c%s', 'color: blue; font: 1.3rem/2;', 'REEEE_RENDER__ANIME_ATTACK:', animeAttack)
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
  const [spellReady, setSpellReady] = useState(false)
  const [animeTick, setAnimeTick] = useState(false)
  const mainRef = useRef(null)
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const thirdRef = useRef(null)
  const fourthRef = useRef(null)
  const fifthRef = useRef(null)

  let refStorage = [firstRef, secondRef, thirdRef, fourthRef, fifthRef]
  let particles = [
    <img ref={firstRef} 
      style={{opacity: 0, position: 'absolute', bottom: '0px'}}
      onClick={(ev) => {
      ev.stopPropagation()
      firstRef.current.src = ''
      console.log('GREAT_DIR:', firstRef.current.src )
    }}/>,
    <img ref={secondRef} 
      style={{opacity: 0, position: 'absolute', bottom: '0px'}}/>,
    <img ref={thirdRef} 
      style={{opacity: 0, position: 'absolute', bottom: '0px'}}/>,
    <img ref={fourthRef} 
      style={{opacity: 0, position: 'absolute', bottom: '0px'}}/>,
    <img ref={fifthRef} 
      style={{opacity: 0, position: 'absolute', bottom: '0px'}}/>,
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
    console.log('CHECK_REFS:', firstRef)
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
    console.log('%c%s', 'color: orange; font: 40px; ','ANIME_TiCK:', animeTick)
    console.log('SPELL_ANIMATIONS', spellAnimations)
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
        console.log('CHECK_PARTICLES:', particles)
        console.log('CHECK_REFS:', secondRef)
        // anime({
        //   targets: refStorage[0].current, //transition on timeline to zero in 60%
        //   translateY: [0, -200], // from args (y-Y)*52
        //   translateX: [0, -300], // from args (x-X)*52
        //   duration: 1200,
        //   //easing: 'spring(1, 90, 12, 0)',
        //   complete: anim => {  // may take 90% event
        //     if(anim.completed) {  
        //       console.log('ISTIME')
        //       spellTo()
        //     }
        //   },
        //   update: anim => {
            
        //   }
        // });
          // setAnimeTick(true)
          console.log('%c%s', 'color: orange; font: 40px; ','ANIME_TICK_AFTER:', animeTick)
          spellAnimations.animeFunc({particles: refStorage, knight: mainRef, args: spellAnimations.animeArg, anime, spellTo, endSpell})
        }
        
      }
      if(animeAttack && animeAttack.id === id) {
        const {y, x, type} = animeAttack;
        let workCurrent = firstRef.current

        workCurrent.style.opacity = 1
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
    )}
    >
      <div ref={mainRef}>
      {simbol}
      </div>
      {particles}
      {inAir && inAir.id == id ? <div className={classNames('buttleButton','buttleButton__attack' )} onClick={controlHandler}/> : null}
      {spells && inAir.id == id ? <div className='spellArea'>{spells}</div> : null}
    </div>
  )
}

export default connect(({game: {inAir, animeMove, canAttack, spellAnimations, animeAttack}}) => ({inAir, animeMove, canAttack, spellAnimations, animeAttack}), 
{addToAir, deleteFromAir, moveTo, takeTreasure, prepareTo, partnerMoveTo, spellTo, attackTo, endSpell})(Knight)