import React, { Component } from 'react';
import './NavBar.css';

import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';

import colors from '../../colors';

const NAVBAR_MAIN_STYLE = {
  color: colors.PRIMARY
}
const NAVBAR_BUTTON_STYLE = {
  marginLeft: 'auto',
  padding: 10,
}

class NavBar extends Component {

  onLogout = () => {
    authService.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="NavBar">
        <div className="main" style={NAVBAR_MAIN_STYLE}>
          <Link to="/">GCFA</Link>
        </div>
        <nav className="navigation">
          <Link to="/test">Test Page</Link>
        </nav>
        <div style={NAVBAR_BUTTON_STYLE} >
          <FlatButton primary onTouchTap={this.onLogout} label="Deconnexion" />
        </div>
      </div>
    );
  }
}

export default NavBar;
