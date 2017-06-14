import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import BarCard, { DocumentCard, List } from '../../../components/BarCard';
import Loader from '../../../components/Loader';
import FormField, { SelectForm } from '../../../components/UserForm/FormField';
import Time, { DueTime } from '../../../components/Time';
import { sendNotification } from '../../../components/Notification';
import Confirm from '../../../components/Modal/Confirm';

import * as userManagementService from '../../../services/userManagementService';
import * as userService from '../../../services/userService';
import * as documentService from '../../../services/documentService';
import * as companyService from '../../../services/companyService';
import * as authService from '../../../services/authService';


import Auth from '../../../components/Auth';
import * as Roles from '../../../constants';

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

    isEnableToEdit: false,

    selectedId: null,
    openModal: false,
    modalDeleteApprentice: false,
	}

	componentDidMount() {
    this.apprenticeId = this.props.match.params.id;
    this.requestApprentice().then(data => {
      this.requestTutorList();
      this.requestCompanyList();
      if (data.companySite) {
        this.requestCompanySiteList(data.companySite.company.id);
      }
  		this.requestSentDocsFromApprentice(data.user.id);

      this.setState({
        selectTutor: data.tutor,
        selectCompany: data.companySite ? data.companySite.company : null,
        selectCompanySite: data.companySite,
      });

    });

    var isEnable = authService.hasRole(Roles.SUPER_ADMIN)
    this.setState({isEnableToEdit: isEnable});

	}

  requestApprentice() {
    return userManagementService.getApprentice(this.apprenticeId)
      .then(res => {
        this.setState({
          data: res.data,
          formData: {
            userId: res.data.user.id,
            tutorId: res.data.tutor.id,
            contractType: res.data.contractType,
            companyId: res.data.companySite ? res.data.companySite.id : null,
            promotion: res.data.promotion,
          }
        });
        return res.data
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
    companyService.getCompanySites(id)
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
        sendNotification("Profil mis à jour")
        this.requestApprentice();
        this.setState({ updateProfile: false });
      })
  }

  openDoc = (docId) => {
    documentService.getDocument(docId);
  }

  openModal = (id) => {
    this.setState({selectedId: id, openModal: true});
  }

  handleCloseModal = () => {
    this.setState({selectedId: null, openModal: false});
  }

  deleteDocument = (confirm) => {
    if(confirm) {
      documentService.deleteDocument(this.state.selectedId)
      .then(ok => {
        sendNotification("Document supprimé")
        this.requestSentDocsFromApprentice();
      })
    }

    this.handleCloseModal()
  }

  deleteApprentice = (confirm) => {
    if(confirm) {
      userManagementService.deleteApprentice(this.apprenticeId)
      .then(ok => {
        sendNotification("Apprenti supprimé")
        this.props.history.push("/users/apprentices");
      })
    }

    this.setState({ modalDeleteApprentice: false });
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

      openModal,
      modalDeleteApprentice,
		} = this.state;


		return (
      <div>
        <Link to="/users/apprentices">

          <Auth roles={[Roles.SUPER_ADMIN, Roles.TUTOR, Roles.CONSULTANT]}>
            <RaisedButton
              primary
              label="Apprentis"
              style={{marginBottom: 20}}
              icon={<ArrowBack />}
            />
          </Auth>
        </Link>
        <Auth roles={[Roles.SUPER_ADMIN]}>
          <RaisedButton
            secondary
            label="Supprimer"
            style={{marginLeft: 20}}
            onTouchTap={() => this.setState({ modalDeleteApprentice: true })}
          />
        </Auth>
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
                      disabled={!this.state.isEnableToEdit}
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
                          disabled={!this.state.isEnableToEdit}
                          fullWidth
                          itemList={[
                            { _value: 'TWO_YEARS', _text: '2 ans' },
                            { _value: 'THREE_YEARS', _text: '3 ans' }
                          ]}
                        />
                      </td>
  									</tr>
  									<tr>
  										<th style={LABEL_STYLE}>Documents rendus</th>
  										<td>
                        <TextField
  									      id="dueDocNb"
                          type="number"
  									      style={TD_STYLE}
  									      disabled
  									      value={sentDocs.length}
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
                      disabled={!this.state.isEnableToEdit}
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
                            disabled={!this.state.isEnableToEdit}
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
                            disabled={!this.state.isEnableToEdit}
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
                <Auth roles={[Roles.SUPER_ADMIN]}>
                  <RaisedButton primary label="Enregistrer les modifications" style={{ marginTop: 20 }} onTouchTap={this.updateProfile} disabled={!updateProfile}/>
                </Auth>
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
                                  <div>
  				                        <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
  				                          onTouchTap={() => this.openDoc(data.id)}
  				                        />
                                  <Auth roles={[Roles.SUPER_ADMIN]}>
                                    <FlatButton secondary label="Supprimer" onTouchTap={() => this.openModal(data.id)}/>
                                  </Auth>
                                  </div>
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

        <Confirm
          title="Suppression d'un document"
          open={openModal}
          confirm={(confirm) => this.deleteDocument(confirm)}
        />
        <Confirm
          title="Suppression de cet apprenti"
          open={modalDeleteApprentice}
          confirm={this.deleteApprentice}
        />

      </div>
		)
	}
}

export default ApprenticeDetail;
