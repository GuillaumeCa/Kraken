import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import BarCard, { DocumentCard } from '../components/BarCard';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

const BUTTON_STYLE = {
  fontSize: 20,
}

class Home extends Component {
  render() {
    const actions = [
      <FlatButton primary label="Déposer" labelStyle={BUTTON_STYLE} />,
    ]
    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Suivi</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Afficher tout" backgroundColor="#fff" hoverColor="#eee" />
          </div>
        </div>
        <section>
          <h2 className="sub-title">A venir</h2>
          <BarCard actions={actions}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
          <BarCard actions={actions}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
          <BarCard actions={actions}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
        </section>
        <section>
          <h2 className="sub-title">A venir</h2>
          <BarCard actions={actions}>
            <DocumentCard title="Déclaration de compétences" subtitle="sous-titre" />
          </BarCard>
        </section>
      </div>
    );
  }
}

export default Home;
