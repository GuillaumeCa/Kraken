import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import BarCard, { DocumentCard } from '../components/BarCard';

const BUTTON_STYLE = {
  fontSize: 20,
}


class Documentation extends Component {
  render() {
  	const actions = [
  		<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} />,
	]
    return (
    	<div>
	      <div>
	        <h1 className="main-title">Documentation</h1>
	      </div>

	      <section>
		    <h2 className="sub-title">Calendriers</h2>
		    <BarCard actions={actions}>
		      <DocumentCard title="Calendrier A3 (Promo 2017)" />
		    </BarCard>
		    <BarCard actions={actions}>
		      <DocumentCard title="Calendrier A2 (Promo 2018)" />
		    </BarCard>
		    <BarCard actions={actions}>
		      <DocumentCard title="Calendrier A1 (Promo 2019)" />
		    </BarCard>
		  </section>

	      <section>
	        <h2 className="sub-title">Outils de l'apprenti</h2>
	        <BarCard actions={actions}>
	          <DocumentCard title="Présentation de GCFA" />
	        </BarCard>
	        <BarCard actions={actions}>
	          <DocumentCard title="Guide de l'alternance"/>
	        </BarCard>
	      </section>

	      <section>
	        <h2 className="sub-title">Documents d'évaluation</h2>
	        <BarCard actions={actions}>
	          <DocumentCard title="Évaluation de début d'alternance"/>
	        </BarCard>
	        <BarCard actions={actions}>
	          <DocumentCard title="Rapport d'étape"/>
	        </BarCard>
	      </section>
	    </div>
    );
  }
}

export default Documentation;
