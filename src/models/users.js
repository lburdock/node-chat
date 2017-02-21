'use strict';

var redis = require('../lib/redis');
const listName = "node-chat-users";

/**
 * Gets all the users in the list
 * @return {Promise} from the redis async LRANGE request
 */
exports.getAll = function() {
    return redis
        .lrangeAsync(listName, 0, -1)
        .then(function(users) {
            return users.map(JSON.parse);
        });
};

/**
 * Saves a user to the redis list
 * @param {object} user An object with user data (name and id)
 * @return {Promise} from the redis async RPUSH request
 */
exports.save = function(user) {
    return redis
        .rpushAsync(listName, JSON.stringify(user));
};

/**
 * Removes the specified user from the list of users
 * @param {object} user The user object with name and id
 * @return {Promise} from the redis async LREM request
 */
exports.removeUser = function(user) {
    return redis
        .lremAsync(listName, 0, JSON.stringify(user));
};
