import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { ActionPoint } from '@/components';
import { prepareTo } from '@/actions/game';

//import move from '@/img/move.png'

import './timeScss.scss'

const ActionBar = ({inAir, prepareTo, energy, canMove, canAttack, canSpell}) => {
  const [oldSrc, setOldSrc] = useState({move: null, attack: null, spell: null})
  const [startSpell, setStartSpell] = useState({move: false, attack: false, spell: false})
  const clickHandl = (pass) => {
    energy > 0 && inAir && prepareTo(pass, pass === 'SPELL' ? 0 : null)
  };
  const opacityMod = (pass) => {
    setStartSpell({...startSpell, [pass]: !startSpell[pass]})
  }
  useEffect(() => {
    if(inAir && oldSrc.spell !== inAir.spells[0].src) {
      setOldSrc(
        {
          move: inAir.move.src,
          attack: inAir.attack.src,
          spell: inAir.spells[0].src,
        })
    }
    let mainListerner = (ev) => {
      switch(ev.code) {
        case 'KeyQ':
          canMove.length === 0 && clickHandl('MOVE');
          break;
        case 'KeyW':
          canAttack.length === 0 && clickHandl('ATTACK');
          break;
        case 'KeyE':
          canSpell.length === 0 && clickHandl('SPELL');
          break;
      }
      console.info("THAT_LISTENER:", ev)
    }
    document.addEventListener('keydown', mainListerner)
    return () => {
      document.removeEventListener('keydown', mainListerner)
    }
  })  
  //debugger 
  // for spell another map
  // если с обычным update 

  // const controlHandler = (e) => {
  //   e.stopPropagation()
  //   canAttack.length === 0 ? prepareTo('ATTACK', null) : prepareTo('MOVE', null)
  // }
  // const spellHandler = (e, ind) => {
  //   e.stopPropagation()
  //   //console.log(canSpell)
  //   //canSpell.length === 0 
  //   if( spellReady ) {
  //     prepareTo('SPELL', null)
  //     setSpellReady(false)
  //   } else {
  //     prepareTo('SPELL', ind)
  //     setSpellReady(true)
  //   }
  //   // removeSpell
  //   //console.log('PREPATE_TO_SPELL: ',id)
  // }

  return (
    <div className='actionBar'>
      <ActionPoint actionPass={() => canMove.length === 0 && clickHandl('MOVE')} 
      simbol={'M'} 
      //back={inAir ? 'linear-gradient(45deg, #228B22, #1E90FF);' : null} 
      src={inAir ? inAir.move.src : ''}
      oldSrc={oldSrc.move}
      opacityAfMod={startSpell.move}
      startTrans={() => opacityMod('move')}
      cost={inAir ? inAir.move.cost : null}/>
      <ActionPoint actionPass={() => canAttack.length === 0 && clickHandl('ATTACK')} 
      simbol={'A'} 
      //back={inAir ? 'linear-gradient(45deg, #B22222, #FF1493);' : null} 
      src={inAir ? inAir.attack.src : ''}
      oldSrc={oldSrc.attack}
      opacityAfMod={startSpell.attack}
      startTrans={() => opacityMod('attack')}
      cost={inAir ? inAir.attack.cost : null}/>
      <ActionPoint actionPass={() => canSpell.length === 0 && clickHandl('SPELL')} 
      simbol={'S'} 
      //back={inAir ? 'linear-gradient(45deg, #00CED1, #8B008B);' : null} 
      src={inAir ? inAir.spells[0].src : ''}
      oldSrc={oldSrc.spell}
      opacityAfMod={startSpell.spell}
      startTrans={() => opacityMod('spell')}
      cost={inAir ? inAir.spells[0].cost : null}/>
    </div>
  )
}

export default connect(({game: {inAir, energy, canMove, canAttack, canSpell}}) => ({inAir, energy, canMove, canAttack, canSpell}), {prepareTo})(ActionBar)
