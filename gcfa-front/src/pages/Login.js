import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

const BACKGROUND_STYLE = {
  height: '100%',
  background: 'url(background.jpg)',
  backgroundRepeat: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const LOGIN_STYLE = {
  position: 'relative',
  maxWidth: 400,
  margin: '0 auto',
  top: '10%',
}

class Login extends Component {
  render() {
    const error = false;
    return (
  		<div style={BACKGROUND_STYLE}>
        <Card style={LOGIN_STYLE} zDepth={3}>
          <CardText>
            <h1 className="primary-color">GCFA</h1>
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
          <CardActions style={{ textAlign: 'right' }}>
            <FlatButton href="http://moncompte.isep.fr" label="Mot de passe oublié" />
            <FlatButton
              secondary
              label="Connexion"
              labelPosition="before"
              icon={<ActionLockOpen />}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Login;
