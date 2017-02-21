'use strict';

var redis = require('../lib/redis');
const listName = "node-chat-messages";
const maxStoredMessages = 100;

/**
 * Gets all the messages in the list
 * @return {Promise} from the redis async LRANGE request
 */
exports.getAll = function() {
    return redis
        .lrangeAsync(listName, 0, -1)
        .then(function(messages) {
            return messages.map(JSON.parse);
        });
};

/**
 * Save a message to the redis list
 * @param {object} message A message posted in the chat room
 * @return {Promise} from the redis async RPUSH request
 */
exports.save = function(message) {
    return redis.rpushAsync(listName, JSON.stringify(message));
};

/**
 * Trim the list of messages to a reasonable size
 * @return {Promise} from the redis async LTRIM request
 */
exports.trim = function() {
    return redis.ltrimAsync(listName, 0, maxStoredMessages - 1);
};
