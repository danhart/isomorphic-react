'use strict';

var server = require('./server');
var http = require('http');

exports.handler = function (event, context) {
  var options = {
    host: server.address().address,
    port: server.address().port,
    path: '/'
  };

  console.log(options);

  http.get(options, function (res) {
    res.on("data", function (chunk) {
      context.succeed(chunk.toString());
    });
  }).on('error', function (e) {
    context.fail(e.message);
  });
};