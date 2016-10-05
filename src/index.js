process.env.NODE_ENV = 'production';
var server = require('./server');
var http = require('http');
var request = require('request');

exports.handler = function(event, context) {
  var fullPath = Object.keys(event).reduce(function(path, part) {
    if (!event[part]) return path;

    return path + "/" + event[part];
  }, "");

  var options = {
    host: server.address().address,
    port: server.address().port,
    path: fullPath
  };

  request(`http://localhost:${options.port}${options.path}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      context.succeed(body);
    } else {
      context.fail(error);
    }
  });
};
