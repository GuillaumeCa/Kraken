import React, { Component } from 'react';


import Users from '../UsersManagement';

const CONTENT_STYLE = {
	margin: '0 auto',
	marginTop: 60,
  textAlign: 'center',
  fontSize: 25,
	maxWidth: 500,
	fontWeight: 'normal',
}

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}
class Error extends Component {

	render() {
		return (
      <div>
        <div className="row" style={HEAD_STYLE}>
          <h1 className="main-title">Erreur 404</h1>
        </div>
        <div style={CONTENT_STYLE}>
  				Le lien que vous avez suivi peut être incorrect ou la page peut avoir été supprimée
  			</div>
      </div>
		)
	}
}

export default Error;
