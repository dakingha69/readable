import {
  RECEIVE_CATEGORIES
} from '../actions/categories'

const categories = (state = {}, action) => {
  console.log(state, action)
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return {
        ...state,
        categories
      }
    default:
      return state
  }
}

export default categories
