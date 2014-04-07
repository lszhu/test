var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.use('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({secret: 'secretKey'}));

var roleFactory = function(role) {
    return function(req, res, next) {
        if (req.session.role == role) {
            next();
        } else {
            res.send('You are not authenticated.');
            console.log(req.session.role);
        }
    }
};

app.get('/', roleFactory('admin'), function(req, res) {
    res.send('Welcome to Express.');
});

app.get('/auth', function(req, res) {
    req.session.role = 'admin';
    res.send('You have been authenticated.');
});