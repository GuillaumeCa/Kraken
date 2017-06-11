import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../components/Loader';
import BarCard, { List, UserCard } from '../components/BarCard';
import UsersList from '../components/UserList';

import * as userManagementService from '../services/userManagementService';


const BUTTON_STYLE = {
  fontSize: 15,
}

export default class Apprentices extends Component {

  state = {
    users: []
  }

  requestApprentices = (year) => {
    if(this.state.users.length == 0) {
      
      if(this.props.tutor == null) {
        return userManagementService.getAllApprentices()
          .then(userManagementService.filterApprenticesByYear).then(res => {
            this.setState({users: res.data});
            return {data: res[year]};
          });
      }

      else {
        return userManagementService.getAllApprenticesFromTutor(this.props.tutor)
          .then(userManagementService.filterApprenticesByYear).then(res => {
            this.setState({users: res.data});
            return {data: res[year]};
          });
      }
    }

    else {
      return {data: this.state.users[year]};
    }
  }


  requestA1 = () => {
    return this.requestApprentices(0);
  }

  requestA2 = () => {
    return this.requestApprentices(1);
  }

  requestA3 = () => {
    return this.requestApprentices(2);
  }

  selectApprentice = (apprentice) => {
    alert('apprentice selected !')
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

        <FlatButton primary label="Supprimer"
          onTouchTap={() => this.selectApprentice(apprentice)}
        />
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
    return (
      <div className="row">
        <div className="col-4">
          <p className="sub-title">A1</p>
            <UsersList
              requestUsers={this.requestA1}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
            />
        </div>
        <div className="col-4">
          <p className="sub-title">A2</p>
          <UsersList
            requestUsers={this.requestA2}
            renderActions={this.renderActions}
            title={this.renderTitle}
            subtitle={this.renderSubtitle}
          />
        </div>
        <div className="col-4">
          <p className="sub-title">A3</p>
          <UsersList
            requestUsers={this.requestA3}
            renderActions={this.renderActions}
            title={this.renderTitle}
            subtitle={this.renderSubtitle}
          />
        </div>
      </div>
    )
  }
}
