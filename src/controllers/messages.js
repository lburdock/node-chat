'use strict';

var model = require('../models/messages');

/**
 * Gets all the saved messages
 * @return {Promise} from the modal request
 */
exports.getAll = function() {
    return model.getAll();
};

/**
 * Saves the message to the model,
 * then trims the redis list of messages
 * @param {object} message A message object
 * @return {Promise} from the modal request
 */
exports.save = function(message) {
    return model
        .save(message)
        .then(function() {
            model.trim();
        });
};
