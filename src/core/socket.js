import io from 'socket.io-client';
import store from '@/store';
//import store from '@/store/game'
let moveTimer = void '';

store.subscribe((ev) => {
  let {game} = store.getState();
  if(game.whoseMove !== 'my' && moveTimer !== undefined) {
    clearTimeout(moveTimer)
  }
  if(game.whoseMove === 'my' && moveTimer === undefined) { //superTimer
    moveTimer = setTimeout(() => {
      console.info('%c%s', 'color: royalblue; font-size: 44px;', 'ROYAL_END_TURN' )
      store.dispatch({type: 'END_TURN'});
      //endTurnEvent
      //socket.to(...).emit('END_TURN', {payload: {who, ...}})
      moveTimer = void 'over';
    }, 20*1000)
  }
})

const socket = io('http://localhost:8080') // window.location.origin

socket.on('CLIENT_HANDSHAKE', ({socket}) => console.log('%c%s', 'color: red; font-size: 50px;', 'HANDSHAKE: ', socket))
socket.on('GAME:FIND', ({partner, address}) => {
  console.log('GAME_FIND, ADDRESS:', address)
})
socket.on('IMG_URL', (payload) => {
  let data = payload.data
  let getTime = Date.now()
  
  console.log('%c%s', 'color: red; font-size: 50px;', 'SOCKET_IMG_URL: ', data.imgSrc)
  console.log('SOCKET_REQ_TIME: ',getTime-payload.time)
  console.log('PAYLOAD:', payload)
})
socket.on('GAME:PARTNER_SPELL', ({payload}) => {
  // const  {id: 'DKnight1', y: 3, x: 7, spellInd: 0, withAnime: true, show: false} = payload
  let { inLight } = store.getState().game
  // inAir take here
  let show = true
  if(show) {
    //store.dispatch(partnerStartSpell...) withAnime(true)
  } else { // полностью в тени..
    // if(inLight.some({newX, newY}) => newX === x && newY === y && inLight.some(({...}))) {
    //    dispatch(startPartnerSpell({withAnime: false})); dispatch(spellTO())
    // } else {
    //  dispatch({withAnime(true)})
    //}
  }
})

socket.on('GAME:START', ({payload: {}}) => {

})

socket.on('GAME:PARTNER_OVER_MOVE', ({payload}) => { //payload={energy}
  store.dispatch({type: 'START_MY_TURN', payload})
})

export default socket