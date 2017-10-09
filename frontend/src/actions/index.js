import * as API from '../utils/api'

/**
 * CATEGORY ACTIONS
 */
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  API.fetchUrl('/categories')
    .then(({ categories }) => dispatch(receiveCategories(categories)))
)

export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

/**
 * POST ACTIONS
 */
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_SORT = 'SET_SORT'

export const addPost = post => dispatch => {
  return API.fetchUrl('/posts', {
    method: 'post',
    body: JSON.stringify(post)
  }).then(json => dispatch(fetchPosts(post.category)))
}

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
  const path = category ? `/${category}` : ''
  dispatch(requestPosts(category))
  dispatch(setCategory(category ? category : 'all'))
  return API.fetchUrl(`${path}/posts`)
    .then(posts => dispatch(receivePosts(posts)))
}

export const setSort = sort => ({
  type: SET_SORT,
  sort
})

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
