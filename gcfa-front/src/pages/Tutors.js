import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../components/Loader';
import BarCard, { List, UserCard } from '../components/BarCard';

import * as userManagementService from '../services/userManagementService';

export default class Tutors extends Component {

  state = {
    tutorsList: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.requestTutors();
  }

  requestTutors() {
    userManagementService.getAllTutor()
      .then(res => {
        console.log(res.data);
        this.setState({ tutorsList: res.data });
      })
  }

  selectTutor = (tutor) => {
    alert('tutor selected !')
  }

  renderActions(tutor) {
    return (
      <FlatButton primary label="Voir"
        onTouchTap={() => this.selectTutor(tutor)}
      />
    )
  }

  render() {

    const {
      tutorsList,
      loading,
      error,
    } = this.state;

    return (
      <div>
        <Loader loading={loading} error={error}>
          <List data={tutorsList} emptyLabel="Aucun tuteur trouvé">
            {
              tutorsList.map(tutor => {
                return (
                  <BarCard key={tutor.id} actions={this.renderActions(tutor)} extended>
                    <UserCard
                      title={tutor.user.firstName +' '+tutor.user.lastName}
                      subtitle={tutor.job + ' - ' + tutor.user.email} 
                    />
                  </BarCard>
                )
              })
            }
          </List>
        </Loader>
      </div>
    )
  }
}
