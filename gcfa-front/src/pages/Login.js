import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';


class Login extends Component {
  render() {
    return (
      		<div>
              <TextField hintText="Login" />
              <br />

              <TextField ref='password'
                  hintText="Password"
                  fieldName="p"
                  errorText="This field is required."
                  type="password">
              </TextField>
              <br />

              <RaisedButton label="Valider" backgroundColor="#a4c639" />

            </div>
    );
  }
}

export default Login;
