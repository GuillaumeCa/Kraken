import React, { Component } from 'react';

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

const UPLOAD_BTN_STYLE = {
  uploadButton: {
    verticalAlign: 'middle',
    width:'50%',
    height:100
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
}

export default function UploadModal(props) {
  return (
    <Dialog
      modal={true}
      open={props.open}
      actions={props.actions}
    >
      <div style={MODAL_CONTAINER_STYLE}>
        <h1 style={MODAL_TITLE_STYLE}>{props.title}</h1>
        <h2 style={MODAL_DOCTYPE_STYLE}>{props.docType}</h2>
        <p style={MODAL_SUBTITLE_STYLE}>{props.subtitle}</p>
        <FlatButton
          label="Importer"
          labelPosition="before"
          containerElement="label"
          style={UPLOAD_BTN_STYLE.uploadButton}
        >
          <input type="file" style={UPLOAD_BTN_STYLE.uploadInput} />
        </FlatButton>

      </div>
    </Dialog>
  )
}
