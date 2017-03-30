'use strict'

const Twit = require('twit')
const config = require('../config.js')
const T = new Twit(config)
const database = require('../database/database.js')

function getAll() {
	database.getAllTweets().then(data => {
		for(var i = 0; i < data.length; i++) {
			allTweets.push(data[i].tweetx)
		}
		database.deleteDuplicates()
	})
}

function getOne() {
	getAll()
	const arrayLength = allTweets.length
	const index = Math.floor((Math.random() * arrayLength) + 1);
	return allTweets[index]
}

//GET OLD TWEETS IN BATCHES FROM TWITTER
const params = {
	screen_name:'tPhilosophia',
	q: 'tPhilosophia',
	count: 50
}

T.get('search/tweets', params, getTweets)

function getTweets(err, data, response) {
	database.deleteDuplicates()
	var tweets = data.statuses
	console.log(tweets);
	for(var i = 0; i < tweets.length; i++) {
		const content = tweets[i].text
		console.log(content);
		database.addTweet('category', content)
	}
}

//	TWEET OUT ONE RANDOM TWEET FROM DB
setInterval (tweetOut, 1000*60*60)

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

		function tweeted(err, data, respoonse) {
			if(err) {
				console.log('Something went wrong!', err)
			} else {
				console.log('It worked!')
			}
		}
	})
}

//ADD TWEETS TO DATABASE AS TWEETED
const stream = T.stream('user')
stream.on('tweet', addToDb)

function addToDb(event) {
	if(event.user.screen_name === 'tPhilosophia') {
		const message = event.text
		database.addTweet(message)
		console.log('tweet added to database: ', message)
	}
	database.deleteDuplicates()
}

function editContent(content, getTweetByContent) {
	console.log('inside edit content fucnction');
	// getTweetByContent(content)
}

const test = editContent('I do love her work because my first love')
console.log(test);
