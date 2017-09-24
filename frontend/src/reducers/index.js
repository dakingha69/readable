import { combineReducers } from 'redux'
import categoriesReducer from './categories'
import postsReducer from './posts'
import userReducer from './user'

export default combineReducers({
  categoriesReducer,
  postsReducer,
  userReducer
})
