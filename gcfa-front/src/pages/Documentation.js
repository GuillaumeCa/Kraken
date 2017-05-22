import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/content/remove-circle';
import Download from 'material-ui/svg-icons/file/cloud-download';

import BarCard, { DocumentCard, DocumentationCard, List } from '../components/BarCard';
import Loader from '../components/Loader';
import UploadModal from '../components/UploadModal';
import Time from '../components/Time';


import Auth from '../components/Auth';

import * as documentationService from '../services/documentationService';
import { sendNotification } from '../components/Notification';


import {

  SUPER_ADMIN,
  APPRENTICE,
  CALENDAR,
  TOOL,
  EVALUATION,

} from '../constants';

const BUTTON_STYLE = {
  fontSize: 20,
}

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

class Documentation extends Component {

  state = {
    calendars: [],
    tools: [],
    evaluation: [],
    loading: true,
    error: false,
    openDocModal: false,
    file: null,
    uploadStarted: false,
    uploadProgress: 0,
    fileType: CALENDAR,
    docSelected: null,
    openEdit: false,
    isEdit: false,
    isValidFile: false,
  }

  componentDidMount() {
    this.requestAllDocumentation();
  }

  requestAllDocumentation() {
    this.setState({ loading: true, error: false });
    documentationService.getAllDocumentation()
      .then(data => {
        if (data) {
          const { calendars, tools, evaluation } = data;
          this.setState({ calendars, tools, evaluation, error: false, loading: false });
          return;
        }
      }).catch(e => this.setState({ error: true, loading: false }));
  }

  openDoc = (doc) => {
    documentationService.getDocumentation(doc.id);
  }

  openDocModal = () => {
    this.setState({ openDocModal: true });
  }

  onSelectFile = (file) => {
    this.setState({ file });
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });

    if(!this.state.isEdit) {
      const { file, fileType } = this.state;

      documentationService.upload(file, fileType, this.onUploadProgress)
        .then(res => {
          this.closeDocModal();
          this.updateData();
        });
    }

    else {
      const { docSelected, file } = this.state;
      documentationService.editDocumentation(docSelected.id, file, this.onUploadProgress)
      .then(() => {
        sendNotification('Document modifié avec succès');
        this.closeDocModal();
        this.updateData();
      })

      this.setState({isEdit: false});
    }

  }

  onUploadProgress = (progress) => {
    this.setState({
      uploadProgress: Math.round((progress.loaded * 100) / progress.total)
    });
  }

  editDoc = (event, doc) => {
    this.setState({
      openEdit: true,
      anchorEl: event.currentTarget,
      docSelected: doc,
    });
  }

  handleEditClose = () => {
    this.setState({ openEdit: false, anchorEl: null, docSelected: null });
  }

  handleDeleteDoc = () => {
    const { docSelected } = this.state;
    documentationService.deleteDocumentation(docSelected.id)
      .then(() => {
        sendNotification('Document supprimé avec succès');
        this.updateData();
      })
    this.setState({ openEdit: false });
  }

  handleReplaceDoc = () => {

    this.handleEditClose();
    this.setState({ openDocModal: true, isEdit: true });
  }

  handleDownloadDoc = () => {
    const { docSelected } = this.state;
    documentationService.getDocumentation(docSelected.id);
    this.setState({ openEdit: false });
  }

  updateData() {
    this.requestAllDocumentation();;
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

  onSetFileType = (e, i, value) => {
    this.setState({ fileType: value });
  }

  render() {

    const {
      calendars,
      tools,
      evaluation,
      openDocModal,
      loading,
      error,
      uploadProgress,
      uploadStarted,
      file,
      fileType,
      docSelected
    } = this.state;

    const renderDate = (date) => <span>Ajouté le <Time format="DD/MM/YYYY" date={date} /></span>

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
          <h1 className="main-title">Documentation</h1>
          <div style={{ marginLeft: 'auto' }}>
            <Auth roles={[SUPER_ADMIN]} >
              <FlatButton primary label="Ajouter" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.openDocModal} />
            </Auth>
          </div>
        </div>

        <Loader loading={loading} error={error}>
          <div>
            <section>
              <h2 className="sub-title">Calendriers</h2>
              <List key={1} data={calendars} emptyLabel="Aucun documents">
                { calendars.map((doc) => {
                    return (
                      <div key={doc.id}>
                        <Auth roles={[APPRENTICE]} >
                          <BarCard actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                            <DocumentationCard title={doc.name} type={doc.fileType} subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>

                        <Auth roles={[SUPER_ADMIN]} >
                          <BarCard actions={<FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE} onTouchTap={(e) => this.editDoc(e, doc)}/>}>
                            <DocumentationCard title={doc.name} type={doc.fileType} subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>
                      </div>
                    )
                  })
                }
              </List>
            </section>
            <section>
              <h2 className="sub-title">Outils de l'apprenti</h2>
              <List key={2} data={tools} emptyLabel="Aucun documents">
                { tools.map((doc) => {
                    return (
                      <div key={doc.id}>
                        <Auth roles={[APPRENTICE]} >
                          <BarCard actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                            <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>

                        <Auth roles={[SUPER_ADMIN]} >
                          <BarCard actions={<FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE} onTouchTap={(e) => this.editDoc(e, doc)}/>}>
                            <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>
                      </div>
                    )
                  })
                }
              </List>
            </section>
            <section>
              <h2 className="sub-title">Documents d'évaluation</h2>
              <List key={3} data={evaluation} emptyLabel="Aucun documents">
                { evaluation.map((doc) => {
                    return (
                      <div key={doc.id}>
                        <Auth roles={[APPRENTICE]} >
                          <BarCard actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                            <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>

                        <Auth roles={[SUPER_ADMIN]} >
                          <BarCard actions={<FlatButton primary label="Modifier" labelStyle={BUTTON_STYLE} onTouchTap={(e) => this.editDoc(e, doc)}/>}>
                            <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                          </BarCard>
                        </Auth>
                      </div>
                    )
                  })
                }
              </List>
            </section>
          </div>
        </Loader>

        <UploadModal
        	title="Ajouter une documentation"
        	open={openDocModal}
        	actions={modalButtons}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.checkSelectedFile(file)}
          file={docSelected}
          acceptedType='.pdf, .xls, .xlsx, .doc, .docx'
        >
          <SelectField
            floatingLabelText="Type de document"
            value={fileType}
            onChange={this.onSetFileType}
          >
            <MenuItem value={CALENDAR} primaryText="Calendrier" />
            <MenuItem value={TOOL} primaryText="Outil de l'apprenti" />
            <MenuItem value={EVALUATION} primaryText="Document d'évaluation" />
          </SelectField>
        </UploadModal>

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

export default Documentation;
