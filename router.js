'use strict'

const express = require('express')
const app = express()
var router = express.Router()
const pug = require('pug');
const path = require('path')
var bodyParser = require('body-parser');
const database = require('./database/database.js')
require('./app.js')
// require('./javascript/model.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.use(express.static(path.join(__dirname, 'public')));
router.set('view engine', 'pug')


router.get('/', (request, response) => {
  return database.getAllTweets()
  .then(tweets => response.render('index.pug', {tweets}))
})

router.get('/editContent/:id', (request, response) => {
  response.render('./editTweet.pug', [id])
})

router.post('/updateContent/:id', (request, response) => {
  // return database.getTweetByContent()
  // .then(tweets =>
  // response.render('editTweetContent.pug', {content}))
})

router.post('/updateCategory/:id', (request, response) => {
  database.updateContent()
  .then( () =>
    response.redirect('/')
  )
})

// router.post('/tweet/:id', (request, response) => {
//   console.log('into tweet function')
//   .then( () =>
//     response.alert('Tweet posted!');
//   )
// })

router.post('/deleteTweet/:id', (request, response) => {
  database.deleteTweet()
  .then( () =>
    response.alert('Tweet deleted!');
  )
})

// module.exports = router
