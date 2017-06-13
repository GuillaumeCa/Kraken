import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';


export default class DocumentType extends Component {

  render() {
    return (
      <div>
        <div>
          {/* <Loader error={false} loading={false}>
            <List data={docList} emptyLabel="Aucune entreprise">
              {
                docList.map(doc => {
                  return (
                    <BarCard key={doc.id} actions={
                      <Link to={`/infos/document-type/${comp.id}`}>
                        <FlatButton primary label="Voir" />
                      </Link>
                    } extended>
                      <UserCard
                        title={comp.name}
                        subtitle={comp.numSites + ' sites'}
                      />
                    </BarCard>
                  )
                })
              }
            </List>
          </Loader> */}
        </div>
      </div>
    )
  }
}
