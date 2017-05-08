'use strict'

const Twit = require('twit')
const config = require('../config.js')
const T = new Twit(config)
const database = require('../database/database.js')

function getOne() {
	getAll()
	const arrayLength = allTweets.length
	const index = Math.floor((Math.random() * arrayLength) + 1);
	return allTweets[index]
}

//Get last 50 tweets in timeline
const params = {
	screen_name:'tPhilosophia',
	q: 'tPhilosophia',
	count: 50
}

T.get('search/tweets', params, getTweets)

function getTweets(err, data, response) {
	database.deleteDuplicates()
	var tweets = data.statuses
	for(var i = 0; i < tweets.length; i++) {
		const content = tweets[i].text
		console.log(content)//console.log here is intentionally left in!
		database.addTweet('category', content)
	}
}

//	Tweet out one random tweet from database on a timed interval
setInterval (tweetOut, 1000*60*30)

function tweetOut() {
	const allTweets = [];
	database.getAllTweets()
	.then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].content)
		}
		let arrayLength = allTweets.length
		let index = Math.floor((Math.random() * arrayLength) + 1);
		console.log('index: ', index) //console.log here is intentionally left in!
		let tweet = {
			status: allTweets[index]
		}

		T.post('statuses/update', tweet, tweeted)

		function tweeted(err, data, response) {
			if(err) {
				console.log('Something went wrong!', err)
			} else {
				console.log('It worked!')
			}
		}
	})
}

//Tweet out a specific tweet from UI
const manualTweet = (content) => {
	let tweet = {
		status: content
	}

	T.post('statuses/update', tweet, tweeted)

	function tweeted(err, data, response) {
		if(err) {
			console.log('Something went wrong!', err)
		} else {
			console.log('It worked!')
		}
	}
}

//Add new tweets to database as they are tweeted out
const stream = T.stream('user')
stream.on('tweet', addToDb)

function addToDb(event) {
	if(event.user.screen_name === 'tPhilosophia') {
		const message = event.text
		database.addTweet(message)
		console.log('Tweet added to database: ', message)
	}
	database.deleteDuplicates()
}

module.exports = {manualTweet}
