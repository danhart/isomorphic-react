require('babel-register');
const app = require('./app');

var server = app.listen(0, function() {
  console.log("Server running on http://localhost:" + server.address().port);
});

module.exports = server;
