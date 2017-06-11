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

import Apprentices from './Apprentices';
import Tutors from './Tutors';
import Consultants from './Consultants';

import ApprenticeDetail from '../components/UserDetails/Apprentice';
import TutorDetail from '../components/UserDetails/Tutor';
import ConsultantDetail from '../components/UserDetails/Consultant';

import * as userManagementService from '../services/userManagementService';

const CONTENT_STYLE = {
  margin: '0 auto',
  marginTop: 60,
  fontWeight: 'normal',
}

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
    formData: null,
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

  onCreateActionForm = () => {
    const { currentTab, formData } = this.state;
    switch (currentTab) {
      case 1:
        userManagementService.createTutor(formData)
          .then(ok => {
            this.closeDocModal()
            this.requestTutors()
          });
        break
      case 2:

    }
    this.setState({ formData: null });
  }

  updateFormData = (formData) => {
    this.setState({ formData });
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
        <div style={HEAD_STYLE}>
          <h1 className="main-title">{allTabs[currentTab]}</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Autres utilisateurs" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleBar} style={{ marginRight: 10 }} />
            <FlatButton primary label="Ajouter" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.addUser} />
          </div>
        </div>

	    	<Drawer
	    	  docked
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

        <div style={CONTENT_STYLE}>
          <Switch>
            <Redirect exact from="/users" to="/users/apprentices" />
            <Route exact path="/users/apprentices" component={Apprentices} />
            <Route exact path="/users/tutors" component={Tutors} />
            <Route exact path="/users/consultants" component={Consultants} />
            <Route path="/users/apprentices/detail" component={ApprenticeDetail} />
            <Route path="/users/tutors/:id/detail" component={TutorDetail} />
            <Route path="/users/consultants/:id/detail" component={ConsultantDetail} />
            <Route component={() => <div>erreur</div>} />
          </Switch>
        </div>

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
          update={this.updateFormData}
        />
	    </div>
    )
  }

}

export default Users;
