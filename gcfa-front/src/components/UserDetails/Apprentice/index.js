import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import BarCard, { DocumentCard, List } from '../../BarCard';
import Loader from '../../Loader';
import { SelectForm } from '../../UserForm/FormField';
import Time, { DueTime } from '../../Time';


import * as userManagementService from '../../../services/userManagementService';
import * as userService from '../../../services/userService';
import * as documentService from '../../../services/documentService';


const TITLE_STYLE = {
  marginTop: 20,
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

    tutorList: [],
    selectTutor: null,
	}

	componentDidMount() {
		this.requestSentDocsFromApprentice(this.props.location.state.data.id);
    this.requestTutorList();
    const { data } = this.props.location.state;
    this.setState({ selectTutor: data.tutor });
	}

	requestSentDocsFromApprentice = (userId) => {
		documentService.getSentDocumentsFromApprentice(userId).then(res => {
			this.setState({ sentDocs: res.data });
		});
	}

  requestTutorList() {
    userManagementService.getAllTutor()
      .then(res => res.data.map(tutor => {
        return {
          ...tutor,
          _value: tutor.id,
          _text: `${tutor.user.firstName} ${tutor.user.lastName}`
        }
      }))
      .then(tutorList => {
        this.setState({ tutorList });
      })
  }

  changeTutor = (e, index, value) => {
    const tutor = this.state.tutorList.find(t => t.id === value);
    this.setState({ selectTutor: tutor });
  }

	render() {

		const { data } = this.props.location.state;
		const {
			loadingSent,
			errorSent,
			sentDocs,

      tutorList,
      selectTutor,
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
      <div>
        <Link to="/users/apprentices">
          <RaisedButton primary label="Apprentis" style={{marginBottom: 20}} />
        </Link>
        <div className="row">
  				<div className="col-5">
  					{
  						data &&
  						<div>
  							<h2 className="sub-title">Informations</h2>
  							<table className="detail-list" >
  								<tbody>
  									<tr>
  										<th style={LABEL_STYLE}>Prénom Nom</th>
  										<td>{data.user.firstName} {data.user.lastName}</td>
  									</tr>
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
                {
                  selectTutor &&
                  <div>
                    <SelectForm
                      title="Tuteur sélectionné"
                      selectValue={selectTutor.id}
                      handleChange={this.changeTutor}
                      itemList={tutorList}
                    />
                    <table className="detail-list">
                      <tbody>
                        <tr>
                          <th style={LABEL_STYLE}>Nom</th>
                          <td>{selectTutor.user.lastName}</td>
                        </tr>
                        <tr>
                          <th style={LABEL_STYLE}>Prénom</th>
                          <td>{selectTutor.user.firstName}</td>
                        </tr>
                        <tr>
                          <th style={LABEL_STYLE}>Mail</th>
                          <td>{selectTutor.user.email}</td>
                        </tr>
                        <tr>
                          <th style={LABEL_STYLE}>Emploi</th>
                          <td>{selectTutor.job}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to={`/users/tutors/${selectTutor.id}/detail`}>
                      <RaisedButton label="Voir" style={{ marginTop: 10 }} />
                    </Link>
                  </div>
                }
  							<br />
  							<h2 className="sub-title" style={TITLE_STYLE}>Entreprise</h2>
  							<table className="detail-list">
  								<tbody>
  									<tr>
  										<th style={LABEL_STYLE}>Entreprise</th>
  										<td></td>
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
                <RaisedButton primary label="Enregistrer les modifications" style={{ marginTop: 20 }} onTouchTap={this.updateProfile}/>
  						</div>
  					}
  				</div>

  				<div className="col-6">
  					<div>
  						<section>
  				          <h2 className="sub-title">Documents</h2>
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
      </div>
		)
	}
}

export default ApprenticeDetail;
