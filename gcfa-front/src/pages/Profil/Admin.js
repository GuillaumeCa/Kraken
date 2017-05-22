import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

import * as userService from '../../services/userService';


class AdminProfil extends Component {

	componentDidMount() {
		userService.getProfile().then(res => {
			this.setState({ profil: res.data });
		})
	}

	render() {
		return (
			<div></div>
		)
	}
}

export default AdminProfil;
