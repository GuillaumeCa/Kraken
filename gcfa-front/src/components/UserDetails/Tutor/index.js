import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../../Loader';
import FormField from '../../UserForm/FormField';
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
  }

  componentDidMount() {
    this.requestTutorInfos();
  }

  requestTutorInfos() {
    userManagementService.getTutor(this.props.match.params.id)
      .then(res => {
        this.setState({ tutor: res.data, tutorForm: this.buildForm(res.data) });
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
      })
      .catch(err => {
        sendNotification("Le profil n'a pu être mis à jour")
      })
  }

  onChangeField = (key, value) => {
    if (key === 'sexe') {
      value = (value == 'Mr' ? 'Male' : 'Female');
    }
    this.setState({
      tutorForm: {
        ...this.state.tutorForm,
        [key]: value,
      }
    });
  }

  render() {
    const { tutor } = this.state;
    return (
      <div>
        <Link to="/users/tutors">
          <RaisedButton primary label="Retour" style={SMALL_MARGIN} />
        </Link>
        <Loader loading={tutor === null}>
          {
            tutor &&
            <div className="row" style={SMALL_MARGIN}>
              <h2 className="sub-title">Informations</h2>
              <table className="detail-list col-6">
                <tbody>
                  <FormField
                    title="Titre"
                    fname="sexe"
                    defaultValue={tutor.user.sexe == 'Male' ? 'M.' : 'Mme.'}
                    onChange={this.onChangeField}
                  />
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
            </div>
          }
          <RaisedButton primary label="Enregistrer les modifications" onTouchTap={this.onUpdate} style={SMALL_MARGIN} />
        </Loader>
      </div>
    )
  }
}
