import io from 'socket.io-client'
import store from '@/store'
//import store from '@/store/game'

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

export default socket