import {
  ADD_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS
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
    default:
      return state
  }
}

export default postsReducer
