DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets
  (
    tweetid SERIAL PRIMARY KEY,
    category VARCHAR(150),
    content VARCHAR(1718)
  );
