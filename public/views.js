const tweets = document.querySelectorAll('.tweets > .tweet > .tweet-content')

for(var i = 0; i < tweets.length; i++) {
  tweets[i].addEventListener('click', editTweetContent)
}

function editTweetContent(event) {
  const content = event.target.text
  console.log(content)
  console.log(this);
  event.target.text='tweet text changed!'
}

//event handler that gets ahold of a tweet's id when the content is clicked on

//uses the tweet id to retrieve that tweet's content

//writes the tweet content to the value of the form on the page

//user can edit tweet and when enter submits info, tweet is updated in the database
