import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import { sendNotification } from '../../../components/Notification';


export default class Confirm extends Component {

  handleCloseModal = () => {
    this.validate(false);
  }

  handleConfirm = () => {
    this.validate(true);
  }

  validate = (confirmed) => {
    this.props.confirm(confirmed);
  }

  render() {

    const actions = [
      <FlatButton
        label="Annuler"
        secondary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        label="Confirmer"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ];

    const { title, open } = this.props;

    return (
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={open}
        > Confirmer la suppression ?
        </Dialog>
    )
  }
}
