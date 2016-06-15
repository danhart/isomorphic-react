'use strict';

require('babel-register');
var app = require('./app');

var server = app.listen(0, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

module.exports = server;