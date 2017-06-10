import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../BarCard';
import Loader from '../../Loader';


import * as userManagementService from '../../../services/userManagementService';

const CONTENT_STYLE = {
	margin: '0 auto',
	marginTop: 60,
    textAlign: 'center',
    fontSize: 25,
	maxWidth: 500,
	fontWeight: 'normal',
}


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

		let contractDuration = 0;
		let debutContract = 0;
		if (data) {
			switch (data.contractType) {
				case 'TWO_YEARS':
					contractDuration = 2;
					break;
				case 'THREE_YEARS':
					contractDuration = 3;
					break;
			}
			debutContract = data.promotion - contractDuration;
		}

		return (
			<div className="row">
				<div className="col-5">
					<div>
					{
						data &&
						<div style={CONTENT_STYLE}>
							<h2 className="main-title">{data.user.firstName} {data.user.lastName}</h2>
							<table className="detail-list" style={{ margin: '20px auto' }}>
								<tbody>
									<tr>
										<th>Mail</th>
										<td>{data.user.email}</td>
									</tr>
									<tr>
										<th>Promotion</th>
										<td>{data.promotion}</td>
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
										<td>{data.tutor.user.firstName} {data.tutor.user.lastName}</td>
									</tr>
									<tr>
										<th>Mail</th>
										<td>{data.tutor.user.email}</td>
									</tr>
									<tr>
										<th>Emploi</th>
										<td>{data.tutor.job}</td>
									</tr>
								</tbody>
							</table>
							<br />
							<h2 className="sub-title">Entreprise</h2>
							<table className="detail-list" style={{ margin: '0 auto' }}>
								<tbody>
									<tr>
										<th>Entreprise</th>
										<td>{data.companySite.company.name}</td>
									</tr>
									<tr>
										<th>Adresse</th>
										<td>{data.companySite.address}</td>
									</tr>
									<tr>
										<th>Code Postal</th>
										<td>{data.companySite.codePostal}</td>
									</tr>
									<tr>
										<th>Ville</th>
										<td>{data.companySite.city}</td>
									</tr>
								</tbody>
							</table>
						</div>
					}
	  				</div>
				</div>

				<div className="col-7">
					
				</div>
			</div>

		)
	}
}

export default ApprenticeDetail;
