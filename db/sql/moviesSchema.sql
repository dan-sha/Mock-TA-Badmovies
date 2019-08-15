-- SET UP SCHEMA HERE
CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS movies (
    movieId INT NOT NULL,
    movieTitle CHAR(50),
    rating INT,
    genre CHAR(50),
    PRIMARY KEY (movieId)
);

CREATE TABLE IF NOT EXISTS genre (
    genreId INT,
    genre CHAR(50),
    movieId INT,
    PRIMARY KEY (genreId),
    FOREIGN KEY (movieId)
        REFERENCES movies(movieId)
);

CREATE TABLE IF NOT EXISTS favorites (
    movieId INT,
    FOREIGN KEY (movieId)
        REFERENCES movies(movieId)
);

