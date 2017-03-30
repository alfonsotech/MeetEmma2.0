const tweetText = document.getElementById('content')
tweetText.onclick = editTweetContent

function editTweetContent() {
    const content = event.target.innerHTML
    console.log(content)
    console.log(this);
}

const $ = function(selector) {
  return document.querySelector(selector)
}


const content = $('#content').getElementsByTagName('li')
for(var i = 0; i < content.length; i++) {
  const thisContent = content[i]
  content.onclick = editTweetContent
}
// document.getElementById('content').addEventListener('click', editTweetContent)
//
// function editTweetContent() {
//   //event handler that gets ahold of a tweet's id when the content is clicked on
//   const content = event.target.innerHTML
//   console.log(content)
//   console.log(this);
// }
//
// const editTweetContent = () => {
//   //event handler that gets ahold of a tweet's id when the content is clicked on
//   document.getElementById("content").addEventListener('click', function() {
//     console.log('in the event listener: ', event.target.innerHTML);
//
//   })
// }
//uses the tweet id to retrieve that tweet's content

//writes the tweet content to the value of the form on the page

//user can edit tweet and when enter submits info, tweet is updated in the database

// module.exports = {
//   editTweetContent
// }
