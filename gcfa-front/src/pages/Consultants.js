import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../components/Loader';
import BarCard, { List, UserCard } from '../components/BarCard';
import UsersList from '../components/UserList';

import * as userManagementService from '../services/userManagementService';

export default class Consultants extends Component {

  requestConsultants = () => {
    return userManagementService.getAllConsultant();
  }

  selectConsultant = (consultant) => {
    alert('consultant selected !')
  }

  renderActions = (consultant) => {
    return (
      <div>
        <FlatButton primary label="Voir"
          onTouchTap={() => this.selectConsultant(consultant)}
        />
        <FlatButton primary label="Supprimer"
          onTouchTap={() => this.selectConsultant(consultant)}
        />
      </div>
    )
  }

  renderTitle = (consultant) => {
    return `${consultant.firstName} ${consultant.lastName}`;
  }

  renderSubtitle = (consultant) => {
    return `${consultant.email}`;
  }

  render() {
    return (
      <div>
        <UsersList
          requestUsers={this.requestConsultants}
          renderActions={this.renderActions}
          title={this.renderTitle}
          subtitle={this.renderSubtitle}
        />
      </div>
    )
  }
}
