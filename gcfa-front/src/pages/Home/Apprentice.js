import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/content/remove-circle';
import Download from 'material-ui/svg-icons/file/cloud-download';

import BarCard, { DocumentCard, List } from '../../components/BarCard';
import UploadModal from '../../components/UploadModal';
import { sendNotification } from '../../components/Notification';
import Loader from '../../components/Loader';
import Time, { DueTime } from '../../components/Time';

import * as documentService from '../../services/documentService';
import * as userService from '../../services/userService';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

class ApprenticeHome extends Component {

state = {
    openModal: false,
    docSelected: {},
    openEdit: false,
    notValidFile: false,
    sentDocs: [],
    dueDocs: [],
    file: null,
    replaceDoc: false,

    loadingDue: false,
    loadingSent: false,

    errorDue: false,
    errorSent: false,

    uploadStarted: false,
    uploadProgress: 0,

    apprenticeStartY: 0,
  }

  componentDidMount() {
    this.requestDue();
    userService.getApprenticeStartDate()
      .then(apprenticeStartY => this.setState({ apprenticeStartY }))
  }

  requestSent() {
    this.setState({ loadingSent: true });
    documentService.getSentDocuments()
      .then(docs => {
        this.setState({ loadingSent: false, sentDocs: docs.data });
      })
      .catch(err => {
        this.setState({ loadingSent: false, errorSent: true });
      })
  }

  requestDue() {
    this.setState({ loadingDue: true });
    documentService.getDueDocuments()
      .then(docs => {
        this.setState({ loadingDue: false, dueDocs: docs.data });
      })
      .catch(err => {
        this.setState({ loadingDue: false, errorDue: true });
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
    const { docSelected, file, replaceDoc } = this.state;
    this.setState({ uploadProgress: 0, uploadStarted: true });
    if (replaceDoc) {
      this.replaceDoc()
    } else {
      this.uploadNewDoc()
    }
  }

  uploadNewDoc() {
    const { docSelected, file } = this.state;
    documentService.uploadDocument(file, docSelected.id, this.onUploadProgress)
      .then(res => {
        this.handleClose();
        this.updateData();
        sendNotification('Document envoyé avec succès');
      });
  }

  replaceDoc() {
    const { docSelected, file } = this.state;
    documentService.editDocument(docSelected.type.id, file, this.onUploadProgress)
      .then(() => {
        sendNotification(`"${docSelected.type.name}" modifié avec succès`);
        this.updateData();
        this.handleClose();
      })
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
      replaceDoc: false,
      file: null
  	})
  }

  uploadDoc = (doc) => {
    const { apprenticeStartY } = this.state;
    doc.subtitle = <span>Document à rendre le <DueTime format="DD/MM/YYYY" doc={doc} startYear={apprenticeStartY} /></span>;
  	this.setState({
  		openModal: true,
  		docSelected: doc,
  	})
  }

  editDoc = (event, doc) => {
    const { apprenticeStartY } = this.state;
    doc.subtitle = <span>Document à rendre le <DueTime format="DD/MM/YYYY" doc={doc.type} startYear={apprenticeStartY} /></span>;
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
    this.setState({ openModal: true, openEdit: true, replaceDoc: true });
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
      replaceDoc,

      loadingSent,
      loadingDue,

      errorSent,
      errorDue,

      uploadStarted,
      uploadProgress,

      apprenticeStartY,
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
          <section>
            <h2 className="sub-title">Déposés</h2>
            <Loader loading={loadingSent} error={errorSent}>
              <List data={sentDocs} emptyLabel="Aucun documents déposés">
                {
                  sentDocs.map(data => {
                    return (
                      <BarCard key={data.id} actions={
                        <FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE}
                          onTouchTap={(e) => this.editDoc(e, data)}
                        />
                      }>
                        <DocumentCard title={data.type.name} subtitle={
                          <span>rendu le <Time format="DD MMMM YYYY" date={data.creation} /></span>
                        } />
                      </BarCard>
                    )
                  })
                }
              </List>
            </Loader>
          </section>
        }
        <section>
          <h2 className="sub-title">A venir</h2>
          <Loader loading={loadingDue} error={errorDue}>
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
                        <span>À rendre le <DueTime format="Do MMMM YYYY" doc={data} startYear={apprenticeStartY} /></span>
                      } />
                    </BarCard>
                  )
                })
              }
            </List>
          </Loader>
        </section>


        <UploadModal
          title={replaceDoc ? "Modifier un document" : "Ajouter un document"}
        	open={openModal}
        	actions={modalButtons}
        	docType={docSelected.name}
          subtitle={docSelected.subtitle}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.setState({ file })}
          file={docSelected}
          acceptedType='.pdf'
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

export default ApprenticeHome;
