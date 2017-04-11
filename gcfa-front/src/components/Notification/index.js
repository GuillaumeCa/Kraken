import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

import * as colors from '../../colors';

const NOTIFICATION_STYLE = {
  boxShadow: '0 0 10px #ccc',
}

const NOTIFICATION_CONTENT_STYLE = {
  fontSize: 18,
}

export default class NotificationCenter extends Component {
  state = {
    open: false,
    message: '',
  }

  componentDidMount() {
    document.addEventListener('notification', this.onReceiveNotification.bind(this));
  }

  onReceiveNotification(e) {
    console.log(e);
    this.setState({ message: e.detail.message, open: true });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    }, 3000);
  }

  render() {
    const { open, message } = this.state;
    return (
      <Snackbar
        bodyStyle={NOTIFICATION_STYLE}
        contentStyle={NOTIFICATION_CONTENT_STYLE}
        open={open}
        message={message}
      />
    )
  }
}

export function sendNotification(message) {
  const event = new CustomEvent('notification', { detail: { message } });
  document.dispatchEvent(event);
}
