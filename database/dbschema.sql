DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets
  (
    id SERIAL PRIMARY KEY,
    content VARCHAR(1718),
    category VARCHAR(150)
  );
