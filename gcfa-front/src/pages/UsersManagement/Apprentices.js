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

export default class Apprentices extends Component {

  state = {
    users: [[], [], []],
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.requestApprentices();
  }

  requestApprentices() {
    this.setState({ loading: true });
    userManagementService.getAllApprentices()
      .then(userManagementService.filterApprenticesByYear)
      .then(users => {
        this.setState({users: users, loading: false});
      });
  }

  renderActions = (apprentice) => {
    return (
      <div>
        <Link to={{
          pathname: '/users/apprentices/detail',
          state: {data: apprentice}

        }}>
          <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}/>
        </Link>

        <FlatButton primary label="Supprimer"/>
      </div>
    )
  }

  renderTitle = (apprentice) => {
    return `${apprentice.user.firstName} ${apprentice.user.lastName}`;
  }

  renderSubtitle = () => {
    return "";
  }

  render() {
    const { loading, users, error } = this.state;
    return (
      <Loader loading={loading} error={error} >
        <div className="row">
          <div className="col-4">
            <p className="sub-title">A1</p>
              <UsersList
                usersList={users[0]}
                renderActions={this.renderActions}
                title={this.renderTitle}
                subtitle={this.renderSubtitle}
                noUserLabel="Pas d'apprenti en A1"
              />
          </div>
          <div className="col-4">
            <p className="sub-title">A2</p>
            <UsersList
              usersList={users[1]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A2"
            />
          </div>
          <div className="col-4">
            <p className="sub-title">A3</p>
            <UsersList
              usersList={users[2]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A3"
            />
          </div>
        </div>
      </Loader>
    )
  }
}
