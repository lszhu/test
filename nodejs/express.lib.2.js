var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.use(express.limit('1mb'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.get('/', function(req, res) {
    res.send('<form method="post" action="/"' +
        '<input type="hidden" name="_method" value="put" />' +
        'Your Name: <input type="text" name="username" />' +
        '</form>');
});

app.post('/', function(req, res) {
    res.send('Webcom, ' + req.body.username);
});