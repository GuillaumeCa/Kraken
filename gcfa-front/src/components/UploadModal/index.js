import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import colors from '../../colors';

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


export default class UploadModal extends Component {
  state = {
    files: [],
  }

  onDrop = (acceptedFiles) => {
    this.setState({
      files: acceptedFiles
    });
  }

  render() {
    return (
      <Dialog
        modal={true}
        open={this.props.open}
        actions={this.props.actions}
      >
        <div style={MODAL_CONTAINER_STYLE}>
          <h1 style={MODAL_TITLE_STYLE}>{this.props.title}</h1>
          <h2 style={MODAL_DOCTYPE_STYLE}>{this.props.docType}</h2>
          <p style={MODAL_SUBTITLE_STYLE}>{this.props.subtitle}</p>

          <div>
            <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>

            {this.state.files.length > 0 ? <div>
            <h2>{this.state.files.length} fichier séléctionné(s)</h2>
            <div>{this.state.files.map((file) => <p>{file.name}</p> )}</div>
            </div> : null}
          </div>

        </div>
      </Dialog>

    )
  }
}
