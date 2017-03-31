import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

import Test from './test';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <Login/>
        </MuiThemeProvider>
    );
  }
}

export default App;
