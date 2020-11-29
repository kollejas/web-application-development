// load mysql module to operate with MySQL database
const mysql = require("mysql");

// first we will need a connection, use app-*.sql files to create database and table, and to insert first demo data
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment',
});

// initially connect to database
connection.connect();

// we are using Promise object, because of asynchronous handling of node.js
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise
// if query was successful, .then() we will use the results for later operations, take a look where model.getAll() is used

// get all appointments
function getAll() {
    // createa new Promise object, which have to major status
    // resolve -> success -> we will get result set(s)
    // reject  -> error   -> we are currently log errors in console and reject this error
    return new Promise((resolve, reject) => {
        // create query
        const query = 'SELECT * FROM milestone';
        // do query, and wait for resolve or reject
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                return reject(error);

                // there's usually no error, so we are able to use result (set)
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = {
    getAll
};
