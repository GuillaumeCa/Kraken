import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as documentationService from '../services/documentationService';


const DRAWER_STYLE = {
  marginTop: 80,

}

class Users extends Component {

  state = {
  	currentTab: 1,

  }

  requestAllApprentice() {

  }

  requestAllTutor() {
  	
  }

  requestAllConsultant() {
  	
  }

  render() {
    return (
    	<div>
	    	<Drawer
	    	  docked={true}
	    	  open={true}
	    	>
	    	  <div style={DRAWER_STYLE}>
		    	  <MenuItem key={1} onTouchTap={this.getApprentices}>Apprentis</MenuItem>
		          <MenuItem key={2} onTouchTap={this.getTutors}>Tuteurs</MenuItem>
		          <MenuItem key={3} onTouchTap={this.getConsultants}>Consultants</MenuItem>
		     </div>
	    	</Drawer>
	    </div>
    )
  }

}

export default Users;
