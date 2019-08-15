//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');

const sqlGet = function(callback) {
    sqlDb.query("SELECT * FROM movies", (err, results) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, results);
        }
    })
};

const sqlSave = function(movie, callback) {
    let queryStr = `INSERT INTO movies (movieId, movieTitle, rating, posterURL, descrip, relYear) VALUES (${sqlDb.escape(movie.movieId)}, ${sqlDb.escape(movie.movieTitle)}, ${sqlDb.escape(movie.rating)}, ${sqlDb.escape(movie.posterURL)}, ${sqlDb.escape(movie.descrip || ' ')}, ${sqlDb.escape(movie.release_date)});`;
    sqlDb.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

const sqlDelete = function(movie, callback) {
    let queryStr = `DELETE FROM movies WHERE movieId = ${sqlDb.escape(movie.movieId)};`;
    sqlDb.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, results);
        }
    });
};

// DELETE FROM `table_name` [WHERE condition];
//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
    sqlGet,
    sqlSave,
    sqlDelete
}