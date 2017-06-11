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

export default class ConsultantDetail extends Component {

  state = {
    consultant: null,
    consultantForm: {},
  }

  componentDidMount() {
    this.requestConsultantInfos();
  }

  requestConsultantInfos() {
    userManagementService.getConsultant(this.props.match.params.id)
      .then(res => {
        this.setState({ consultant: res.data, consultantForm: this.buildForm(res.data) });
      })
  }

  buildForm(consultant) {
    return {
      sexe: consultant.sexe,
      firstName: consultant.firstName,
      lastName: consultant.lastName,
      email: consultant.email,
    }
  }

  onUpdate = () => {
    const { consultant, consultantForm } = this.state;
    userManagementService.updateConsultant(consultant.id, consultantForm)
      .then(res => {
        sendNotification("Profil du consultant mis à jour");
        this.requestConsultantInfos();
      })
      .catch(err => {
        sendNotification("Le profil n'a pu être mis à jour")
      })
  }

  onChangeField = (key, value) => {
    this.setState({
      consultantForm: {
        ...this.state.consultantForm,
        [key]: value,
      }
    });
  }

  render() {
    const {
      consultant,
    } = this.state;
    return (
      <div>
        <Link to="/users/consultants">
          <RaisedButton primary label="Retour" style={SMALL_MARGIN} />
        </Link>
        <Loader loading={consultant === null}>
          {
            consultant &&
            <div className="row" >
              <div className="col-6">
                <h2 className="sub-title">Informations</h2>
                <table className="detail-list" style={SMALL_MARGIN}>
                  <tbody>
                    <FormField
                      title="Titre"
                    >
                      <TitleSelect
                        default={consultant.sexe}
                        onChange={(e, i, v) => this.onChangeField('sexe', v)}
                      />
                    </FormField>
                    <FormField
                      title="Prénom"
                      fname="firstName"
                      defaultValue={consultant.firstName}
                      onChange={this.onChangeField}
                    />
                    <FormField
                      title="Nom"
                      fname="lastName"
                      defaultValue={consultant.lastName}
                      onChange={this.onChangeField}
                    />
                    <FormField
                      title="Mail"
                      fname="email"
                      defaultValue={consultant.email}
                      onChange={this.onChangeField}
                    />
                  </tbody>
                </table>
                <RaisedButton primary label="Enregistrer les modifications" onTouchTap={this.onUpdate} style={SMALL_MARGIN} />
              </div>
            </div>
          }
        </Loader>
      </div>
    )
  }
}
