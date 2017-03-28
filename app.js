'use strict'

const express = require('express')
const app = express()
// const router = require('./routes.js')
const database = require('./database/database.js')
// const model = require('./javascript/model.js')

app.get('/', (request, response) => {
  return database.getAllTweets()
  .then(tweets => response.render('index.pug', {tweets}))
})

app.listen(4000)
console.log('Listening on Port 4000')

module.exports = app
