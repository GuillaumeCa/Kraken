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
		data: null,
	}

	componentDidMount() {
		
		console.log(this.props.location.state.data)
	}

	render() {

		const { data } = this.props.location.state
		return (
			<div className="row">
				<div className="col-6">
					<p>{data.user.firstName}</p>
				</div>
				<div className="col-6">
					
				</div>
			</div>

		)
	}
}

export default ApprenticeDetail;
