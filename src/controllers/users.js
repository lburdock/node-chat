'use strict';

var model = require('../models/users');

/**
 * Gets all the saved users
 * @return {Promise} from the modal request
 */
exports.getAll = function() {
    return model
        .getAll();
};

/**
 * Saves the user to the model,
 * then returns the list of all users
 * @param {object} user The user object with name and id
 * @return {Promise} from the modal request
 */
exports.save = function(user) {
    return model
        .save(user)
        .then(function() {
            return model.getAll();
        });
};

/**
 * Removes the specified user from a list of users,
 * then returns the list of all remaining users
 * @param {object} user The user object with name and id
 * @return {Promise} from the modal request
 */
exports.removeUser = function(user) {
    return model
        .removeUser(user)
        .then(function() {
            return model.getAll();
        });
};
