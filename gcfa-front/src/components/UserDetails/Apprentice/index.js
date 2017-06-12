import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import BarCard, { DocumentCard, List } from '../../BarCard';
import Loader from '../../Loader';
import FormField, { SelectForm } from '../../UserForm/FormField';
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
    data: null,

    tutorList: [],
    selectTutor: null,

    companyList: [],
    selectCompany: null,

    companySiteList: [],
    selectCompanySite: null,

    updateProfile: false,
    formData: {},
	}

	componentDidMount() {
    this.apprenticeId = this.props.location.state.data.id;
		this.requestSentDocsFromApprentice(this.apprenticeId);
    this.requestTutorList();
    this.requestCompanyList();

    const { data } = this.props.location.state;
    console.log(data);
    this.setState({ data });
    this.requestCompanySiteList(data.companySite.company.id);


    this.setState({
      formData: {
        userId: data.user.id,
        tutorId: data.tutor.id,
        contractType: data.contractType,
        companyId: data.companySite.id,
        promotion: data.promotion,
      },
      selectTutor: data.tutor,
      selectCompany: data.companySite.company,
      selectCompanySite: data.companySite,
    });
	}

  requestApprentice() {
    userManagementService.getApprentice(this.apprenticeId)
      .then(res => {
        this.setState({ data: res.data });
      })
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
    this.setState({ selectTutor, updateProfile: true });
    this.changeForm('tutorId', selectTutor.id);
  }

  changeCompany = (e, index, value) => {
    const selectCompany = this.state.companyList.find(c => c.id === value);
    this.setState({ selectCompany, updateProfile: true });
    this.requestCompanySiteList(value);
  }

  changeCompanySite = (e, index, value) => {
    const selectCompanySite = this.state.companySiteList.find(c => c.id === value);
    this.setState({ selectCompanySite, updateProfile: true });
    this.changeForm('companyId', selectCompanySite.id);
  }

  changeForm = (key, value) => {
    this.setState({
      formData: { ...this.state.formData, [key]: value },
      updateProfile: true
    });
  }

  contractToYear(contract) {
    const conv = { TWO_YEARS: 2, THREE_YEARS: 3 };
    return conv[contract];
  }

  updateProfile = () => {
    const { formData } = this.state;
    userManagementService.updateApprentice(formData)
      .then(res => {
        this.requestApprentice();
        this.setState({ updateProfile: false });
      })
  }

	render() {

		const {
			loadingSent,
			errorSent,
			sentDocs,
      data,

      tutorList,
      selectTutor,

      companyList,
      selectCompany,

      companySiteList,
      selectCompanySite,

      updateProfile,
      formData,

		} = this.state;


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
  										<td>
                        <TextField
  									      id="mail"
  									      style={TD_STYLE}
  									      disabled
  									      defaultValue={data.user.email}
  									    /></td>
  									</tr>
                    <FormField
                      title="Promotion"
                      fname="promotion"
                      type="number"
                      defaultValue={data.promotion}
                      onChange={this.changeForm}
                    />
  									<tr>
  										<th style={LABEL_STYLE}>Début du contrat</th>
  										<td>
                        <TextField
  									      id="startContract"
                          disabled
  									      style={TD_STYLE}
  									      value={formData.promotion - this.contractToYear(formData.contractType)}
  									    />
                      </td>
  									</tr>
  									<tr>
  										<th style={LABEL_STYLE}>Durée du contrat</th>
  										<td style={TD_STYLE}>
                        <SelectForm
                          selectValue={formData.contractType}
                          handleChange={(e, i, v) => this.changeForm('contractType', v)}
                          fullWidth
                          itemList={[
                            { _value: 'TWO_YEARS', _text: '2 ans' },
                            { _value: 'THREE_YEARS', _text: '3 ans' }
                          ]}
                        />
                      </td>
  									</tr>
  									<tr>
  										<th style={LABEL_STYLE}>Document rendu</th>
  										<td>
                        <TextField
  									      id="dueDocNb"
  									      style={TD_STYLE}
  									      disabled={true}
  									      defaultValue="12/18"
  									    />
                      </td>
  									</tr>
  								</tbody>
  							</table>

  							<h2 className="sub-title" style={TITLE_STYLE}>Tuteur</h2>
                {
                  selectTutor &&
                  <div>
                    <SelectForm
                      title="Tuteur sélectionné"
                      selectValue={formData.tutorId}
                      handleChange={this.changeTutor}
                      itemList={tutorList}
                      fullWidth
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
                <RaisedButton primary label="Enregistrer les modifications" style={{ marginTop: 20 }} onTouchTap={this.updateProfile} disabled={!updateProfile}/>
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
