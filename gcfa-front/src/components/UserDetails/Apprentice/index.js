import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { DocumentCard, List } from '../../BarCard';
import Loader from '../../Loader';
import TextField from 'material-ui/TextField';
import Time, { DueTime } from '../../Time';


import * as userManagementService from '../../../services/userManagementService';
import * as userService from '../../../services/userService';
import * as documentService from '../../../services/documentService';


const TITLE_STYLE = {
    textAlign: 'center',
}

const LABEL_STYLE = {
	width:100
} 

const TD_STYLE = {
	width: 180,
}

const BUTTON_STYLE = {
  fontSize: 15,
}


class ApprenticeDetail extends Component {

	state = {
		loadingSent: false,
		errorSent: false,
		sentDocs: [],
	}

	componentDidMount() {
		this.requestSentDocsFromApprentice(this.props.location.state.data.id);
	}

	requestSentDocsFromApprentice = (userId) => {
		documentService.getSentDocumentsFromApprentice(userId).then(res => {
			this.setState({sentDocs: res.data});
		});
	}

	render() {

		const { data } = this.props.location.state;
		const {
			loadingSent,
			errorSent,
			sentDocs,
		} = this.state;

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
					{
						data &&
						<div>
							<h2 className="main-title"  style={TITLE_STYLE}>{data.user.firstName} {data.user.lastName}</h2>
							<table className="detail-list" style={{ margin: '20px auto' }}>
								<tbody>
									<tr>
										<th style={LABEL_STYLE}>Mail</th>
										<td><TextField
									      id="mail"
									      style={TD_STYLE}
									      disabled={true}
									      defaultValue={data.user.email}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Promotion</th>
										<td><TextField
									      id="promotion"
									      style={TD_STYLE}
									      type="number"
									      defaultValue={data.promotion}
									    	/>
									    </td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Début du contrat</th>
										<td><TextField
									      id="startContract"
									      type="number"
									      style={TD_STYLE}
									      defaultValue={debutContract}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Durée du contrat</th>
										<td><TextField
									      id="contractType"
									      style={TD_STYLE}
									      type="number"
									      defaultValue={contractDuration}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Document rendu</th>
										<td><TextField
									      id="dueDocNb"
									      style={TD_STYLE}
									      disabled={true}
									      defaultValue="12/18"
									    /></td>
									</tr>
								</tbody>
							</table>
							
							<h2 className="sub-title" style={TITLE_STYLE}>Tuteur</h2>
							<table className="detail-list" style={{ margin: '0 auto' }}>
								<tbody>
									<tr>
										<th style={LABEL_STYLE}>Nom</th>
										<td><TextField
									      id="tutorLastName"
									      style={TD_STYLE}
									      defaultValue={data.tutor.user.lastName}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Prénom</th>
										<td><TextField
									      id="tutorFirstName"
									      style={TD_STYLE}
									      defaultValue={data.tutor.user.firstName}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Mail</th>
										<td><TextField
									      id="tutorMail"
									      style={TD_STYLE}
									      defaultValue={data.tutor.user.email}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Emploi</th>
										<td><TextField
									      id="tutorFirstName"
									      style={TD_STYLE}
									      defaultValue={data.tutor.job}
									    /></td>
									</tr>
								</tbody>
							</table>
							<br />
							<h2 className="sub-title" style={TITLE_STYLE}>Entreprise</h2>
							<table className="detail-list" style={{ margin: '0 auto' }}>
								<tbody>
									<tr>
										<th style={LABEL_STYLE}>Entreprise</th>
										<td><TextField
									      id="companyName"
									      style={TD_STYLE}
									      defaultValue={data.companySite.company.name}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Site</th>
										<td><TextField
									      id="companySiteName"
									      style={TD_STYLE}
									      defaultValue={data.companySite.name}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Adresse</th>
										<td><TextField
									      id="companySiteAddress"
									      style={TD_STYLE}
									      defaultValue={data.companySite.address}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Code Postal</th>
										<td><TextField
									      id="companySiteCP"
									      style={TD_STYLE}
									      defaultValue={data.companySite.codePostal}
									    /></td>
									</tr>
									<tr>
										<th style={LABEL_STYLE}>Ville</th>
										<td><TextField
									      id="companSiteCity"
									      style={TD_STYLE}
									      defaultValue={data.companySite.city}
									    /></td>
									</tr>
								</tbody>
							</table>
						</div>
					}
				</div>

				<div className="col-1"></div>
				<div className="col-6">
					<div>
						<section>
				          <h2 className="main-title">Documents</h2>
				          <Loader loading={loadingSent} error={errorSent}>
				            <List data={sentDocs} emptyLabel="Aucun documents uploadé">
				              {
				                 sentDocs.map(data => {
				                    return (
				                      <BarCard key={data.id} actions={
				                        <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
				                          onTouchTap={(e) => this.editDoc(e, data)}
				                        />
				                      }>
				                        <DocumentCard title={data.type.name} subtitle={
				                          <span>rendu le <Time format="DD MMMM YYYY" date={data.creation} /></span>
				                        } />
				                      </BarCard>
				                    )
				                  })
				              }
				            </List>
				          </Loader>
				        </section>
				    </div>
				</div>
			</div>

		)
	}
}

export default ApprenticeDetail;
