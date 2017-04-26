import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Moment from 'react-moment';

import BarCard, { DocumentCard, DocumentationCard } from '../components/BarCard';


import Auth from '../components/Auth';

import * as documentationService from '../services/documentationService';
import * as helperService from '../services/helperService';

const BUTTON_STYLE = {
  fontSize: 20,
}

const HEAD_STYLE = {
  display: 'flex',
  alignItems: 'center',
}


class Documentation extends Component {

  state = {
    calendars: [],
    tools: [],
    evaluation: [],
  }

  componentDidMount() {
    this.requestAllDocumentation();
  }

  async requestAllDocumentation() {
    const { calendars, tools, evaluation } = await documentationService.getAllDocumentation();
    this.setState({ calendars, tools, evaluation })
  }

  openDoc = (doc) => {
    documentationService.getDocumentation(doc.id)
      .then(res => {
        const filename = res.headers['x-filename'];
        helperService.downloadFile(res.data, filename);
      })
  }

  render() {
  	const actions = [
  		<FlatButton key={1} primary label="Voir" labelStyle={BUTTON_STYLE} />,
    ]

    const { calendars, tools, evaluation } = this.state;

    const renderDate = (date) => <span>Ajouté le <Moment format="DD/MM/YYYY" unix>{date / 1000}</Moment></span>

    return (
    	<div>
	      <div style={HEAD_STYLE}>
	        <h1 className="main-title">Documentation</h1>
          <div style={{ marginLeft: 'auto' }}>
            <Auth roles={['ROLE_APPRENTICE']}>
              <FlatButton primary label="Ajouter" backgroundColor="#fff" hoverColor="#eee" />
            </Auth>
          </div>
	      </div>

	      <section>
		    <h2 className="sub-title">Calendriers</h2>
        {
          calendars.map((doc) => {
            return (
              <BarCard key={doc.id} actions={<FlatButton primary label="Voir" labelStyle={BUTTON_STYLE} onTouchTap={() => this.openDoc(doc)} />}>
                <DocumentationCard title={doc.name} type="PDF" subtitle={renderDate(doc.creation)} />
              </BarCard>
            )
          })
        }
		    <BarCard actions={actions}>
		      <DocumentationCard title="Calendrier A3 (Promo 2017)" type="PDF" subtitle="déposé le 10/02/2016" />
		    </BarCard>
		    <BarCard actions={actions}>
		      <DocumentationCard title="Calendrier A2 (Promo 2018)" type="WORD" subtitle="déposé le 10/02/2016" />
		    </BarCard>
		    <BarCard actions={actions}>
		      <DocumentationCard title="Calendrier A1 (Promo 2019)" type="EXCEL" subtitle="déposé le 10/02/2016" />
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
