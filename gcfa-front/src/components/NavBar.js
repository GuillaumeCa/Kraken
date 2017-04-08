import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
        <div>
          <header>
            <Link to="/home">GCFA</Link>
            <Link to="/test">Test Page</Link>
          </header>
        </div>
    );
  }
}

export default NavBar;
