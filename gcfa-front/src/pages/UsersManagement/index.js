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

import Apprentices from './Apprentices';
import Tutors from './Tutors';
import Consultants from './Consultants';

import {
  SUPER_ADMIN,
  CONSULTANT
} from '../../constants';
import Auth, { PrivateRoute } from '../../components/Auth';

import ApprenticeDetail from '../UserDetails/Apprentice';
import TutorDetail from '../UserDetails/Tutor';
import ConsultantDetail from '../UserDetails/Consultant';

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
    allTabs: ["Apprentis", "Tuteurs", "Consultants"],
    error: false,
    showBar: false,
  }

  componentWillReceiveProps() {
    switch (window.location.pathname.split('/')[2]) {
      case 'apprentices':
        this.setState({ currentTab: 0, showBar: false });
        return
      case 'tutors':
        this.setState({ currentTab: 1, showBar: false });
        return
      case 'consultants':
        this.setState({ currentTab: 2, showBar: false });
        return
    }

    
  }

  chooseUser = (tab) => {
    const users = { apprentice: 0, tutor: 1, consultant: 2 };
    this.setState({ currentTab: users[tab], showBar: false });
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
          <Auth roles={[SUPER_ADMIN, CONSULTANT]}>
            <div style={{ marginLeft: 'auto' }}>
              <FlatButton primary label="Autres utilisateurs" backgroundColor="#fff" hoverColor="#eee" onTouchTap={this.toggleBar} style={{ marginRight: 10 }} />
            </div>
          </Auth>
        </div>

	    	<Drawer
	    	  docked
	    	  open={showBar}
          width={200}
	    	>
	    	  <div style={DRAWER_STYLE}>
		    	  <Link to="/users/apprentices">
              <MenuItem key={1} onTouchTap={() => this.chooseUser('apprentice')}>Apprentis</MenuItem>
            </Link>
            <Link to="/users/tutors">
              <MenuItem key={2} onTouchTap={() => this.chooseUser('tutor')}>Tuteurs</MenuItem>
            </Link>
            <Link to="/users/consultants">
              <MenuItem key={3} onTouchTap={() => this.chooseUser('consultant')}>Consultants</MenuItem>
            </Link>
		     </div>
	    	</Drawer>

        <div style={CONTENT_STYLE}>
          <Switch>
            <Redirect exact from="/users" to="/users/apprentices" />
            <Redirect exact from="/" to="/users/apprentices" />
            <Route exact path="/users/apprentices" component={Apprentices} />
            <PrivateRoute exact path="/users/tutors" component={Tutors} roles={[SUPER_ADMIN]} />
            <PrivateRoute exact path="/users/consultants" component={Consultants} roles={[SUPER_ADMIN]} />
            <Route path="/users/apprentices/:id/detail" component={ApprenticeDetail} />
            <PrivateRoute path="/users/tutors/:id/detail" component={TutorDetail} roles={[SUPER_ADMIN]} />
            <PrivateRoute path="/users/consultants/:id/detail" component={ConsultantDetail} roles={[SUPER_ADMIN]} />
            <Redirect to="/error" />
          </Switch>
        </div>

	    </div>
    )
  }

}

export default Users;
