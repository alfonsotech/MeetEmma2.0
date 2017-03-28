DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets
  (
    tweetid SERIAL PRIMARY KEY,
    content VARCHAR(1718),
    category VARCHAR(150)
  );

-- seed
INSERT INTO tweets (content, category) VALUES
  ('This is a first tweet', 'ancient'),
  ('This is a second tweet', 'modern'),
  ('This is a third tweet', 'contemporary');
