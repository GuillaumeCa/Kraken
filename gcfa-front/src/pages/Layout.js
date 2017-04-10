import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Banner from '../components/Banner';

import Home from './Home';
import Test from './Test';
import Documentation from './Documentation';

const CONTAINER_STYLE = {
  marginTop: 60,
  // padding: 20,
}

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <div style={CONTAINER_STYLE}>
          <Banner>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
            <Route path="/documentation" component={Documentation} />
          </Banner>
        </div>
      </div>
    );
  }
}

export default Layout;
