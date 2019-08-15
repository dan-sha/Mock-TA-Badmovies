-- SET UP SCHEMA HERE
CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS movies (
    movieId INT NOT NULL,
    movieTitle CHAR(50),
    rating INT,
    posterURL CHAR(50),
    descrip VARCHAR(2000),
    relYear INT,
    PRIMARY KEY (movieId)
);

