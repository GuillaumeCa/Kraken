import React, { Component } from 'react';

import Apprentices from '../UsersManagement/Apprentices';

import * as userService from '../../services/userService';

const CONTENT_STYLE = {
  margin: '0 auto',
  marginTop: 30,
  fontWeight: 'normal',
}


const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

class TutorHome extends Component {

	state = {
		profil: null,
	}

	componentDidMount() {
		userService.getUserProfile().then(res => {
			this.setState({ profil: res.data });
		})
	}

	render() {
		const {profil} = this.state;
		return (
			<div>
				<div style={HEAD_STYLE}>
	          		<h1 className="main-title">Mes apprentis</h1>
	          	</div>
	          	<div style={CONTENT_STYLE}>
				{
					profil &&
						<Apprentices tutorId={profil.id}/>
				}
				</div>
			</div>
		)
	}
}

export default TutorHome;
