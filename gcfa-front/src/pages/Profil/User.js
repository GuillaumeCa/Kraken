import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

import ChangePasswd from './ChangePasswd';
import * as userService from '../../services/userService';

const CONTENT_STYLE = {
	margin: '0 auto',
	marginTop: 60,
  textAlign: 'center',
  fontSize: 25,
	maxWidth: 500,
	fontWeight: 'normal',
}


class UserProfil extends Component {
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
						<Avatar size={180}>{profil.firstName.slice(0,1)}{profil.lastName.slice(0,1)}</Avatar>
						<h2 className="main-title">{profil.firstName} {profil.lastName}</h2>
						<table className="detail-list" style={{ margin: '0 auto' }}>
							<tbody>
								<tr>
									<th>Email</th>
									<td>{profil.email}</td>
								</tr>
								{
									profil.role &&
									<tr>
										<th>Role</th>
										<td>
											{
												profil.role.name == "ROLE_SUPER_ADMIN" &&
												<p>Admin</p>
											}
											{
													profil.role.name == "ROLE_CONSULTANT" &&
													<p>Consultant</p>
											}
										</td>
									</tr>
								}
							</tbody>
						</table>
						<ChangePasswd />
					</div>
				}
	  </div>
    );
  }
}

export default UserProfil;
