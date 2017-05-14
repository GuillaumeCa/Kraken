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
    docSelected: {},
    openEdit: false,
    notValidFile: true,
  }

  showDeliver = (doc) => {
    doc.subtitle = `Document à rendre le 12/02/16`;
  	this.setState({
  		openModal: true,
  		docSelected: doc,
  	})
  }

  handleClose = () => {
  	this.setState({
  		openModal: false,
  		docSelected: {},
      showOldDocs: false,
      notValidFile: true,
  	})
  }

  toggleOldDocs = () => {
    this.setState({ showOldDocs: !this.state.showOldDocs });
  }

  isValidFile = (isValid) => {
    this.setState({
      notValidFile: !isValid,
    })
  }

  handleSubmit = (file) => {

    this.handleClose()
    // Test send notif
    sendNotification('Document envoyé avec succès');
    console.log(file.name)

  	// Service call
  }

  editDoc = (event, doc) => {
    doc.subtitle = `Document à rendre le 12/02/16`;
    console.log(doc);
    this.setState({
      openEdit: true,
      anchorEl: event.currentTarget,
      docSelected: doc,
    });
  }

  handleEditClose = () => {
    this.setState({ openEdit: false, anchorEl: null });
  }

  handleDeleteDoc = () => {

  }

  handleReplaceDoc = () => {
    this.setState({ openModal: true });
    this.handleEditClose();
  }

  handleDownloadDoc = () => {

  }

  render() {

    const {
      docSelected,
      openModal,
      notValidFile,
      showOldDocs,
    } = this.state;

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
        disabled={notValidFile}
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
        	open={openModal}
        	actions={modalButtons}
        	docType={docSelected.name}
          subtitle={docSelected.subtitle}
          onSelectFile={(file) => this.isValidFile(file !== null)}
        />

        <Popover
          open={this.state.openEdit}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleEditClose}
        >
        <Menu>
          <MenuItem primaryText="Modifier" rightIcon={<Edit />} onTouchTap={this.handleReplaceDoc} />
          <MenuItem primaryText="Supprimer" rightIcon={<Delete />} onTouchTap={this.handleDeleteDoc} />
          <MenuItem primaryText="Télécharger" rightIcon={<Download />} onTouchTap={this.handleDownloadDoc} />
        </Menu>
      </Popover>
      </div>
    );
  }
}

export default Home;
