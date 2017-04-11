import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import NotificationCenter from '../components/Notification';

import Home from './Home';
import Documentation from './Documentation';
import Profil from './Profil';


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
            <Route path="/documentation" component={Documentation} />
            <Route path="/profil" component={Profil} />
          </Banner>
        </div>
        <NotificationCenter />
      </div>
    );
  }
}

export default Layout;
