'use strict';

var model = require('../models/messages');

exports.save = function(message) {
    return model
        .save(message)
        .then(function() {
            model.trim();
        });
};

exports.getAllReversed = function() {
    return model
        .getAll()
        .then(function(messages) {
            messages.reverse();
            return messages;
        });
};
