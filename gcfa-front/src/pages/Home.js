import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/content/remove-circle';
import Download from 'material-ui/svg-icons/file/cloud-download';


import BarCard, { DocumentCard } from '../components/BarCard';
import UploadModal from '../components/UploadModal';
import { sendNotification } from '../components/Notification';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

const deliveredData = [
  {
    id: 1,
    name: "Déclaration de compétences 1",
  },
  {
    id: 2,
    name: "Déclaration de compétences 2",
  },
  {
    id: 3,
    name: "Déclaration de compétences 3",
  },
]
const deliverData = [
  {
    id: 1,
    name: "Déclaration de compétences 1",
  },
  {
    id: 2,
    name: "Déclaration de compétences 2",
  },
  {
    id: 3,
    name: "Déclaration de compétences 3",
  },
]

class Home extends Component {
  state = {
    openModal: false,
    modalData: {},
    openEdit: false,
    uploadedFile: null,
  }

  showDeliver = (data) => {
  	this.setState({
  		openModal: true,
  		modalData: data,
  	})
  }

  handleClose = () => {
  	this.setState({
  		openModal: false,
  		modalData: {},
      uploadedFile: null,
      showOldDocs: false,
  	})
  }

  toggleOldDocs = () => {
    this.setState({ showOldDocs: !this.state.showOldDocs });
  }

  handleSubmit = () => {

    this.handleClose()
    // Test send notif
    sendNotification('Document envoyé avec succès');
    console.log(this.state.uploadedFile)

  	// Service call
  	//handleClose();
  }

  handleSelectFile = (file) => {
    const uploadedFile = Object.assign(file[0], {validType: file[0].type === 'application/pdf' ? true : false}, {validSize: (file[0].size)/1000000 <= 10 ? true : false })

    this.setState({
      uploadedFile: uploadedFile,
    })
  }

  editDoc = (event, doc) => {
    this.setState({ openEdit: true, anchorEl: event.currentTarget });
  }

  handleEditClose = () => {
    this.setState({ openEdit: false, anchorEl: null });
  }

  render() {

    const { modalData, openModal, uploadedFile, showOldDocs } = this.state;

  	const modalButtons = [
  	  <FlatButton
  	    label="Annuler"
  	    primary={true}
  	    onTouchTap={this.handleClose}
  	  />,
  	  <FlatButton
  	    label="Déposer"
  	    primary={true}
  	    onTouchTap={this.handleSubmit}
        disabled={uploadedFile === null || uploadedFile.validType === false || uploadedFile.validSize === false}
  	  />,
  	];

    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Suivi</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label={showOldDocs ? "Afficher récents" : "Afficher tout"} backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleOldDocs} />
          </div>
        </div>
        {
          showOldDocs &&
          <section>
            <h2 className="sub-title">Déposés</h2>
            {
              deliveredData.map(data => {
                return (
                  <BarCard key={data.id} actions={
                    <FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE}
                      onTouchTap={(e) => this.editDoc(e, data)}
                    />
                  }>
                  <DocumentCard title={data.name} subtitle="sous-titre" />
                </BarCard>
              )
            })
          }
        </section>
        }
        <section>
          <h2 className="sub-title">A venir</h2>
          {
            deliverData.map(data => {
              return (
                <BarCard key={data.id} actions={
                    <FlatButton primary label="Déposer" labelStyle={BUTTON_STYLE}
                      onTouchTap={() => this.showDeliver(data)}
                    />
                  }>
                  <DocumentCard title={data.name} subtitle="sous-titre" />
                </BarCard>
              )
            })
          }
        </section>

        <UploadModal
        	title="Ajouter un document"
        	open={openModal}
        	actions={modalButtons}
        	docType={modalData.name}
        	subtitle="A rendre avant le 10/03/2016"
          file={uploadedFile}
          onSelectFile={(file) => this.handleSelectFile(file)}
        />
        <Popover
          open={this.state.openEdit}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleEditClose}
        >
        <Menu>
          <MenuItem primaryText="Modifier" rightIcon={<Edit />} />
          <MenuItem primaryText="Supprimer" rightIcon={<Delete />} />
          <MenuItem primaryText="Télécharger" rightIcon={<Download />} />
        </Menu>
      </Popover>
      </div>
    );
  }
}

export default Home;
