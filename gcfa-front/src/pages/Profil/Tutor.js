import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

import * as userService from '../../services/userService';

const CONTENT_STYLE = {
	margin: '0 auto',
	marginTop: 60,
  textAlign: 'center',
  fontSize: 25,
	maxWidth: 500,
	fontWeight: 'normal',
}


class TutorProfil extends Component {
	state = {
		profil: null,
	}

	componentDidMount() {
		userService.getUserProfile().then(res => {
			this.setState({ profil: res.data });
		})
	}

  render() {
		const { profil } = this.state;
    return (
      <div>
				{
					profil &&
					<div style={CONTENT_STYLE}>
						<Avatar size={180}>{profil.user.firstName.slice(0,1)}{profil.user.lastName.slice(0,1)}</Avatar>
						<h2 className="main-title">{profil.user.firstName} {profil.user.lastName}</h2>
						<table className="detail-list" style={{ margin: '0 auto' }}>
							<tbody>
								<tr>
									<th>Job</th>
									<td>{profil.job}</td>
								</tr>
							</tbody>
						</table>
					</div>
				}
	  </div>
    );
  }
}

export default TutorProfil;
