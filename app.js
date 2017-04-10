const express = require('express')
const app = express()
const pgp = require('pg-promise')
const pug = require('pug');
const path = require('path')
var bodyParser = require('body-parser');
const database = require('./database/database.js')
require('./app.js')
require('./javascript/model.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views'));


app.get('/', (request, response) => {
  return database.getAllTweets()
  .then(tweets => response.render('index.pug', {tweets}))
})

app.get('/editTweet/:id', (request, response) => {
  database.getTweetById(request.params.id)
  .then((tweet) => {
      response.render('./editTweet.pug', {tweet})
    }).catch(error => {
      response.redirect('/')
    })
  })

app.post('/deleteTweet/:id', (request, response) => {
  let id = request.params.id
  database.deleteTweet(id)
  response.redirect('/')
})

app.post('/updateTweet/:id', (request, response) => {

  let id = request.params.id
  let content = request.params.content
  let category = request.params.category

  database.updateContent(id, content)
  database.updateCategory(id, category)
  response.redirect('/')

  })


// app.post('/updateCategory/:id', (request, response) => {
//   database.updateContent()
//   .then( () =>
//     response.redirect('/'))
// })

// app.post('/tweet/:id', (request, response) => {
//   console.log('into tweet function')
//   .then( () =>
//     response.alert('Tweet posted!');
//   )
// })

// app.post('/deleteTweet/:id', (request, response) => {
//   database.deleteTweet()
//   .then( () =>
//     response.alert('Tweet deleted!');
//   )
// })

app.listen(4000)
console.log('Listening on Port 4000')

module.exports = app
