import { origin } from '../config'

export const fetchCategories = () => fetch(
  `${origin}/categories`, { headers: { 'Authorization': 'auth' } })
    .then(res => res.json())
    .then(json => json.categories)
