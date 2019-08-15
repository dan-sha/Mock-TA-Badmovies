//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');

const sqlGet = function(callback) {
    sqlDb.query("SELECT * FROM movies", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            callback(null, results);
        }
    })
};

const sqlSave = function(movie, callback) {
    // sqlDb.query()
}

//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
    sqlGet,
    sqlSave
}