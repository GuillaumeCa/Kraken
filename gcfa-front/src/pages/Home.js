import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import BarCard, { DocumentCard, UploadModal } from '../components/BarCard';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

class Home extends Component {
  constructor() {
  	super()
  	this.state = {
  		openModal: false,
  		modalTitle: "",
  	}
  }

  actions = (attributes) => {
  	return (
  		<FlatButton key={attributes.key} primary label="Déposer" labelStyle={BUTTON_STYLE} onTouchTap={() => {this.onClickButton(attributes)}} />
  	)
  }

  onClickButton = (attributes) => {
	const newState = {
		openModal: true,
		title: attributes.title,
	}

	this.setState(newState)

  }

  handleClose = () => {
  	const newState = {
  		openModal: false,
  		title: "",
  	}

  	this.setState(newState)
  }

  handleSubmit = () => {
  	// Service call
  	//handleClose();
  }

  render() {

  	const modalButtons = [
	  <FlatButton
	    label="Annuler"
	    primary={true}
	    onTouchTap={this.handleClose}
	  />,
	  <FlatButton
	    label="Déposer"
	    primary={true}
	    onTouchTap={this.handleSubmit}
	  />,
	];

    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Suivi</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Afficher tout" backgroundColor="#fff" hoverColor="#eee"  />
          </div>
        </div>
        <section>
          <h2 className="sub-title">Déposés</h2>
          <BarCard actions={this.actions({key:1, title:"Déclaration de compétences" })}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
          <BarCard actions={this.actions({key:2, title:"Déclaration de compétences" })}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
          <BarCard actions={this.actions({key:3, title:"Déclaration de compétences" })}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
        </section>
        <section>
          <h2 className="sub-title">A venir</h2>
          <BarCard actions={this.actions({key:4, title:"Déclaration de compétences" })}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
        </section>

        <UploadModal
        	title="Ajouter un document"
        	open={this.state.openModal}
        	actions={modalButtons}
        	docType={this.state.title}
        	subtitle="A rendre avant le 10/03/2016"
        />
      </div>
    );
  }
}

export default Home;
