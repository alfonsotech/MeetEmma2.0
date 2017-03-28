// var express = require('express')
// var router = express.Router()
// var database = require('./database/database.js')
//
// router.use( function(request, response, next) {
//   console.log('into router!')
//   next()
// })
//
// router.get('/', (request, response) => {
//   response.send('Hello Twitterland!')
// })
//
// router.get('/getAllTweets', (request, response) => {
//   return database.getAllTweets()
//   .then(tweets => response.json(tweets))
// })
//
// module.exports = router
