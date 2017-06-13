import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import NotificationCenter from '../components/Notification';

import * as authService from '../services/authService';

import Auth, { PrivateRoute } from '../components/Auth';

import Home from './Home';
import Documentation from './Documentation';
import Profil from './Profil';
import Users from './UsersManagement';
import Informations from './ContentManagement';
import ErrorComponent from './Error';


import {
  SUPER_ADMIN,
  CONSULTANT,
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

  state = {
    redirect: false,
  }

  constructor(props) {
    super(props);

    authService.handle403Errors(() => {
      authService.logout();
      this.setState({ redirect: true });
    })
  }

  render() {
    const year = (new Date()).getFullYear();
    return (
      <div>
        {
          this.state.redirect &&
          <Redirect to={{ pathname: '/login', state: { expired: true } }} />
        }
        <NavBar history={this.props.history} />
        <div style={CONTAINER_STYLE}>
          <Banner>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/documentation" component={Documentation} />
              <Route path="/profil" component={Profil} />
              <PrivateRoute path="/users" component={Users} roles={[SUPER_ADMIN, TUTOR, CONSULTANT]} />
              <PrivateRoute path="/infos" component={Informations} roles={[SUPER_ADMIN]} />
              <Route path="/error" component={ErrorComponent} />
              <Route component={ErrorComponent} />
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
