'use strict';

var mysql = require('mysql');

module.exports = {
    getAll,
    save,
    getOne,
    update,
    deleteMovie
};

// AWS RDS MySQL connection
var connection = mysql.createConnection({
    host: 'awsmysql.ctlxjgmc26np.us-east-1.rds.amazonaws.com',
    user: 'lgutnikov',
    password: process.env.AWS_RDS_MYSQL_PASSWORD,
    port: 3306,
    database: 'movie'
});
connection.connect();

// GET all movies
function getAll(req, res, next) {
    connection.query('SELECT * FROM movie.movie', function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results);
    });
}

// POST movie
function save(req, res, next) {
    connection.query("INSERT INTO `movie`.`movie` (`title`, `year`) VALUES ('" + req.body.title + "', " + req.body.year + ")",
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.json({
                success: 1,
                description: "Movie added to list"
            });
        }
    );
}

// GET /movie/{id}
function getOne(req, res, next) {
    var title = req.swagger.params.id.value;
    connection.query("SELECT * FROM `movie`.`movie` WHERE title = '" + title + "'",
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.json(results);
        }
    );
}

// PUT /movie/{id}
function update(req, res, next) {
    var title = req.swagger.params.id.value;
    var movie = req.body;
    connection.query("UPDATE `movie`.`movie` SET title = '" + movie.title + "', " + " year = " + movie.year + " WHERE title = '" + title + "'",
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.json({
                success: 1,
                description: "Movie updated"
            });
        }
    );
}

// DELETE /movie/{id}
function deleteMovie(req, res, next) {
    var title = req.swagger.params.id.value;
    connection.query("DELETE FROM `movie`.`movie` WHERE title ='" + title + "'",
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.json({
                success: 1,
                description: "Movie deleted"
            });
        }
    );
}