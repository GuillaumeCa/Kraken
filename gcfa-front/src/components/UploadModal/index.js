import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Dialog from 'material-ui/Dialog';

import colors from '../../colors';
import './UploadModal.css';

const MODAL_TITLE_STYLE = {
  fontSize: 40,
  fontWeight: 'normal',
  color: colors.PRIMARY,
  margin: 0,
}

const MODAL_CONTAINER_STYLE = {
  padding: '0 10px',
}

const MODAL_DOCTYPE_STYLE = {
  fontSize: 25,
  fontWeight: 'normal',
  color: colors.SECONDARY,
  margin: '10px 0',
}

const MODAL_SUBTITLE_STYLE = {
  margin: 0,
  color: colors.GREY_DARK,
}

const DROPZONE_STYLE = {
  width: '100%',
  background: colors.GREY_LIGHT,
  color: colors.GREY_DARK,
  borderRadius: 5,
  padding: 40,
  marginTop: 20,
  textAlign: 'center',
}

const DROPZONE_ICON_STYLE = {
  width: 60,
  marginBottom: 10,
}

const DROPZONE_TITLE_STYLE = {
  fontWeight: 'normal',
  fontSize: 25,
  margin: 0,
  marginBottom: 10,
}

const DROPZONE_MSG_STYLE = {
  fontSize: 15,
  margin: 0,
}

export default class UploadModal extends Component {

  onDrop = (acceptedFile) => {
    this.props.onSelectFile(acceptedFile)
  }

  render() {

    const { file } = this.props;

    return (
      <Dialog
        modal={false}
        open={this.props.open}
        actions={this.props.actions}
      >
        <div style={MODAL_CONTAINER_STYLE}>
          <h1 style={MODAL_TITLE_STYLE}>{this.props.title}</h1>
          <h2 style={MODAL_DOCTYPE_STYLE}>{this.props.docType}</h2>
          <p style={MODAL_SUBTITLE_STYLE}>{this.props.subtitle}</p>

          <div>
            <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} style={DROPZONE_STYLE} className="dropzone" activeClassName="dropzone-hover">

              {
                !file &&
                <div>
                  <img src="icons/download.png" alt="download-icon" style={DROPZONE_ICON_STYLE}/>
                  <h2 style={DROPZONE_TITLE_STYLE}>Cliquez ou déposez votre document ici</h2>
                  <p style={DROPZONE_MSG_STYLE}>PDF obligatoire (10 Mo maximum)</p>
                </div>
              }

              {
                file &&
                <div>
                  {
                    (file.validType && file.validSize) &&
                    <div>
                      <img src="icons/PDF.png" alt="icon-file" style={DROPZONE_ICON_STYLE}/>
                      <h2 style={DROPZONE_TITLE_STYLE}>{file.name}</h2>
                    </div>
                  }
                  {
                    (!file.validType || !file.validSize) &&
                    <div>
                      <h2 style={DROPZONE_TITLE_STYLE}>Le fichier séléctionné est invalide</h2>
                      <p style={DROPZONE_MSG_STYLE}>Réessayer avec un fichier au format PDF et pesant moins de 10 Mo</p>
                    </div>
                  }
                </div>
              }
            </Dropzone>
          </div>

        </div>
      </Dialog>

    )
  }
}
