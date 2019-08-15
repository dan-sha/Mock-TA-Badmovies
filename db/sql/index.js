const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "badmovies"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MySQL');
    }
})

module.exports = connection;