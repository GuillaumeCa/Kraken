import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

const CONTENT_STYLE = {
	marginTop: 60,
  	textAlign: 'center',
  	fontSize: 25,
	fontWeight: 'normal',
}


class Profil extends Component {
  render() {
    return (

      <div>
	      <div>
	        <h1 className="main-title">Profil</h1>
	      </div>

	      <div style={CONTENT_STYLE}>
	      	<Avatar size={180}>G</Avatar>
	      	<p>Guillaume CARRE</p>
	      	<p>Mail: guillaume.carre@isep.fr</p>	
	      	<p>Promotion 2018</p>
	      	<p>Debut du contrat: 2016</p>
	      	<p>Contrat: 2 ans</p>
	      	<p>Document rendu: 12/18</p>
	      </div>
	  </div>
    );
  }
}

export default Profil;
