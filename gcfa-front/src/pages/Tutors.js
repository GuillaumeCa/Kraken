import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../components/Loader';
import BarCard, { List, UserCard } from '../components/BarCard';
import UsersList from '../components/UserList';

import * as userManagementService from '../services/userManagementService';

const BUTTON_STYLE = {
  fontSize: 15,
}

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
        <Link to={{
          pathname: '/users/tutors/detail',
          state: {data: tutor}
        
        }}>
          <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}/>
        </Link>

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
