var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.get('/', function(req, res) {
    res.send('hello express.');
});