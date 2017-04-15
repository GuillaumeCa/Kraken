import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Moment from 'react-moment';

import BarCard, { DocumentCard, DocumentationCard } from '../components/BarCard';

import * as documentationService from '../services/documentationService';

const BUTTON_STYLE = {
  fontSize: 20,
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

  requestAllDocumentation() {
    documentationService.getAllDocumentation()
      .then(res => {
        const { calendars, tools, evaluation } = this.state;
        res.data.forEach((doc) => {
          if (doc.type == 'CALENDAR') calendars.push(doc);
          if (doc.type == 'TOOL') tools.push(doc);
          if (doc.type == 'EVALUATION') evaluation.push(doc);
        })
        this.setState({ calendars, tools, evaluation });
      })
  }

  openDoc = (doc) => {
    documentationService.getDocumentation(doc.id)
      .then(res => {
        const filename = res.headers['x-filename'];
        const a = document.createElement('a');
        const file = new Blob([res.data], {type: 'application/octet-stream'});
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
      })
  }

  render() {
  	const actions = [
  		<FlatButton key={1} primary label="Voir" labelStyle={BUTTON_STYLE} />,
    ]

    const { calendars, tools, evaluation } = this.state;

    const renderDate = (date) => <span>Ajouté le <Moment format="DD/MM/YYYY" timestamp>{date}</Moment></span>

    return (
    	<div>
	      <div>
	        <h1 className="main-title">Documentation</h1>
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
