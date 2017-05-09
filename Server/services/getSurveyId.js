const client = require('../services/redisClient').duplicate();
module.exports = function(socket) {
  let obj ={};
  client.subscribe('events');