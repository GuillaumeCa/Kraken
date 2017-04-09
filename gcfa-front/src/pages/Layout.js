import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import NavBar from './../components/NavBar';

import Home from './Home';
import Test from './Test';

const CONTAINER_STYLE = {
  marginTop: 60,
  padding: 20,
}

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <div style={CONTAINER_STYLE}>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
        </div>
      </div>
    );
  }
}

export default Layout;
