import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../BarCard';
import Loader from '../../Loader';

import * as userManagementService from '../../../services/userManagementService';


const BUTTON_STYLE = {
  fontSize: 15,
}


class ApprenticeDetail extends Component {

	state = {
		user: null,
	}

	componentDidMount() {
		console.log(this.state)
	}

	render() {
		return (
			<div className="row">
				<div className="col-6">
					
				</div>
				<div className="col-6">
					
				</div>
			</div>

		)
	}
}

export default ApprenticeDetail;
