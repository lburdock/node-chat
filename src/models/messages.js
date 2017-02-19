'use strict';

var redis = require('../lib/redis');

/**
 * Save a message to the redis list
 * @param {string} message A message posted in the chat room
 * @return {Promise} from the redis save request
 */
exports.save = function(message) {
    return redis.lpushAsync("messages", JSON.stringify(message));
};

/**
 * Trim the list of messages to a reasonable size
 * @return {Promise} from the redis trim request
 */
exports.trim = function() {
    return redis.ltrimAsync("messages", 0, 99);
};

/**
 * Gets all the messages in the list
 * @return {Promise} from the redis get request
 */
exports.getAll = function() {
    return redis.lrangeAsync("messages", 0, -1);
};
