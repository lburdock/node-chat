'use strict';

var redis = require('../lib/redis');

exports.save = function(message) {
    return redis.lpushAsync("messages", JSON.stringify(message));
};

exports.trim = function() {
    return redis.ltrimAsync("messages", 0, 99);
};

exports.getAll = function() {
    return redis.lrangeAsync("messages", 0, -1);
};
