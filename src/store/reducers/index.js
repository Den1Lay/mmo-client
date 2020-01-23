import { combineReducers } from 'redux'
import admin from './admin'
import game from './game'

export default combineReducers({
  admin,
  game
})
