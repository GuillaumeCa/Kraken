import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';
import FormModal from '../../components/UserForm';
import { sendNotification } from '../../components/Notification';

import Auth from '../../components/Auth';
import * as Roles from '../../constants';

import * as userManagementService from '../../services/userManagementService';


export default class Consultants extends Component {

  state = {
    consultants: [],
    loading: false,
    error: false,

    openForm: false,
    formData: {},
  }

  componentDidMount() {
    this.requestConsultants();
  }

  requestConsultants() {
    this.setState({ loading: true });
    userManagementService.getAllConsultant()
      .then(res => {
        this.setState({ consultants: res.data, loading: false });
      })
  }

  showCreateForm = () => {
    this.setState({ openForm: true });
  }

  onCreateActionForm = () => {
    const { formData } = this.state;
    userManagementService.createConsultant(formData)
      .then(ok => {
        this.closeDocModal();
        this.requestConsultants();
      })
  }

  onUpdateForm = (formData) => {
    this.setState({ formData });
  }

  closeDocModal = () => {
    this.setState({ openForm: false });
  }

  deleteConsultant = (id) => {
    userManagementService.deleteConsultant(id)
      .then(ok => {
        sendNotification("Consultant supprimé")
        this.requestConsultants();
      })
  }

  renderActions = (consultant) => {
    return (
      <div>
        <Link to={`/users/consultants/${consultant.id}/detail`}>
          <FlatButton primary label="Voir"/>
        </Link>
        <Auth roles={[Roles.SUPER_ADMIN]}>
          <FlatButton secondary label="Supprimer" onTouchTap={() => this.deleteConsultant(consultant.id)}/>
        </Auth>
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
    const {error, loading, consultants} = this.state;
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
        <Loader loading={loading} error={error}>
          <UsersList
            usersList={consultants}
            renderActions={this.renderActions}
            title={this.renderTitle}
            subtitle={this.renderSubtitle}
          />
        </Loader>
        <FormModal
          actions={modalFormButtons}
          openModal={this.state.openForm}
          update={this.onUpdateForm}
          userType={2}
        />
      </div>
    )
  }
}
