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
import * as companyService from '../../../services/companyService';


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

    companyList: [],
    selectCompany: null,

    companySiteList: [],
    selectCompanySite: null,
	}

	componentDidMount() {
		this.requestSentDocsFromApprentice(this.props.location.state.data.id);
    this.requestTutorList();
    this.requestCompanyList();

    const { data } = this.props.location.state;
    this.requestCompanySiteList(data.companySite.company.id);
    console.log(data);
    this.setState({
      selectTutor: data.tutor,
      selectCompany: data.companySite.company,
      selectCompanySite: data.companySite,
    });
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

  requestCompanyList() {
    companyService.getAllCompany()
      .then(res => res.data.map(co => {
        return {
          ...co,
          _value: co.id,
          _text: co.name
        }
      }))
      .then(companyList => {
        this.setState({ companyList });
      })
  }
  requestCompanySiteList(id) {
    companyService.getCompanySite(id)
      .then(res => res.data.map(co => {
        return {
          ...co,
          _value: co.id,
          _text: co.name
        }
      }))
      .then(companySiteList => {
        this.setState({ companySiteList });
      })
  }

  changeTutor = (e, index, value) => {
    const selectTutor = this.state.tutorList.find(t => t.id === value);
    this.setState({ selectTutor });
  }

  changeCompany = (e, index, value) => {
    const selectCompany = this.state.companyList.find(c => c.id === value);
    this.setState({ selectCompany });
    this.requestCompanySiteList(value);
  }

  changeCompanySite = (e, index, value) => {
    const selectCompanySite = this.state.companySiteList.find(c => c.id === value);
    this.setState({ selectCompanySite });
  }

	render() {

		const { data } = this.props.location.state;
		const {
			loadingSent,
			errorSent,
			sentDocs,

      tutorList,
      selectTutor,

      companyList,
      selectCompany,

      companySiteList,
      selectCompanySite,

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
                {
                  selectCompany &&
                  <table className="detail-list">
                    <tbody>
                      <tr>
                        <th>Entreprise</th>
                        <td>
                          <SelectForm
                            selectValue={selectCompany.id}
                            handleChange={this.changeCompany}
                            itemList={companyList}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={LABEL_STYLE}>Site</th>
                        <td>
                          <SelectForm
                            selectValue={selectCompanySite.id}
                            handleChange={this.changeCompanySite}
                            itemList={companySiteList}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={LABEL_STYLE}>Adresse</th>
                        <td>{selectCompanySite.address}</td>
                      </tr>
                      <tr>
                        <th style={LABEL_STYLE}>Code Postal</th>
                        <td>{selectCompanySite.codePostal}</td>
                      </tr>
                      <tr>
                        <th style={LABEL_STYLE}>Ville</th>
                        <td>{selectCompanySite.city}</td>
                      </tr>
                    </tbody>
                    </table>
                }
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
