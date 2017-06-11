import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';
import FormModal from '../../components/UserForm';
import { sendNotification } from '../../components/Notification';

import * as userManagementService from '../../services/userManagementService';

export default class Tutors extends Component {

  state = {
    openForm: false,
    formData: {},
    usersList: [],
  }

  componentDidMount() {
    this.requestAllTutor();
  }

  requestAllTutor() {
    userManagementService.getAllTutor()
      .then(res => {
        this.setState({ usersList: res.data });
      });
  }

  showCreateForm = () => {
    this.setState({ openForm: true });
  }

  onCreateActionForm = () => {
    const { formData } = this.state;
    userManagementService.createTutor(formData)
      .then(ok => {
        this.closeDocModal();
        this.requestAllTutor();
      })
  }

  onUpdateForm = (formData) => {
    this.setState({ formData });
  }

  closeDocModal = () => {
    this.setState({ openForm: false });
  }

  deleteTutor = (id) => {
    userManagementService.deleteTutor(id)
      .then(ok => {
        sendNotification("Tuteur supprimé")
        this.requestAllTutor();
      })
  }

  renderTitle = (tutor) => {
    return `${tutor.user.firstName} ${tutor.user.lastName}`;
  }

  renderSubtitle = (tutor) => {
    return `${tutor.user.email} - ${tutor.job}`;
  }

  renderActions = (tutor) => {
    return (
      <div>
        <Link to={`/users/tutors/${tutor.id}/detail`}>
          <FlatButton primary label="Voir"/>
        </Link>
        <FlatButton secondary label="Supprimer" onTouchTap={() => this.deleteTutor(tutor.id)}/>
      </div>
    )
  }

  render() {
    const modalFormButtons = [
      <FlatButton
        label="Annuler"
        primary
        onTouchTap={this.closeDocModal}
      />,
      <FlatButton
        label="Créer"
        primary
        onTouchTap={this.onCreateActionForm}
      />,
    ];
    return (
      <div>
        <RaisedButton primary label="Ajouter" style={{ marginBottom: 20 }} onTouchTap={this.showCreateForm} />
        <UsersList
          usersList={this.state.usersList}
          renderActions={this.renderActions}
          title={this.renderTitle}
          subtitle={this.renderSubtitle}
        />
        <FormModal
          actions={modalFormButtons}
          openModal={this.state.openForm}
          update={this.onUpdateForm}
          userType={1}
        />
      </div>
    )
  }
}