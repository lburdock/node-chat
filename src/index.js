'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messageController = require('./controllers/messages');

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('message-added', function(message) {
        messageController
            .save(message)
            .then(function() {
                io.emit('message-added', message);
            });
    });

    socket.on('join', function() {
        messageController
            .getAllReversed()
            .then(function(messages) {
                messages.forEach(function(message) {
                    socket.emit("message-added", JSON.parse(message));
                });
            });
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
