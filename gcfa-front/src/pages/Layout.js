import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import NavBar from './../components/NavBar';

import Home from './Home';
import Test from './Test';


class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/test" component={Test} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
