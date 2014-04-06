var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.get('/', function(req, res) {
    res.send('hello express.');
});

app.get(/yes(\d+)(abc)/, function(req, res) {
    res.send(req.params[0] + ": " + req.params[1]);
});

app.get('/:id(\\d+)', function(req, res) {
    res.send('only match digits and stored in params: ' + req.params.id);
});

app.get('/:id?', function(req, res) {
    if (req.params.id) {
        res.send(req.params.id);
    } else {
        res.send('oh hai');
    }
});

app.get('/wildcard/a*', function(req, res) {
    res.send('word headed with alphabet a');
});

app.get('*', function(req, res) {
    res.send('query host is: ' + req.host + '<br />' +
        'query path is: ' + req.path);
});
