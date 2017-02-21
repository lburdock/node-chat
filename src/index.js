'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messageController = require('./controllers/messages');
var userController = require('./controllers/users');

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('messages-client-ready', function() {
        messageController
            .getAll()
            .then(function(messages) {
                socket.emit("messages-fetched", messages);
            });
    });

    socket.on('users-client-ready', function() {
        userController
            .getAll()
            .then(function(users) {
                socket.emit('users-fetched', users);
            });
    });

    socket.on('user-joined', function(user) {
        socket.user = user;
        userController
            .save(user)
            .then(function(users) {
                console.log('user joined:', user.name, user.id);
                io.emit('users-fetched', users);
            });
    });

    socket.on('message-entered', function(message) {
        messageController
            .save(message)
            .then(function() {
                io.emit('message-saved', message);
            });
    });

    socket.on('disconnect', function() {
        if (socket.user) {
            userController
                .removeUser(socket.user)
                .then(function(users) {
                    console.log('user left:', socket.user.name, socket.user.id);
                    io.emit('users-fetched', users);
                });
        }
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
