import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import UploadModal from '../../components/Modal/Upload';
import FormModal from '../../components/UserForm';

import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Download from 'material-ui/svg-icons/file/cloud-download';

import Company from './Company';
import DocumentType from './DocumentType';

import * as userManagementService from '../../services/userManagementService';

const CONTENT_STYLE = {
  margin: '0 auto',
  marginTop: 30,
  fontWeight: 'normal',
}

const DRAWER_STYLE = {
  marginTop: 80,
}

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

class Users extends Component {

  state = {
  	currentTab: 0,
    allTabs: ["Entreprise", "Types de document"],
    error: false,
    showBar: false,
  }

  componentWillReceiveProps() {
    switch (window.location.pathname.split('/')[2]) {
      case 'company':
        this.setState({ currentTab: 0, showBar: false });
        return
      case 'document-type':
        this.setState({ currentTab: 1, showBar: false });
        return
    }
  }

  chooseTab = (tab) => {
    const tabs = { company: 0, documentType: 1 };
    this.setState({ currentTab: tabs[tab], showBar: false });
  }

  toggleBar = () => {
    this.setState({ showBar: !this.state.showBar });
  }

  render() {

    const {
      currentTab,
      allTabs,
      error,
      showBar,
    } = this.state;

    return (
    	<div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">{allTabs[currentTab]}</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Menu" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleBar} style={{ marginRight: 10 }} />
          </div>
        </div>

	    	<Drawer
	    	  docked
	    	  open={showBar}
          width={200}
	    	>
	    	  <div style={DRAWER_STYLE}>
		    	  <Link to="/infos/company">
              <MenuItem key={1} onTouchTap={() => this.chooseTab('company')}>Entreprises</MenuItem>
            </Link>
            <Link to="/infos/document-type">
              <MenuItem key={2} onTouchTap={() => this.chooseTab('documentType')}>Types de document</MenuItem>
            </Link>
		     </div>
	    	</Drawer>

        <div style={CONTENT_STYLE}>
          <Switch>
            <Redirect exact from="/infos" to="/infos/company" />
            <Route path="/infos/company" component={Company} />
            <Route path="/infos/document-type" component={DocumentType} />
            <Redirect to="/error" />
          </Switch>
        </div>

	    </div>
    )
  }

}

export default Users;
