'use strict';

var redis = require('redis');
var Promise = require("bluebird");
Promise.promisifyAll(redis);
var redisClient = redis.createClient();

redisClient.onAsync("error")
    .catch(function(err) {
        console.log("Error:", err);
        throw err;
    });

module.exports = redisClient;
