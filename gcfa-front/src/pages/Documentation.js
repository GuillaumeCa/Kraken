import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Download from 'material-ui/svg-icons/file/cloud-download';

import BarCard, { DocumentCard, DocumentationCard, List } from '../components/BarCard';
import Loader from '../components/Loader';
import UploadModal from '../components/UploadModal';
import Time from '../components/Time';

import Auth from '../components/Auth';

import * as documentationService from '../services/documentationService';
import * as helperService from '../services/helperService';

import {
  SUPER_ADMIN
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
    documentationService.getDocumentation(doc.id)
    .then(res => {
      const filename = res.headers['x-filename'];
      helperService.downloadFile(res.data, filename);
    })
  }

  openDocModal = () => {
    this.setState({ openDocModal: true });
  }

  onSelectFile = (file) => {
    this.setState({ file });
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });
    console.log(this.state.file)
    documentationService.upload(this.state.file, 'CALENDAR', this.onUploadProgress)
      .then(res => {

        this.closeDocModal();
      });
  }

  onUploadProgress = (progress) => {
    this.setState({
      uploadProgress: Math.round((progress.loaded * 100) / progress.total)
    });
  }

  closeDocModal = () => {
    this.setState({
      uploadProgress: 0,
      uploadStarted: false,
      openDocModal: false
    });
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
  	  />,
  	];

    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Documentation</h1>
          <div style={{ marginLeft: 'auto' }}>
            <Auth roles={[SUPER_ADMIN]}>
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
                      <BarCard key={doc.id} actions={<FlatButton primary  labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} icon={<Download />} />}>
                        <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                      </BarCard>
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
                      <BarCard key={doc.id} actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                        <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                      </BarCard>
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
                      <BarCard key={doc.id} actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                        <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
                      </BarCard>
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
          onSelectFile={file => this.setState({ file })}
        	docType="pdf"
        />
      </div>
    );
  }
}

export default Documentation;
