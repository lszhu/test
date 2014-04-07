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

app.use('view engine', 'jade');
app.get('/jadeSubView', function(req, res) {
    res.render(__dirname + '/express.lib.3.main.jade',
        {pageTitle: 'Jade with sub view', hello: 'Hello world!'});
});