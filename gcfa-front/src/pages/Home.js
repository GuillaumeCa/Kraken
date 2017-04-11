import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import BarCard, { DocumentCard } from '../components/BarCard';
import UploadModal from '../components/UploadModal';
import { sendNotification } from '../components/Notification';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

const tempData = [
  {
    id: 1,
    name: "Déclaration de compétences 1",
  },
  {
    id: 2,
    name: "Déclaration de compétences 2",
  },
  {
    id: 3,
    name: "Déclaration de compétences 3",
  },
]

class Home extends Component {
  state = {
    openModal: false,
    modalData: {},
  }

  onClickButton = (data) => {
  	this.setState({
  		openModal: true,
  		modalData: data,
  	})
  }

  handleClose = () => {
  	this.setState({
  		openModal: false,
  		modalData: {},
  	})
  }

  handleSubmit = () => {

    this.handleClose()
    // Test send notif
    sendNotification('Document envoyé avec succès');

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

    const { modalData, openModal } = this.state;

    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Suivi</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Afficher tout" backgroundColor="#fff" hoverColor="#eee" />
          </div>
        </div>
        <section>
          <h2 className="sub-title">Déposés</h2>
          {
            tempData.map(data => {
              return (
                <BarCard key={data.id} actions={
                    <FlatButton primary label="Déposer" labelStyle={BUTTON_STYLE}
                      onTouchTap={() => this.onClickButton(data)}
                    />
                  }>
                  <DocumentCard title={data.name} subtitle="sous-titre" />
                </BarCard>
              )
            })
          }
        </section>
        <section>
          <h2 className="sub-title">A venir</h2>
          {
            tempData.map(data => {
              return (
                <BarCard key={data.id} actions={
                    <FlatButton primary label="Déposer" labelStyle={BUTTON_STYLE}
                      onTouchTap={() => this.onClickButton(data)}
                    />
                  }>
                  <DocumentCard title={data.name} subtitle="sous-titre" />
                </BarCard>
              )
            })
          }
        </section>

        <UploadModal
        	title="Ajouter un document"
        	open={openModal}
        	actions={modalButtons}
        	docType={modalData.name}
        	subtitle="A rendre avant le 10/03/2016"
        />
      </div>
    );
  }
}

export default Home;
