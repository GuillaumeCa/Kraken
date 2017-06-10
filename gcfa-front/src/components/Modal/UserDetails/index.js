import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Dialog from 'material-ui/Dialog';
import colors from '../../../colors';

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

export default class UserDetailsModal extends Component {

  state = {
  }

  render() {
    const {
      children,
      open,
      actions,
      docType,
      subtitle,
      title
    } = this.props;

    return (
      <Dialog
        modal={false}
        open={open}
        actions={actions}
      >
        <div style={MODAL_CONTAINER_STYLE}>
          <h1 style={MODAL_TITLE_STYLE}>{title}</h1>
          <h2 style={MODAL_DOCTYPE_STYLE}>{docType}</h2>
          <p style={MODAL_SUBTITLE_STYLE}>{subtitle}</p>

          <div>

            
          </div>

        </div>
      </Dialog>

    )
  }
}
