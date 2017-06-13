import React, { Component } from 'react';

import { Link, Redirect, Route } from 'react-router-dom';

import * as authService from '../../services/authService';

class Auth extends Component {
  render() {
    const { children, roles } = this.props;
    if (authService.hasRole(roles)) {
      return <span>{children}</span>;
    }
    return null;
  }
}

export default Auth;

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => (
    authService.hasRole(roles) ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
)

export { PrivateRoute };
