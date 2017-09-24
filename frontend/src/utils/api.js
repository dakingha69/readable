import { origin } from '../config'

export const fetchUrl = (path, options) => (
  fetch(`${origin}${path}`, Object.assign({}, {
    headers: {
      'Authorization': 'auth',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, options)).then(res => res.json())
)
