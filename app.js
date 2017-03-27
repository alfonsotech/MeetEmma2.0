'use strict'

const express = require('express')
const app = express()
const model = rquire('./javascript/model.js')

app.get('/', (request, response) => {
  response.send('Hello Twittersphere!');
})

app.listen('6000')
console.log('Listening on Port 6000');

module.exports = app
