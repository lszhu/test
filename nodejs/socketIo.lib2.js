var http = require('http'),
    jade = require('jade'),
    url = require('url');
    socketIo = require('socket.io');

var server = http.createServer();
server.on('request', function(req, res) {
    var path = url.parse(req.url).pathname.toLowerCase();
    //console.log('path: ' + path);
    if (path != '/' && path != '/weather' && path != 'upandrunning') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World');
        //console.log('route "/".');
        return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    pageTitle = 'socket.IO example.';
    jade.renderFile(__dirname + '/socketIo.lib.2.jade',
        {globals: ['pageTitle'], pretty: true},
        function(err, html) {
            res.end(html);
    });
});
server.listen(3000);

var socket = socketIo.listen(server);

socket.of('/upandrunning')
    .on('connection', function(client) {
        console.log('Client connected to Up and Running namespace.');
        //console.dir(client);
        client.send('Welcome to Up and Running, client id: ' + client.id);
});

socket.of('/weather')
    .on('connection', function(client) {
        console.log('Client connected to Weather namespace.');
        //console.dir(client);
        client.send('Welcome to Weather Update, client id: ' + client.id);
    });