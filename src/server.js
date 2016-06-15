require('babel-register');
const app = require('./app');

var server = app.listen(0);
console.log("server started");

module.exports = server;
