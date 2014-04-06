var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.get('/', function(req, res) {
    console.log(__dirname);
    res.render(__dirname + '/express.lib.3.jade',
        {pageTitle: 'Jade Example', layout: false});
});