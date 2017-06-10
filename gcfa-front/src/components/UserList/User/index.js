import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../../Loader';
import BarCard, { List, UserCard } from '../../BarCard';


export default class UsersList extends Component {

  state = {
    usersList: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.requestUsers();
  }

  requestUsers() {
    this.props.requestUsers()
      .then(res => this.setState({ usersList: res.data }));
  }

  render() {

    const {
      usersList,
      loading,
      error,
    } = this.state;

    return (
      <div>
        <Loader loading={loading} error={error}>
          <List data={usersList} emptyLabel={this.props.noUserLabel}>
            {
              usersList.map(tutor => {
                return (
                  <BarCard key={tutor.id} actions={this.props.renderActions(tutor)} extended>
                    <UserCard
                      title={this.props.title(tutor)}
                      subtitle={this.props.subtitle(tutor)}
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
