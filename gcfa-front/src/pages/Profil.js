import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';

import * as userService from '../services/userService';

const CONTENT_STYLE = {
	marginTop: 60,
  	textAlign: 'center',
  	fontSize: 25,
	fontWeight: 'normal',
}


class Profil extends Component {
	state = {
		profil: null,
	}

	componentDidMount() {
		userService.getApprenticeProfile().then(res => {
			this.setState({ profil: res.data });
		})
	}

	getContractType() {

	}

  render() {
		const { profil } = this.state;
		let contractDuration = 0;
		let debutContract = 0;
		if (profil) {
			switch (profil.contractType) {
				case 'TWO_YEARS':
					contractDuration = 2;
					break;
				case 'THREE_YEARS':
					contractDuration = 3;
					break;
			}
			debutContract = profil.promotion - contractDuration;
		}
    return (
      <div>
	      <div>
	        <h1 className="main-title">Profil</h1>
	      </div>
				{
					profil &&
					<div style={CONTENT_STYLE}>
						<Avatar size={180}>{profil.user.firstName.slice(0,1)}</Avatar>
						<p>{`${profil.user.firstName} ${profil.user.lastName}`}</p>
						<p>Mail: {profil.user.email}</p>
						<p>Promotion {profil.promotion}</p>
						<p>Debut du contrat: {debutContract}</p>
						<p>Contrat: {contractDuration} ans</p>
						<p>Document rendu: 12/18</p>
					</div>
				}
	  </div>
    );
  }
}

export default Profil;
