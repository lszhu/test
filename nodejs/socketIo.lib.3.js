var http = require('http'),
//    jade = require('jade'),
    express = require('express');
    socketIo = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIo.listen(server);

server.listen(3000, function() {
    console.log('Server started and listen to port 3000.');
});

app.get('/', function(req, res) {
    res.render(__dirname + '/socketIo.lib.3.jade',
        {pageTitle: 'Socket.IO example'});
});

console.log('io.sockets: ');

io.sockets.on('connection', function(socket) {
    socket.emit('news', {
        title: 'Welcome to World News',
        contents: 'This news flash was sent from Node.js!',
        allowResponse: true
    });
    socket.on('scoop', function(data) {
        socket.emit('news', {
            title: 'Circular Emissions Worked',
            contents: 'Received this content: ' + data.contents + ';<br />' +
                'Date and time: ' + (new Date()).toUTCString()
        });
    });
});