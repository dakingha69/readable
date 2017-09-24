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
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const addPost = post => ({
  type: ADD_POST,
  post
})

export const editPost = post => ({
  type: EDIT_POST,
  post
})

export const deletePost = post => ({
  type: DELETE_POST,
  post
})

export const requestPosts = (category = '') => ({
  type: REQUEST_POSTS,
  category
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = (category = '') => dispatch => {
  const path = category ? `/${category.path}` : ''
  dispatch(requestPosts(category))
  return API.fetchUrl(`${path}/posts`)
    .then(({ posts }) => dispatch(receivePosts(posts)))
}

/**
 * USER ACTIONS
 */
export const SET_USERNAME = 'SET_USERNAME'
export const GET_USERNAME = 'GET_USERNAME'

export const setUsername = username => ({
  type: SET_USERNAME,
  username
})

export const getUsername = () => ({
  type: GET_USERNAME
})
