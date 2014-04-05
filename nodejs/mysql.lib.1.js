var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});
connection.connect();

connection.query('create database node', function(err) {
    if (err && err.number != connection.ERROR_DB_CREATE_EXISTS) {
        throw err;
    }
});

connection.query('use node');
connection.query(
    'create table ' + 'recorder' +
        '(id int(11) auto_increment, ' +
        'title varchar(255), ' +
        'text text, ' +
        'created datetime, ' +
        'primary key (id))'
);

connection.query(
    'insert into recorder set title= ?, text = ?, created = ?',
    ['super cool', 'this is a nice text', '2013-03-22 12:53:53']
);

var query = connection.query(
    'insert into recorder set title = ?, text = ?, created = ?',
    ['another entry', 'tow entries make a better test', '2013-03-22 12:53:53']
);

connection.query(
    'select * from recorder', function(err, rows, fields) {
        if (err) {
            throw err;
        }
        console.log(rows);
        console.log(fields);
        connection.end();
    }
);
