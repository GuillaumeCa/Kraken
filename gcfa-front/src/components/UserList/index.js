import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../Loader';
import BarCard, { List, UserCard } from '../BarCard';


export default class UsersList extends Component {

  render() {

    const { usersList, noUserLabel } = this.props;
    return (
      <div>
        <List data={usersList} emptyLabel={noUserLabel}>
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
      </div>
    )
  }
}
