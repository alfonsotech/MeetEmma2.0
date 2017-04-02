'use strict'

const databaseName = 'tsphere'
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const database = pgp(connectionString)

const getAllTweets = () => {
  return database.any(`SELECT * FROM tweets ORDER BY content`)
}

// const getTweetById = (id) => {
//   return database.one(`SELECT * FROM tweets WHERE id=$1`, [$1=id])
// }

const getTweetByContent = (content) => {
  return database.one(`SELECT * FROM tweets WHERE content LIKE $1`, ['%' + content + '%'])
}

const updateTweetContent = (contentold, contentnew) => {
  return database.one(`UPDATE tweets SET content = $1 WHERE content = $2`, [contentnew, contentold])
}

const updateTweetCategory = (categoryold, categorynew) => {
  return database.one(`UPDATE tweets SET category = $1 WHERE category = $2`, [categorynew, categoryold])
}

const addTweet = (category, content) => {
  database.any(`INSERT INTO  tweets (category, content) VALUES ($1, $2)`, [category, content])
}

const deleteDuplicates = () => {
  database.any(`DELETE FROM tweets
WHERE id IN (SELECT id
              FROM (SELECT id,
                             ROW_NUMBER() OVER (partition BY content, category ORDER BY id) AS rnum
                     FROM tweets) t
              WHERE t.rnum > 1);`)
}

//TODO: function to select a tweet by id or content and alter its category

module.exports = {
  getAllTweets,
  // getTweetById,
  getTweetByContent,
  updateTweetContent,
  updateTweetCategory,
  addTweet,
  deleteDuplicates
}
