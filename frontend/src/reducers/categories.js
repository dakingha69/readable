import {
  RECEIVE_CATEGORIES,
  SET_CATEGORY
} from '../actions'

const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return {
        ...state,
        categories
      }
    case SET_CATEGORY:
      const { category } = action
      return {
        ...state,
        category
      }
    default:
      return state
  }
}

export default categoriesReducer
