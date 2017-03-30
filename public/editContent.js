function postEditedTweet(content) {
  const contentNode = document.getElementById('content')
  console.log('contentNode:',contentNode);
  console.log(editTweetContent());
  contentNode.setAttribute('value', 'test')
}
