import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import theme from './theme';

import Layout from './pages/Layout';
import Login from './pages/Login';



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
             <Route path="/logged" component={Layout} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
