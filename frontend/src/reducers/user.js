import { SET_USERNAME, GET_USERNAME } from '../actions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USERNAME:
      const { username } = action
      localStorage.setItem('username', username)
      return {
        ...state,
        username
      }
    case GET_USERNAME:
      return {
        ...state,
        username: localStorage.getItem('username')
      }
    default:
      return state
  }
}

export default userReducer
