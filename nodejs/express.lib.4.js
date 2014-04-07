var express = require('express');
var http = require('http');

var app = express();
http.createServer(app).listen(3000, function() {
    console.log('server started and listening to port 3000');
});

app.use('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({secret: 'secretKey'}));
app.use(express.urlencoded());

var user = {name: 'admin', password: 'default'};

var roleFactory = function(role) {
    return function(req, res, next) {
        if (req.session.role == role) {
            next();
        } else {
            res.send('You are not authenticated.');
            console.log('session role: ' + req.session.role);
        }
    }
};

app.get('/', roleFactory(user.name), function(req, res) {
    res.send('Welcome to Express.');
});

app.get('/auth', function(req, res) {
    console.log('I am here in the get /auth.');
    res.render(__dirname + '/express.lib.4.jade',
        {pageTitle: 'authentication'});
});

app.post('/auth', function(req, res) {
    if (req.body.user == user.name && req.body.password == user.password) {
        req.session.role = 'admin';
        res.send('You have been authenticated.');
    } else {
        res.send('Wrong username or password.');
    }
    console.log('req.body: ');
    console.dir(req.body);
});

app.get('*', function(req, res) {
    roleFactory('admin')(req, res);
    res.redirect('/auth');
});
