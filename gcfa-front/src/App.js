import React, { Component } from 'react';

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
        <Login/>
      </MuiThemeProvider>
    );
  }
}

export default App;
