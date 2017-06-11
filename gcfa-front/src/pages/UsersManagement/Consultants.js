import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';

import * as userManagementService from '../../services/userManagementService';


const BUTTON_STYLE = {
  fontSize: 15,
}

export default class Consultants extends Component {

  state = {
    consultants: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.requestConsultants();
  }

  requestConsultants() {
    this.setState({ loading: true });
    userManagementService.getAllConsultant()
      .then(res => {
        this.setState({ consultants: res.data, loading: false });
      })
  }

  renderActions = (consultant) => {
    return (
      <div>
        <Link to={`/users/consultants/${consultant.id}/detail`}>
          <FlatButton primary label="Voir"/>
        </Link>
        <FlatButton secondary label="Supprimer"/>
      </div>
    )
  }

  renderTitle = (consultant) => {
    return `${consultant.firstName} ${consultant.lastName}`;
  }

  renderSubtitle = (consultant) => {
    return `${consultant.email}`;
  }

  render() {
    const {error, loading, consultants} = this.state;
    return (
      <div>
        <Loader loading={loading} error={error}>
          <UsersList
            usersList={consultants}
            renderActions={this.renderActions}
            title={this.renderTitle}
            subtitle={this.renderSubtitle}
          />
        </Loader>
      </div>
    )
  }
}
