import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import routes from '../../routes.jsx';

render((
  <Router>
    {routes}
  </Router>
), document.getElementById('app'));
