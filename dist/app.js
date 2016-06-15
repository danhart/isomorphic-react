'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _browserifyMiddleware = require('browserify-middleware');

var _browserifyMiddleware2 = _interopRequireDefault(_browserifyMiddleware);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _appConfig = require('./app-config');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var config = _appConfig2.default[app.get('env')];

app.use(_express2.default.static(__dirname + '/public'));
app.use((0, _morgan2.default)(config.loggerMode));

app.set('views', __dirname);
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
  _browserifyMiddleware2.default.settings({
    transform: ['babelify']
  });

  app.get('/scripts/app.js', (0, _browserifyMiddleware2.default)(__dirname + '/client/js/app.js'));
}

app.get('*', function (req, res) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.render('layout', { app: (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RoutingContext, renderProps)) });
    } else {
      res.status(404).send('Not found');
    }
  });
});

module.exports = app;