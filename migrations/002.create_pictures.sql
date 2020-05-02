CREATE TABLE pictures (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  altText TEXT,
  imageUrl TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  articlesId INTEGER REFERENCES articles(id) ON DELETE CASCADE NOT NULL
);