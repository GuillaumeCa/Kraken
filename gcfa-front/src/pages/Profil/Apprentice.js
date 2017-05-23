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


class ApprenticeProfil extends Component {
	state = {
		profil: null,
	}

	componentDidMount() {
		userService.getUserProfile().then(res => {
			this.setState({ profil: res.data });
		})
	}

	getContractType() {

	}

  render() {
		const { profil } = this.state;
		let contractDuration = 0;
		let debutContract = 0;
		if (profil) {
			switch (profil.contractType) {
				case 'TWO_YEARS':
					contractDuration = 2;
					break;
				case 'THREE_YEARS':
					contractDuration = 3;
					break;
			}
			debutContract = profil.promotion - contractDuration;
		}
    return (
      <div>
				{
					profil &&
					<div style={CONTENT_STYLE}>
						<Avatar size={180}>{profil.user.firstName.slice(0,1)}{profil.user.lastName.slice(0,1)}</Avatar>
						<h2 className="main-title">{profil.user.firstName} {profil.user.lastName}</h2>
						<table className="detail-list" style={{ margin: '20px auto' }}>
							<tbody>
								<tr>
									<th>Mail</th>
									<td>{profil.user.email}</td>
								</tr>
								<tr>
									<th>Promotion</th>
									<td>{profil.promotion}</td>
								</tr>
								<tr>
									<th>Début du contrat</th>
									<td>{debutContract}</td>
								</tr>
								<tr>
									<th>Contrat</th>
									<td>{contractDuration} ans</td>
								</tr>
								<tr>
									<th>Document rendu</th>
									<td>12/18</td>
								</tr>
							</tbody>
						</table>
						<h2 className="sub-title">Tuteur</h2>
						<table className="detail-list" style={{ margin: '0 auto' }}>
							<tbody>
								<tr>
									<th>Prénom Nom</th>
									<td>{profil.tutor.user.firstName} {profil.tutor.user.lastName}</td>
								</tr>
								<tr>
									<th>Mail</th>
									<td>{profil.tutor.user.email}</td>
								</tr>
								<tr>
									<th>Emploi</th>
									<td>{profil.tutor.job}</td>
								</tr>
							</tbody>
						</table>
					</div>
				}
	  </div>
    );
  }
}

export default ApprenticeProfil;
