import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from 'react-router'
import routes from '../../routes';

render((
  <Router>
    {routes}
  </Router>
), document.getElementById('app'));
