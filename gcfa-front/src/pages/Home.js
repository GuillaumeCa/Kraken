import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/content/remove-circle';
import Download from 'material-ui/svg-icons/file/cloud-download';

import BarCard, { DocumentCard, List } from '../components/BarCard';
import UploadModal from '../components/UploadModal';
import { sendNotification } from '../components/Notification';
import Loader from '../components/Loader';
import Time from '../components/Time';

import * as documentService from '../services/documentService';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

class Home extends Component {
  state = {
    openModal: false,
    docSelected: {},
    openEdit: false,
    notValidFile: false,
    sentDocs: [],
    dueDocs: [],
    file: null,

    loadingDue: false,
    loadingSent: false,

    uploadStarted: false,
    uploadProgress: 0,

  }

  componentDidMount() {
    this.requestDue();
  }

  requestSent() {
    this.setState({ loadingSent: true });
    documentService.getSentDocuments()
      .then(docs => {
        this.setState({ loadingSent: false, sentDocs: docs.data });
      })
  }

  requestDue() {
    this.setState({ loadingDue: true });
    documentService.getDueDocuments()
      .then(docs => {
        this.setState({ loadingDue: false, dueDocs: docs.data });
      })
  }

  uploadDoc = (doc) => {
    doc.subtitle = <span>Document à rendre le <Time format="DD/MM/YYYY" date={Date.now() + doc.deltaDeadline} /></span>;
  	this.setState({
  		openModal: true,
  		docSelected: doc,
  	})
  }


  toggleOldDocs = () => {
    this.requestSent();
    this.setState({ showSentDocs: !this.state.showSentDocs });
  }

  isValidFile = (isValid) => {
    this.setState({
      notValidFile: !isValid,
    })
  }

  handleSubmit = () => {
    const { docSelected, file } = this.state;
    this.setState({ uploadProgress: 0, uploadStarted: true });
    documentService.uploadDocument(file, docSelected.id, this.onUploadProgress)
      .then(res => {
        this.handleClose();
        this.updateData();
        sendNotification('Document envoyé avec succès');
      });
  }

  onUploadProgress = (progress) => {
    this.setState({
      uploadProgress: Math.round((progress.loaded * 100) / progress.total)
    });
  }

  handleClose = () => {
  	this.setState({
  		openModal: false,
  		docSelected: {},
      notValidFile: false,
      uploadProgress: 0,
      uploadStarted: false,
      file: null
  	})
  }

  editDoc = (event, doc) => {
    doc.subtitle = <span>Document à rendre le <Time format="DD/MM/YYYY" date={doc.deltaDeadline} /></span>;
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
    const { docSelected } = this.state;
    documentService.deleteDocument(docSelected.id)
      .then(() => {
        sendNotification('Document supprimé avec succès');
        this.updateData();
      })
    this.setState({ openEdit: false });
  }

  handleReplaceDoc = () => {
    this.setState({ openModal: true });
    this.handleEditClose();
  }

  handleDownloadDoc = () => {
    const { docSelected } = this.state;
    documentService.getDocument(docSelected.id);
    this.setState({ openEdit: false });
  }

  updateData() {
    this.requestDue();
    if (this.state.showSentDocs) {
      this.requestSent();
    }
  }

  render() {

    const {
      docSelected,
      openModal,
      notValidFile,
      showSentDocs,
      sentDocs,
      dueDocs,

      loadingSent,
      loadingDue,

      uploadStarted,
      uploadProgress,

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
        // disabled={notValidFile}
  	  />,
  	];

    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Suivi</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label={showSentDocs ? "Masquer déposés" : "Afficher déposés"} backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleOldDocs} />
          </div>
        </div>

        {
          showSentDocs &&
          <Loader loading={loadingSent}>
            <section>
              <h2 className="sub-title">Déposés</h2>
              <List data={sentDocs} emptyLabel="Aucun documents déposés">
                {
                  sentDocs.map(data => {
                    return (
                      <BarCard key={data.id} actions={
                        <FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE}
                          onTouchTap={(e) => this.editDoc(e, data)}
                        />
                      }>
                        <DocumentCard title={data.type.name} subtitle="sous-titre" />
                      </BarCard>
                    )
                  })
                }
              </List>
            </section>
          </Loader>
        }
        <Loader loading={loadingDue}>
          <section>
            <h2 className="sub-title">A venir</h2>
            <List data={dueDocs} emptyLabel="Aucun documents à venir">
              {
                dueDocs.map(data => {
                  return (
                    <BarCard key={data.id} actions={
                        <FlatButton primary label="Déposer" labelStyle={BUTTON_STYLE}
                          onTouchTap={() => this.uploadDoc(data)}
                        />
                      }>
                      <DocumentCard title={data.name} subtitle={
                        <span>À rendre le <Time format="DD MMMM YYYY" date={Date.now() + + data.deltaDeadline} /></span>
                      } />
                    </BarCard>
                  )
                })
              }
            </List>
          </section>
        </Loader>


        <UploadModal
        	open={openModal}
        	actions={modalButtons}
        	docType={docSelected.name}
          subtitle={docSelected.subtitle}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.setState({ file })}
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
