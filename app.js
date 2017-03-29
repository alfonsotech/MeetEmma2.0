'use strict'

const express = require('express')
const app = express()
const pug = require('pug');
const path = require('path')
const database = require('./database/database.js')
require('./javascript/model.js')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug')

app.get('/', (request, response) => {
  return database.getAllTweets()
  .then(tweets => response.render('index.pug', {tweets}))
})

app.listen(4000)
console.log('Listening on Port 4000')

module.exports = app
