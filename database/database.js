'use strict'

const databaseName = 'tsphere'
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const database = pgp(connectionString)

const getAllTweets = () => {
  return database.any(`SELECT * FROM tweets ORDER BY content`)
}
//
// const getTweetById = (id) => {
//   return database.one(`SELECT * FROM tweets WHERE id=$1`, [$1=id])
// }
//
// const getTweetByContent = (content) => {
//   return database.one(`SELECT * FROM tweets WHERE content=$1`, [$1='%' + conent = '%']) //how to build this query
// }
//
// const addTweet = (content, category) => {
//   database.any(`INSERT INTO  tweets (content, category) VALUES ($1, $2)`, [$1=content, $2=category])
// }
//
// const deleteDuplicates = () => {
//   database.any(`DELETE FROM tweets WHERE ctid NOT IN
// (SELECT max(ctid) FROM tweets GROUP BY tweets.*)`)
// }

//TODO: function to select a tweet by id or content and alter its category

module.exports = {
  getAllTweets
  // getTweetById,
  // getTweetByContent,
  // addTweet,
  // deleteDuplicates
}
