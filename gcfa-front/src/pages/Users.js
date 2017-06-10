import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import UploadModal from '../components/Modal/Upload';
import FormModal from '../components/UserForm';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Download from 'material-ui/svg-icons/file/cloud-download';

import ApprenticeList from '../components/UserList/Apprentice';


import * as userManagementService from '../services/userManagementService';


const DRAWER_STYLE = {
  marginTop: 80,
}

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

class Users extends Component {

  state = {
  	currentTab: 0,
    allTabs: ["Apprentis", "Tuteurs", "Consultants"],
    error: false,
    openDocModal: false,
    file: null,
    uploadStarted: false,
    uploadProgress: 0,
    docSelected: null,
    isValidFile: false,
    openFormModal: false,
    showBar: false,
  }

  chooseUser = (user) => {
    const users = { apprentice: 0, tutor: 1, consultant: 2 };
    this.setState({ currentTab: users[user], showBar: false });
  }

  addUser = (event) => {
    if(this.state.currentTab == 0) {
      this.importApprentice();
    }

    else {
      this.handleOpenForm()
    }
  }

  toggleBar = () => {
    this.setState({ showBar: !this.state.showBar });
  }

  handleOpenForm = () => {
    this.setState({openFormModal: true});
  }

  handleEditClose = () => {
    this.setState({ openEdit: false, anchorEl: null, docSelected: null });
  }

  importApprentice = () => {
    this.setState({ openDocModal: true });
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });

    const { file, fileType } = this.state;

    userManagementService.createApprenticeFromCSV(file, this.onUploadProgress)
      .then(res => {
        this.closeDocModal();
      });

  }

  closeDocModal = () => {
    this.setState({
      uploadProgress: 0,
      uploadStarted: false,
      openDocModal: false,
      docSelected: null,
      openFormModal: false
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

  render() {

    const {
      currentTab,
      allTabs,
      error,
      openDocModal,
      file,
      uploadStarted,
      uploadProgress,
      docSelected,
      openFormModal,
      showBar,
    } = this.state;

    const modalButtons = [
      <FlatButton
        label="Annuler"
        primary={true}
        onTouchTap={this.closeDocModal}
      />,
      <FlatButton
        label="Déposer"
        primary={true}
        onTouchTap={this.onUploadDoc}
        disabled={!this.state.isValidFile}
      />,
    ];

    const modalFormButtons = [
      <FlatButton
        label="Annuler"
        primary={true}
        onTouchTap={this.closeDocModal}
      />,
      <FlatButton
        label="Créer"
        primary={true}
        onTouchTap={this.closeDocModal}
      />,
    ];

    return (
    	<div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">{allTabs[currentTab]}</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Autres utilisateurs" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleBar} style={{ marginRight: 10 }} />
            <FlatButton primary label="Ajouter" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.addUser} />
          </div>
        </div>

	    	<Drawer
	    	  docked={true}
	    	  open={showBar}
          width={200}
	    	>
	    	  <div style={DRAWER_STYLE}>
		    	  <Link to="/users/apprentices">
              <MenuItem key={1} onTouchTap={() => this.chooseUser('apprentice')}>Apprentis</MenuItem>
            </Link>
            <Link to="/users/tutors">
              <MenuItem key={2} onTouchTap={() => this.chooseUser('tutor')}>Tuteurs</MenuItem>
            </Link>
            <Link to="/users/consultants">
              <MenuItem key={3} onTouchTap={() => this.chooseUser('consultant')}>Consultants</MenuItem>
            </Link>
		     </div>
	    	</Drawer>

        <Switch>
          <Route path="/users/apprentices" component={ApprenticeList} />
          <Route path="/users/tutors" component={() => <div>Consultants</div>} />
          <Route path="/users/consultants" component={() => <div>Consultants</div>} />
          <Route component={() => <div>erreur</div>} />
        </Switch>

        <UploadModal
          title="Import CSV"
          open={openDocModal}
          actions={modalButtons}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.checkSelectedFile(file)}
          file={docSelected}
          acceptedType='.csv'
        />

        <FormModal
          actions={modalFormButtons}
          openModal={openFormModal}
          userType={currentTab}
        />
	    </div>
    )
  }

}

export default Users;
