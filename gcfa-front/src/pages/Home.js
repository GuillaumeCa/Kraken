import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}

class Home extends Component {
  render() {
    return (
      <div>
        <div style={HEAD_STYLE}>
          <h1 className="main-title">Accueil</h1>
          <div style={{ marginLeft: 'auto' }}>
            <FlatButton primary label="Afficher tout" backgroundColor="#fff" hoverColor="#eee" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
