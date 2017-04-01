import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

const LOGIN_STYLE = {
  maxWidth: 400,
  margin: '0 auto',
  marginTop: '10%',
}

class Login extends Component {
  render() {
    const error = false;
    return (
  		<div>
        <Card style={LOGIN_STYLE}>
          <CardText>
            <h1 className="primary-color">GCFA</h1>
            <TextField
              hintText="Login"
              fullWidth
            />
            <TextField
              type="password"
              hintText="Password"
              errorText={error && "This field is required."}
              fullWidth
            />
          </CardText>
          <CardActions>
            <FlatButton primary label="Connexion" />
            <FlatButton href="http://moncompte.isep.fr" secondary label="Mot de passe oublié" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Login;
