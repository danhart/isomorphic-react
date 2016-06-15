import express from 'express'
import browserify from 'browserify-middleware'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import logger from 'morgan'
import React from 'react'
import routes from './routes'
import appConfig from './app-config'

var app = express();
var config = appConfig[app.get('env')];

app.use(express.static(__dirname + '/public'));
app.use(logger(config.loggerMode));

app.set('views', __dirname);
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
  browserify.settings({
    transform: ['babelify']
  });

  app.get('/scripts/app.js', browserify(__dirname + '/client/js/app.js'));
}

app.get('*', function (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.render('layout', { app: renderToString(<RoutingContext {...renderProps} />) });
    } else {
      res.status(404).send('Not found');
    }
  })
});

module.exports = app;
