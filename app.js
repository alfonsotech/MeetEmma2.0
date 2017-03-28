'use strict'

const express = require('express')
const app = express()
const database = require('./database/database.js')
// const model = require('./javascript/model.js')

app.get('/', (request, response) => {
  response.send('Hello Twittersphere!')
})

app.get('/getAllTweets', (request, response) => {
  return database.getAllTweets()
  .then(tweets => response.json(tweets))
})

app.listen(4000)
console.log('Listening on Port 6000')

module.exports = app
