import * as API from '../utils/api'

/**
 * CATEGORY ACTIONS
 */
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  API.fetchUrl('/categories')
    .then(({ categories }) => dispatch(receiveCategories(categories)))
)

/**
 * POST ACTIONS
 */
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const requestPosts = (category = '') => ({
  type: REQUEST_POSTS,
  category
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = (category = '') => dispatch => (
  dispatch(requestPosts(category))
    .then(() => API.fetchUrl(`${category}/posts`))
    .then(({ posts }) => dispatch(receivePosts(posts)))
)
