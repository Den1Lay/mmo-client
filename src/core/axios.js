import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['token'] = window.localStorage['token']

window.axios = axios

export default axios