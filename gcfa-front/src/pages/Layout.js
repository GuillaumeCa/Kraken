import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import NavBar from './../components/NavBar';

import Home from './Home';
import Test from './Test';


class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <Router>
          <div>
          
            <Route path="/home" component={Home} />
              <Route render={props => (
                  <Redirect to="/home" />
                )} />

            <Route path="/test" component={Test} />

          </div>
        </Router>
      </div>
    );
  }
}

export default Layout;
