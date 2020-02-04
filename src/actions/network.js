import { UserApi, HeroesApi } from '@/utils/api';
import { registControl } from './base'

export const fetchUserLogin = postData => dispatch => {
  UserApi.login(postData).then(({data, ...another}) => {
    const {status, user, token} = data
    console.log("DATA: ", data)
    console.log('ANOTHER: ', another)
    if (status === 'success') {
      console.log('AXIOS:', window.axios)
      window.axios.defaults.headers.common['token'] = token
      window.localStorage['token'] = token
      console.log('USER', user)
      dispatch(setUserData(user))
      setTimeout(() => dispatch(registControl()), 1000)
    } else {
      console.log('WRONG_PASSWORD')
    }
  })
  .catch((er) => console.error('NETWORK_TRUBLE:', er))
}

const setUserData = user => ({
  type: "SET_USER_DATA",
  payload: user
})

export const fetchHeroes = () => dispatch => {
  HeroesApi.getStaff().then(({data}) => {
    const payload = data.heroes
    window.localStorage['heroes'] = payload
    if(payload) {
      dispatch(setHeroes(payload))
    }
  })
  .catch((er) => console.error('FETCH_HEROES:FETCH_ERROR:', er))
}

const setHeroes = heroes => ({
  type: 'SET_HEROES',
  payload: heroes
})

export const dropData = (strFunc) => dispatch => {
  console.log("GREAT_TRY")
  HeroesApi.dropData(strFunc).then(({data}) => { // strFunc
      console.log('PASS_FROM_SERVER:', data )
      let newMainFunc = new Function('return '+data.func)()
      console.log('DATA_FUNC:', newMainFunc)
      console.log('DATA_REQ:', data)
      dispatch({
        type: 'GET_FUNC_FROM_SERVER',
        payload: newMainFunc
      })
    })
    .catch((er) => {console.error('NETWORK_ERROR: ', er)})
}