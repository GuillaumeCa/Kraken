import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import FormField, { TitleSelect } from '../../../components/UserForm/FormField';
import TextField from 'material-ui/TextField';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import * as userManagementService from '../../../services/userManagementService';
import * as authService from '../../../services/authService';

import Auth from '../../../components/Auth';
import * as Roles from '../../../constants';

import { sendNotification } from '../../../components/Notification';

const SMALL_MARGIN = {
  marginBottom: 20,
}

export default class ConsultantDetail extends Component {

  state = {
    consultant: null,
    consultantForm: {},

    update: false,
    isEnableToEdit: false,
  }

  componentDidMount() {
    this.requestConsultantInfos();

    var isEnable = authService.hasRole(Roles.SUPER_ADMIN)
    this.setState({isEnableToEdit: isEnable});
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
        this.setState({ update: false });
      })
      .catch(err => {
        sendNotification("Le profil n'a pu être mis à jour")
      })
  }

  onChangeField = (key, value) => {
    this.setState({
      update: true,
      consultantForm: {
        ...this.state.consultantForm,
        [key]: value,
      }
    });
  }

  render() {
    const {
      consultant,

      update,
    } = this.state;
    return (
      <div>
        <Link to="/users/consultants">
          <RaisedButton primary label="Consultants" style={SMALL_MARGIN} icon={<ArrowBack />} />
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
                        disabled={!this.state.isEnableToEdit}
                      />
                    </FormField>
                    <FormField
                      title="Prénom"
                      fname="firstName"
                      defaultValue={consultant.firstName}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                    <FormField
                      title="Nom"
                      fname="lastName"
                      defaultValue={consultant.lastName}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                    <FormField
                      title="Mail"
                      fname="email"
                      defaultValue={consultant.email}
                      onChange={this.onChangeField}
                      disabled={!this.state.isEnableToEdit}
                    />
                  </tbody>
                </table>
                <Auth roles={[Roles.SUPER_ADMIN]}>
                  <RaisedButton primary label="Enregistrer les modifications" onTouchTap={this.onUpdate} style={SMALL_MARGIN} disabled={!update}/>
                </Auth>
              </div>
            </div>
          }
        </Loader>
      </div>
    )
  }
}
