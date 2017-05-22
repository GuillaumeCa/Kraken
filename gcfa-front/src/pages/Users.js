import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import UploadModal from '../components/UploadModal';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Download from 'material-ui/svg-icons/file/cloud-download';

import * as documentationService from '../services/documentationService';


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
    openEdit: null,
    anchorEl: null,
    error: false,
    openDocModal: false,
    file: null,
    uploadStarted: false,
    uploadProgress: 0,
    docSelected: null,
    isValidFile: false,

  }

  requestAllApprentice = () => {
    this.setState({currentTab: 0});
  }

  requestAllTutor = () => {
  	this.setState({currentTab: 1});
  }

  requestAllConsultant = () => {
  	this.setState({ currentTab: 2 });
  }

  addUser = (event) => {
    this.setState({
      openEdit: true,
      anchorEl: event.currentTarget,
    });
  }

  handleEditClose = () => {
    this.handleEditClose();
  }

  createApprentice = () => {
    this.handleEditClose();
  }

  handleEditClose = () => {
    this.setState({ openEdit: false, anchorEl: null, docSelected: null });
  }

  importApprentice = () => {
    this.handleEditClose();
    this.setState({ openDocModal: true });
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });

    const { file, fileType } = this.state;

    documentationService.upload(file, fileType, this.onUploadProgress)
      .then(res => {
        this.closeDocModal();
        this.updateData();
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
  }

  render() {

    const {
      currentTab,
      allTabs,
      openEdit,
      anchorEl,
      error,
      openDocModal,
      file,
      uploadStarted,
      uploadProgress,
      docSelected,
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

    return (
    	<div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">{allTabs[currentTab]}</h1>
          {
            (currentTab == 0) &&
            <div style={{ marginLeft: 'auto' }}>
              <FlatButton primary label="Ajouter" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.addUser} />
            </div>
          }
        </div>

	    	<Drawer
	    	  docked={true}
	    	  open={true}
          width={200}
	    	>
	    	  <div style={DRAWER_STYLE}>
		    	  <MenuItem key={1} onTouchTap={this.requestAllApprentice}>Apprentis</MenuItem>
		        <MenuItem key={2} onTouchTap={this.requestAllTutor}>Tuteurs</MenuItem>
		        <MenuItem key={3} onTouchTap={this.requestAllConsultant}>Consultants</MenuItem>
		     </div>
	    	</Drawer>

        <Popover
            open={this.state.openEdit}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={this.handleEditClose}
          >
          <Menu>
            <MenuItem primaryText="Créer" rightIcon={<Edit />} onTouchTap={this.createApprentice} />
            <MenuItem primaryText="Import CSV" rightIcon={<Download />} onTouchTap={this.importApprentice} />
          </Menu>
        </Popover>

        <UploadModal
          title=""
          open={openDocModal}
          actions={modalButtons}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.checkSelectedFile(file)}
          file={docSelected}
          acceptedType='.csv'
        />
	    </div>
    )
  }

}

export default Users;
