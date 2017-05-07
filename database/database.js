'use strict'

const databaseName = 'tsphere'
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const database = pgp(connectionString)

const getAllTweets = () => {
  return database.any(`SELECT * FROM tweets ORDER BY content`)
}

const getTweetById = (id) => {
  return database.one(`SELECT * FROM tweets WHERE tweets.id = ${id}`)
}

const getByContent = (content) => {
  return database.any(`SELECT * FROM tweets WHERE content LIKE $1`, ['%' + content + '%'])
}

const updateContent = (id, content) => {
  database.any(`UPDATE tweets SET content = '${content}' WHERE id = ${id}`)
}

const updateCategory = (id, category) => {
  database.any(`UPDATE tweets SET category = '${category}' WHERE id = ${id}`)
}

const addTweet = (category, content) => {
  database.any(`INSERT INTO  tweets (category, content) VALUES ($1, $2)`, [category, content])
}

const deleteTweet = (id) => {
  database.any(`DELETE FROM tweets
WHERE id = ${id}`)
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
  getTweetById,
  getByContent,
  updateContent,
  updateCategory,
  addTweet,
  deleteTweet,
  deleteDuplicates
}
