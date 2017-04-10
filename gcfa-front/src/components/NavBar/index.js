import React, { Component } from 'react';
import './NavBar.css';

import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';

import colors from '../../colors';

const NAVBAR_MAIN_STYLE = {
  color: colors.PRIMARY
}
const NAVBAR_BUTTON_STYLE = {
  marginLeft: 'auto',
  padding: 10,
  verticalAlign: 'middle',
}

const AVATAR_STYLE = {
  cursor: 'pointer',
}

const PROFILE_NAME_STYLE = {
  margin: 0,
  padding: 10,
  textAlign: 'right',
  color: colors.GREY_DARK,
  borderBottom: '1px solid #eee',
}

class NavBar extends Component {

  state = {
    open: false,
  }

  onLogout = () => {
    authService.logout();
    this.props.history.push('/');
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  onClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  render() {
    return (
      <div className="NavBar">
        <div className="main" style={NAVBAR_MAIN_STYLE}>
          <Link to="/">GCFA</Link>
        </div>
        <nav className="navigation">
          <div className="link">
            <Link to="/documentation">Documentation</Link>
          </div>
        </nav>
        <div style={NAVBAR_BUTTON_STYLE}>
          <Avatar size={35} style={AVATAR_STYLE} onTouchTap={this.onClick}>G</Avatar>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <div>
              <p style={PROFILE_NAME_STYLE}>Guillaume Carré</p>
              <Menu>
                <MenuItem primaryText="Profil" />
                <MenuItem primaryText="Déconnexion" onTouchTap={this.onLogout} />
              </Menu>
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

export default NavBar;
