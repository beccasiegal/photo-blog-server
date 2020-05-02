CREATE TABLE articles (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  nameText TEXT NOT NULL,
  content TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  viewCount INTEGER GENERATED BY DEFAULT AS COUNT
);