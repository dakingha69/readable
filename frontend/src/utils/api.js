import { origin } from '../config'

export const fetchUrl = path => (
  fetch(`${origin}${path}`, {
    headers: { 'Authorization': 'auth' }
  }).then(res => res.json())
)
