import React from 'react'
import { Route } from 'react-router'

class App extends React.Component {
  render() {
    return <div>
      hello isomorphic react - TEST
    </div>;
  }
}

export default (
  <Route path='/' component={App}>
  </Route>
)
