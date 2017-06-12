import React, { Component } from 'react';

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
