import { axios } from '@/core'

export default {
  login: (postData) => axios.post('/user/login', postData),
  registration: postData => axios.post('/user/registration', postData)
 }