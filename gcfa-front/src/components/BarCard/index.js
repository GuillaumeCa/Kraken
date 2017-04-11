import React, { Component } from 'react';
import './BarCard.css';

import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';


import colors from '../../colors';

const BAR_STYLE = {
  display: 'flex',
  borderRadius: 5,
  background: colors.GREY_LIGHT,
  maxWidth: 600,
  marginBottom: 10,
}
const ACTION_STYLE = {
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
  marginRight: 10,
}

export default function BarCard(props) {
  return (
    <div style={BAR_STYLE}>
      {props.children}
      <div style={ACTION_STYLE}>
        {props.actions}
      </div>
    </div>
  )
}

const DOCUMENT_STYLE = {
  padding: 13,
}
const DOCUMENT_TITLE_STYLE = {
  fontSize: 25,
  fontWeight: 'normal',
  color: colors.GREY_DARK,
  margin: 0,
  marginBottom: 5,
}
const DOCUMENT_SUBTITLE_STYLE = {
  margin: 0,
  color: colors.GREY_DARK,
  fontStyle: 'italic',
}

export function DocumentCard(props) {
  return (
    <div style={DOCUMENT_STYLE}>
      <h1 style={DOCUMENT_TITLE_STYLE}>{props.title}</h1>
      <p style={DOCUMENT_SUBTITLE_STYLE}>{props.subtitle}</p>
    </div>
  )
}

const MODAL_TITLE_STYLE = {
  fontSize: 40,
  fontWeight: 'normal',
  color: colors.PRIMARY,
}

const MODAL_CONTAINER_STYLE = {
  paddingLeft: 20,
  paddingRight: 20,
}

const MODAL_DOCTYPE_STYLE = {
  fontSize: 30,
  fontWeight: 'normal',
  color: colors.SECONDARY,
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
const styles = {
  
};
export function UploadModal(props) {
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
