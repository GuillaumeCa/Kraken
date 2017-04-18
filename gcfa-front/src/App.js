import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import theme from './theme';
const muiTheme = getMuiTheme(theme);

import Layout from './pages/Layout';
import Login from './pages/Login';

import * as authService from './services/authService';

function Private(props) {
  return <Route path="*" render={props => {
    if (!authService.isLoggedIn())
      return <Redirect to="/login" />;
    return <Layout {...props} />
  }}
/>
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Private />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
