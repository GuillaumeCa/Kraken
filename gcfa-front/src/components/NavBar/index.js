import React, { Component } from 'react';
import './NavBar.css';

import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Lock from 'material-ui/svg-icons/action/lock';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import * as userService from '../../services/userService';

import colors from '../../colors';

import Auth from '../../components/Auth';
import {
  SUPER_ADMIN,
  APPRENTICE,
  TUTOR,
  CONSULTANT
} from '../../constants';


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
    userData: null,
  }

  componentDidMount() {
    userService.getProfile()
      .then(userData => this.setState({ userData }));
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
    const { userData } = this.state;
    return (
      <div className="NavBar">
        <div className="main" style={NAVBAR_MAIN_STYLE}>
          <Link to="/">GCFA</Link>
        </div>
        <nav className="navigation">
          <div className="link">
            <Auth roles={[SUPER_ADMIN]}>
                <Link to="/users/apprentices">Utilisateurs</Link>
                <Link to="/documentation">Documentation</Link>
                <Link to="/stats">Statistiques</Link>
            </Auth>
            <Auth roles={[APPRENTICE]}>
                <Link to="/documentation">Documentation</Link>
            </Auth>
            <Auth roles={[TUTOR]}>
                <Link to="/users/apprentices">Utilisateurs</Link>
                <Link to="/documentation">Documentation</Link>
            </Auth>
            <Auth roles={[CONSULTANT]}>
                <Link to="/users/apprentices">Utilisateurs</Link>
                <Link to="/documentation">Documentation</Link>
            </Auth>
          </div>
        </nav>
          {
            userData &&
            <div style={NAVBAR_BUTTON_STYLE}>
              <Avatar size={35} style={AVATAR_STYLE} onTouchTap={this.onClick}>{userData.firstName.substr(0,1)}{userData.lastName.substr(0,1)}</Avatar>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
              >
                <div>
                  <p style={PROFILE_NAME_STYLE}>{ `${userData.firstName} ${userData.lastName}` }</p>
                  <Menu>
                    <MenuItem primaryText="Profil" containerElement={<Link to="/profil" />} onTouchTap={this.handleRequestClose} rightIcon={<AccountCircle />} />
                    <MenuItem primaryText="Déconnexion" onTouchTap={this.onLogout} rightIcon={<Lock />} />
                  </Menu>
                </div>
              </Popover>
            </div>
          }
      </div>
    );
  }
}

export default NavBar;
