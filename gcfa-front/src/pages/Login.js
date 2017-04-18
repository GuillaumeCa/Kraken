import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

import * as authService from '../services/authService';

const BACKGROUND_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'url(background.jpg)',
  backgroundRepeat: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const LOGIN_STYLE = {
  maxWidth: 400,
  margin: 30,
}

const TITLE_LOGIN_STYLE = {
  margin: "10px",
}

const INPUT_LOGIN_STYLE = {
  padding: "16px 24px",
}

class Login extends Component {


  handleClick = () => {
    authService.login('aaa', '1234', (err) => {
      if (err) return console.log(err);
      this.props.history.push('/');
    })
  }

  render() {
    const error = false;
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={LOGIN_STYLE}>
          <Card zDepth={3}>
            <CardText style={INPUT_LOGIN_STYLE}>
              <h1 className="primary-color center" style={TITLE_LOGIN_STYLE}>GCFA</h1>
              <TextField
                hintText="Nom d'utilisateur"
                fullWidth
                />
              <TextField
                type="password"
                hintText="Mot de passe"
                errorText={error && "This field is required."}
                fullWidth
                />
            </CardText>
            <CardActions style={{ textAlign: 'center' }}>
              <FlatButton
                secondary
                label="Connexion"
                labelPosition="after"
                icon={<ActionLockOpen />}
                onTouchTap={this.handleClick}
                />
              <FlatButton href="http://moncompte.isep.fr" label="Mot de passe oublié" />
            </CardActions>
          </Card>
        </div>
      </div>
    );

  }
}

export default Login;
