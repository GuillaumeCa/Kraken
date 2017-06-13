import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';
import UploadModal from '../../components/Modal/Upload';

import * as userManagementService from '../../services/userManagementService';

import Auth from '../../components/Auth';
import * as Roles from '../../constants';

const BUTTON_STYLE = {
  fontSize: 15,
  padding: '0 10px'
}

export default class Apprentices extends Component {

  state = {
    users: [[], [], []],
    loading: false,
    error: false,

    openDocModal: false,
    file: null,
    uploadStarted: false,
    uploadProgress: 0,
    docSelected: null,
    isValidFile: false,
  }

  componentDidMount() {
    this.requestApprentices();
  }

  requestApprentices() {

    if (this.props.tutorId==null) {
      this.setState({ loading: true });
      userManagementService.getAllApprentices()
        .then(userManagementService.filterApprenticesByYear)
        .then(users => {
          this.setState({users: users, loading: false});
      });
    }
    else {
      this.setState({ loading: true });
      userManagementService.getAllApprenticesFromTutor(this.props.tutorId)
        .then(userManagementService.filterApprenticesByYear)
        .then(users => {
          this.setState({users: users, loading: false});
      });
    }
  }

  importApprentice = () => {
    this.setState({ openDocModal: true });
  }

  getCSVTemplate = () => {
    
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });

    const { file, fileType } = this.state;

    userManagementService.createApprenticeFromCSV(file, this.onUploadProgress)
      .then(res => {
        this.closeDocModal();
        this.requestApprentices();
      });
  }

  closeDocModal = () => {
    this.setState({
      uploadProgress: 0,
      uploadStarted: false,
      openDocModal: false,
      docSelected: null,
    });
  }

  checkSelectedFile = (file) => {
    let isValid = false;

    isValid = file == null ? false : true;
    this.setState({isValidFile: isValid});

    if(isValid) {
      this.setState({file: file});
    }
  }

  renderActions = (apprentice) => {
    return (
      <div>
        <Link to={`/users/apprentices/${apprentice.id}/detail`}>
          <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} style={{ minWidth: 0 }} />
        </Link>
      </div>
    )
  }

  renderTitle = (apprentice) => {
    return `${apprentice.user.firstName} ${apprentice.user.lastName}`;
  }

  renderSubtitle = () => {
    return "";
  }

  render() {
    const {
      loading,
      users,
      error,

      openDocModal,
      file,
      uploadStarted,
      uploadProgress,
      docSelected,
    } = this.state;

    const {tutorId} = this.props;
    const modalDocButtons = [
      <FlatButton
        label="Annuler"
        primary
        onTouchTap={this.closeDocModal}
      />,
      <FlatButton
        label="Déposer"
        primary
        onTouchTap={this.onUploadDoc}
        disabled={!this.state.isValidFile}
      />,
    ];

    return (
      <Loader loading={loading} error={error} >
          <Auth roles={[Roles.SUPER_ADMIN]}>
            <RaisedButton primary label="Importer CSV" onTouchTap={this.importApprentice} style={{ marginBottom: 20 }} />
            <RaisedButton primary label="Template CSV" onTouchTap={this.getCSVTemplate} style={{ marginBottom: 20 }}/>
          </Auth>
        <div className="row">
          <div className="col-4">
            <p className="sub-title">A1 ({users[0].length})</p>
              <UsersList
                usersList={users[0]}
                renderActions={this.renderActions}
                title={this.renderTitle}
                subtitle={this.renderSubtitle}
                noUserLabel="Pas d'apprenti en A1"
              />
          </div>
          <div className="col-4">
            <p className="sub-title">A2 ({users[1].length})</p>
            <UsersList
              usersList={users[1]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A2"
            />
          </div>
          <div className="col-4">
            <p className="sub-title">A3 ({users[2].length})</p>
            <UsersList
              usersList={users[2]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A3"
            />
          </div>
        </div>
        <UploadModal
          title="Import CSV"
          open={openDocModal}
          actions={modalDocButtons}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.checkSelectedFile(file)}
          file={docSelected}
          acceptedType='.csv'
        />
      </Loader>
    )
  }
}
