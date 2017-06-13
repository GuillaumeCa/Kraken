import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';
import FormModal from '../../components/UserForm';
import { sendNotification } from '../../components/Notification';
import Confirm from '../../components/Modal/Confirm';

import Auth from '../../components/Auth';
import * as Roles from '../../constants';

import * as userManagementService from '../../services/userManagementService';

export default class Tutors extends Component {

  state = {
    usersList: [],
    loading: false,
    error: false,

    openForm: false,
    formData: {},

    openModal: false,
    selectedId: null,
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

  openModal = (id) => {
    this.setState({selectedId: id, openModal: true});
  }

  handleCloseModal = () => {
    this.setState({selectedId: null, openModal: false});
  }

  deleteTutor = (confirm) => {
    if(confirm) {
      userManagementService.deleteTutor(this.state.selectedId)
      .then(ok => {
        sendNotification("Tuteur supprimé")
        this.requestAllTutor();
      })
    }
    
    this.handleCloseModal()
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
        <Auth roles={[Roles.SUPER_ADMIN]}>
          <FlatButton secondary label="Supprimer" onTouchTap={() => this.openModal(tutor.id)}/>
        </Auth>
      </div>
    )
  }

  render() {
    const { error, loading, openModal } = this.state;
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
        <Auth roles={[Roles.SUPER_ADMIN]}>
          <RaisedButton primary label="+ Ajouter" style={{ marginBottom: 20 }} onTouchTap={this.showCreateForm} />
        </Auth>
        <Loader error={error} loading={loading}>
          <UsersList
            usersList={this.state.usersList}
            renderActions={this.renderActions}
            title={this.renderTitle}
            subtitle={this.renderSubtitle}
          />
        </Loader>
        <FormModal
          actions={modalFormButtons}
          openModal={this.state.openForm}
          update={this.onUpdateForm}
          userType={1}
        />

        <Confirm
          title="Suppression d'un tuteur"
          open={openModal}
          confirm={(confirm) => this.deleteTutor(confirm)}
        />

      </div>
    )
  }
}
