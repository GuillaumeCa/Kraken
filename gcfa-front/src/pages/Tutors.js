import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../components/Loader';
import BarCard, { List, UserCard } from '../components/BarCard';
import UsersList from '../components/UserList/User';

import * as userManagementService from '../services/userManagementService';

export default class Tutors extends Component {

  requestTutors = () => {
    return userManagementService.getAllTutor();
  }

  selectTutor = (tutor) => {
    alert('tutor selected !')
  }

  renderActions = (tutor) => {
    return (
      <div>
        <FlatButton primary label="Voir"
          onTouchTap={() => this.selectTutor(tutor)}
        />
        <FlatButton primary label="Supprimer"
          onTouchTap={() => this.selectTutor(tutor)}
        />
      </div>
    )
  }

  renderTitle = (tutor) => {
    return `${tutor.user.firstName} ${tutor.user.lastName}`;
  }

  renderSubtitle = (tutor) => {
    return `${tutor.user.email} - ${tutor.job}`;
  }

  render() {
    return (
      <div>
        <UsersList
          requestUsers={this.requestTutors}
          renderActions={this.renderActions}
          title={this.renderTitle}
          subtitle={this.renderSubtitle}
        />
      </div>
    )
  }
}
