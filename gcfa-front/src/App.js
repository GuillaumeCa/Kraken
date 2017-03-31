import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './pages/Login';

import theme from './theme';

const muiTheme = getMuiTheme(theme);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route render={props => (
                <Redirect to="/login" />
              )} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
