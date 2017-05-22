import React, { Component } from 'react';

import Admin from './Admin';
import Apprentice from './Apprentice';
import Tutor from './Tutor';


import Auth from '../../components/Auth';
import * as Roles from '../../constants';


class Profil extends Component {
  render() {
    return (
      <div>
        <Auth roles={[Roles.SUPER_ADMIN]}>
            <Admin />
        </Auth>
        <Auth roles={[Roles.APPRENTICE]}>
            <Apprentice />
        </Auth>
        <Auth roles={[Roles.TUTOR]}>
            <Tutor />
        </Auth>
      </div>
    )
  }
}

export default Profil;
