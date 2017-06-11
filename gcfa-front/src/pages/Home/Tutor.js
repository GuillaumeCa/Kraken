import React, { Component } from 'react';

import ApprenticeList from '../Apprentices';

import * as userService from '../../services/userService';

class TutorHome extends Component {

	state = {
		profil: null,
	}

	componentDidMount() {
		userService.getUserProfile().then(res => {
			console.log(res);
			this.setState({ profil: res.data });
		})
	}

	render() {
		const {profil} = this.state;
		return (
			<div>
			{
				profil &&
				<ApprenticeList tutor={profil.id}
				/>
			}
			</div>
		)
	}
}

export default TutorHome;
