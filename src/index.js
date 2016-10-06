process.env.NODE_ENV = 'production';
var server = require('./server');
var http = require('http');
var request = require('request');

exports.handler = function(event, context) {
  console.log(event);
  console.log(context);
  var options = {
    host: server.address().address,
    port: server.address().port,
    path: event.path
  };

  request(`http://localhost:${options.port}${options.path}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      context.succeed({
        "statusCode": response.statusCode,
        "headers":    response.headers
        "body":       body
      });
    } else {
      context.fail(error);
    }
  });
};
