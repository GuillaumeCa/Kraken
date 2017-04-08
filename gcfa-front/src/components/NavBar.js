import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">GCFA</Link>
        </div>
        <nav>
          <Link to="/test">Test Page</Link>
        </nav>
      </div>
    );
  }
}

export default NavBar;
