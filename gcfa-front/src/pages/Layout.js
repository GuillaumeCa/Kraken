import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import NotificationCenter from '../components/Notification';

import * as authService from '../services/authService';

import Auth from '../components/Auth';

import Home from './Home';
import Documentation from './Documentation';
import Profil from './Profil';
import Users from './Users';


import {
  SUPER_ADMIN,
  APPRENTICE,
  TUTOR,
} from '../constants';

import colors from '../colors';

const CONTAINER_STYLE = {
  marginTop: 60,
  // padding: 20,
}

const COPYRIGHT_STYLE = {
  color: colors.GREY_DARK,
  margin: 0,
  padding: 20,
  fontSize: 13,
  marginTop: 50,
  textAlign: 'center',
}

class Layout extends Component {

  constructor(props) {
    super(props);

    authService.handle403Errors(() => {
      authService.logout();
      this.props.history.push('/');
    })
  }

  render() {
    const year = (new Date()).getFullYear();
    return (
      <div>
        <NavBar history={this.props.history} />
        <div style={CONTAINER_STYLE}>
          <Banner>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/documentation" component={Documentation} />
              <Route path="/profil" component={Profil} />

              <Auth roles={[SUPER_ADMIN]}>
                <Route path="/users" component={Users} />
              </Auth>

              <Route component={() => <div>erreur</div>} />
            </Switch>
          </Banner>
        </div>
        <p style={COPYRIGHT_STYLE}>Copyright © ISEP {year} Institut Supérieur d'électronique de Paris. Tous droits réservés.</p>
        <NotificationCenter />
      </div>
    );
  }
}

export default Layout;
