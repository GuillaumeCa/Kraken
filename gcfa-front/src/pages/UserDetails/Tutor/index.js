import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import FormField, { TitleSelect, SelectForm } from '../../../components/UserForm/FormField';

import * as userManagementService from '../../../services/userManagementService';
import * as authService from '../../../services/authService';

import Auth from '../../../components/Auth';
import * as Roles from '../../../constants';

import { sendNotification } from '../../../components/Notification';

const SMALL_MARGIN = {
  marginBottom: 20,
}

export default class TutorDetail extends Component {

  state = {
    tutor: null,
    tutorForm: {},
    update: false,

    apprenticeList: [],
    errorApprentices: false,
    loadingApprentices: false,

    isEnableToEdit: false,
  }

  componentDidMount() {
    this.tutorId = this.props.match.params.id;
    this.requestTutorInfos();
    this.requestApprentices();

    var isEnable = authService.hasRole(Roles.SUPER_ADMIN)
    this.setState({isEnableToEdit: isEnable});
  }

  requestTutorInfos() {
    userManagementService.getTutor(this.tutorId)
      .then(res => {
        this.setState({ tutor: res.data, tutorForm: this.buildForm(res.data) });
      })
  }

  requestApprentices() {
    this.setState({ loadingApprentices: true });
    userManagementService.getAllApprenticesFromTutor(this.tutorId)
      .then(res => {
        this.setState({ apprenticeList: res.data, loadingApprentices: false });
      })
  }


  buildForm(tutor) {
    return {
      sexe: tutor.user.sexe,
      firstName: tutor.user.firstName,
      lastName: tutor.user.lastName,
      email: tutor.user.email,
      job: tutor.job
    }
  }

  onUpdate = () => {
    const { tutor, tutorForm } = this.state;
    userManagementService.updateTutor(tutor.user.id, tutorForm)
      .then(res => {
        sendNotification("Profil du tuteur mis à jour");
        this.requestTutorInfos();
        this.setState({ update: false });
      })
      .catch(err => {
        sendNotification("Le profil n'a pu être mis à jour")
      })
  }

  onChangeField = (key, value) => {
    this.setState({
      update: true,
      tutorForm: {
        ...this.state.tutorForm,
        [key]: value,
      }
    });
  }

  render() {
    const {
      tutor,

      apprenticeList,
      errorApprentices,
      loadingApprentices,

      update,

    } = this.state;
    return (
      <div>
        <Link to="/users/tutors">
          <RaisedButton primary label="Tuteurs" style={SMALL_MARGIN} icon={<ArrowBack />} />
        </Link>
        <Loader loading={tutor === null}>
          {
            tutor &&
            <div className="row" >
              <div className="col-6">
                <h2 className="sub-title">Informations</h2>
                <table className="detail-list" style={SMALL_MARGIN}>
                  <tbody>
                    <FormField
                      title="Titre"
                      disabled={!this.state.isEnableToEdit}
                    >
                      <TitleSelect
                        default={tutor.user.sexe}
                        onChange={(e, i, v) => this.onChangeField('sexe', v)}
                        disabled={!this.state.isEnableToEdit}
                      />
                    </FormField>
                    <FormField
                      title="Prénom"
                      fname="firstName"
                      defaultValue={tutor.user.firstName}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                    <FormField
                      title="Nom"
                      fname="lastName"
                      defaultValue={tutor.user.lastName}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                    <FormField
                      title="Mail"
                      fname="email"
                      defaultValue={tutor.user.email}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                    <FormField
                      title="Emploi"
                      fname="job"
                      defaultValue={tutor.job}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                  </tbody>
                </table>
                <Auth roles={[Roles.SUPER_ADMIN]}>
                  <RaisedButton primary label="Enregistrer les modifications" onTouchTap={this.onUpdate} style={SMALL_MARGIN} disabled={!update} />
                </Auth>
              </div>
              <div className="col-6">
                <h2 className="sub-title">Apprentis</h2>
                <Loader loading={loadingApprentices} error={errorApprentices}>
                  <List data={apprenticeList} emptyLabel="Aucun apprenti assigné">
                    {
                       apprenticeList.map(data => {
                          return (
                            <BarCard key={data.id} actions={
                              <Link to={`/users/apprentices/${data.id}/detail`}>
                                <FlatButton
                                  primary
                                  label="Voir"
                                />
                              </Link>
                            }>
                              <UserCard
                                title={data.user.firstName + ' ' + data.user.lastName}
                                subtitle={`Promo ${data.promotion} - Contrat ${data.contractType === 'TWO_YEARS' ? '2 ans' : '3 ans'}`}
                              />
                            </BarCard>
                          )
                        })
                    }
                  </List>
                </Loader>
              </div>
            </div>
          }
        </Loader>
      </div>
    )
  }
}
