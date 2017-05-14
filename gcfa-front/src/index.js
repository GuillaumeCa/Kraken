import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';

import App from './App';
import './index.css';

import './config';

moment.locale('fr');

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
