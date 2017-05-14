import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

import Banner from '../components/Banner';
import Loader from '../components/Loader';


import * as authService from '../services/authService';

const BACKGROUND_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
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

function ErrorMessage(props) {
  const style = {
    color: 'red',
    textAlign: 'center',
  }
  return <div style={style}>{props.message}</div>
}

class Login extends Component {

  state = {
    username: 'eee',
    password: '1244',
    loading: false,
    error: false,
  }

  handleSubmit = (e) => {
    this.setState({ loading: true })
    e.preventDefault();
    const { username, password } = this.state;
    authService.login(username, password).then(res => {
      this.props.history.push('/');
    }).catch(err => {
      this.setState({ error: true, loading: false })
      console.log(err.message);
    })
  }

  render() {
    const {
      loading,
      error,
    } = this.state;
    return (
      <div>
        <Banner>
          <div style={BACKGROUND_STYLE}>
            <div style={LOGIN_STYLE}>
              <Card zDepth={3}>
                  <form onSubmit={this.handleSubmit}>
                    <CardText style={INPUT_LOGIN_STYLE}>
                      <Loader loading={loading}>
                        <h1 className="primary-color center" style={TITLE_LOGIN_STYLE}>GCFA</h1>
                        <TextField
                          hintText="Nom d'utilisateur"
                          onChange={(e) => this.setState({ username: e.target.value })}
                          fullWidth
                          />
                        <TextField
                          type="password"
                          hintText="Mot de passe"
                          onChange={(e) => this.setState({ password: e.target.value })}
                          fullWidth
                          />
                        {
                          error &&
                          <ErrorMessage message="Erreur de login" />
                        }
                      </Loader>

                    </CardText>
                    <CardActions style={{ textAlign: 'center' }}>
                      <FlatButton
                        type="submit"
                        secondary
                        label="Connexion"
                        labelPosition="after"
                        icon={<ActionLockOpen />}
                      />
                      <FlatButton href="http://moncompte.isep.fr" label="Mot de passe oublié" />
                    </CardActions>
                  </form>
              </Card>
            </div>
          </div>
        </Banner>
      </div>
    );

  }
}

export default Login;
