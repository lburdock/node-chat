'use strict';

var model = require('../models/messages');

/**
 * Saves the message to the model and
 * trims the redis list of messages
 * @param {string} message A message posted in the chat room
 * @return {Promise} from the redis save request
 */
exports.save = function(message) {
    return model
        .save(message)
        .then(function() {
            model.trim();
        });
};

/**
 * Gets all the saved messages and then
 * reverses them for correct display
 * @return {Promise} from the redis fetch request
 */
exports.getAllReversed = function() {
    return model
        .getAll()
        .then(function(messages) {
            messages.reverse();
            return messages;
        });
};
