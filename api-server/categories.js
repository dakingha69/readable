const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      },
      {
        name: 'funny',
        path: 'funny'
      },
      {
        name: 'nsfw',
        path: 'nsfw'
      },
      {
        name: 'technology',
        path: 'technology'
      },
      {
        name: 'art',
        path: 'art'
      },
      {
        name: 'random',
        path: 'random'
      },
      {
        name: 'cats',
        path: 'cats'
      },
      {
        name: 'dogs',
        path: 'dogs'
      },
      {
        name: 'life',
        path: 'life'
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
