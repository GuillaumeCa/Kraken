import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { sendNotification } from '../../components/Notification';

import * as authService from '../../services/authService';

export default class ChangePasswd extends Component {
  state = {
    newPwd: '',
    verifPwd: ''
  }

  onChange = (k, e) => {
    const value = e.target.value;
    this.setState({ [k]: value });
  }
  onValidate = () => {
    const { newPwd, verifPwd } = this.state;
    if (newPwd === verifPwd) {
      authService.modifyPassword(newPwd).then(ok => {
        sendNotification("Mot de passe mis à jour");
      }).catch(err => {
        sendNotification("Erreur")
      });
    } else {
      sendNotification("Les mots de passe ne correspondent pas")
    }
    this.setState({ newPwd: '', verifPwd: '' });
  }


  render() {
    const { newPwd, verifPwd } = this.state;
    return (
      <div>
        <h2 className="sub-title" style={{ marginTop: 20 }}>Changement de mot de passe</h2>
        <div>
          <TextField
            floatingLabelText="Nouveau mot de passe"
            type="password" value={newPwd} onChange={(e) => this.onChange('newPwd', e)} />
          <TextField
            floatingLabelText="Vérifier mot de passe"
            type="password" value={verifPwd} onChange={(e) => this.onChange('verifPwd', e)}
          />
        </div>
        <div>
          <RaisedButton primary style={{marginTop: 20}} label="Valider" onTouchTap={this.onValidate} />
        </div>
      </div>
    )
  }
}
