import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

const AVATAR_STYLE = {
	marginTop: 30,
  	textAlign: 'center'
}

class Profil extends Component {
  render() {
    return (

      <div>
	      <div>
	        <h1 className="main-title">Profil</h1>
	      </div>

	      <div style={AVATAR_STYLE}>
	      	<Avatar size={180} style={AVATAR_STYLE}>G</Avatar>
	      </div>
	  </div>
    );
  }
}

export default Profil;
