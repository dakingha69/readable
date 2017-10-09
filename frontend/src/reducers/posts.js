import {
  ADD_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SET_SORT
} from '../actions'

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      const { category } = action
      return {
        ...state,
        fetching: true,
        category
      }
    case RECEIVE_POSTS:
      const { posts } = action
      return {
        ...state,
        fetching: false,
        posts
      }
    case SET_SORT:
      const { sort } = action
      return {
        ...state,
        sort
      }
    default:
      return state
  }
}

export default postsReducer
