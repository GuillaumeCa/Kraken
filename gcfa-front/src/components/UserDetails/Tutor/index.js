import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../../Loader';
import BarCard, { List, UserCard } from '../../BarCard';
import FormField, { TitleSelect } from '../../UserForm/FormField';
import TextField from 'material-ui/TextField';

import * as userManagementService from '../../../services/userManagementService';

import { sendNotification } from '../../Notification';

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
  }

  componentDidMount() {
    this.requestTutorInfos();
    this.requestApprentices();
  }

  requestTutorInfos() {
    userManagementService.getTutor(this.props.match.params.id)
      .then(res => {
        this.setState({ tutor: res.data, tutorForm: this.buildForm(res.data) });
      })
  }

  requestApprentices() {
    this.setState({ loadingApprentices: true });
    userManagementService.getAllApprenticesFromTutor(this.props.match.params.id)
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

  removeApprentice = (e, apprentice) => {

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
          <RaisedButton primary label="Retour" style={SMALL_MARGIN} />
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
                    >
                      <TitleSelect
                        default={tutor.user.sexe}
                        onChange={(e, i, v) => this.onChangeField('sexe', v)}
                      />
                    </FormField>
                    <FormField
                      title="Prénom"
                      fname="firstName"
                      defaultValue={tutor.user.firstName}
                      onChange={this.onChangeField}
                    />
                    <FormField
                      title="Nom"
                      fname="lastName"
                      defaultValue={tutor.user.lastName}
                      onChange={this.onChangeField}
                    />
                    <FormField
                      title="Mail"
                      fname="email"
                      defaultValue={tutor.user.email}
                      onChange={this.onChangeField}
                    />
                    <FormField
                      title="Emploi"
                      fname="job"
                      defaultValue={tutor.job}
                      onChange={this.onChangeField}
                    />
                  </tbody>
                </table>
                <RaisedButton primary label="Enregistrer les modifications" onTouchTap={this.onUpdate} style={SMALL_MARGIN} disabled={!update} />
              </div>
              <div className="col-6">
                <h2 className="sub-title">Apprentis</h2>
                <Loader loading={loadingApprentices} error={errorApprentices}>
                  <List data={apprenticeList} emptyLabel="Aucun apprenti assigné">
                    {
                       apprenticeList.map(data => {
                          return (
                            <BarCard key={data.id} actions={
                              <FlatButton
                                secondary
                                label="Retirer"
                                onTouchTap={(e) => this.removeApprentice(e, data)}
                              />
                            }>
                              <UserCard
                                title={data.user.firstName + ' ' + data.user.lastName}
                                subtitle={data.user.email}
                              />
                            </BarCard>
                          )
                        })
                    }
                  </List>
                </Loader>
                <RaisedButton primary label="Ajouter" />
              </div>
            </div>
          }
        </Loader>
      </div>
    )
  }
}
