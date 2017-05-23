import React, { Component } from 'react';

import Apprentice from './Apprentice';
import User from './User';
import Tutor from './Tutor';


import Auth from '../../components/Auth';
import * as Roles from '../../constants';


class Profil extends Component {
  render() {
    return (
      <div>
        <Auth roles={[Roles.SUPER_ADMIN]}>
            <User />
        </Auth>
        <Auth roles={[Roles.APPRENTICE]}>
            <Apprentice />
        </Auth>
        <Auth roles={[Roles.CONSULTANT]}>
            <User />
        </Auth>
        <Auth roles={[Roles.TUTOR]}>
            <Tutor />
        </Auth>
      </div>
    )
  }
}

export default Profil;
