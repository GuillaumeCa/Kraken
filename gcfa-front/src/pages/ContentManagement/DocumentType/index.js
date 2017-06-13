import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';

import * as documentTypeService from '../../../services/documentTypeService';

export default class DocumentType extends Component {
  state = {
    docTypeList: [],
    loading: false,
  }

  componentDidMount() {
    this.requestDocType();
  }

  requestDocType() {
    this.setState({ loading: true });
    documentTypeService.getDocumentTypes()
      .then(res => {
        this.setState({ docTypeList: res.data, loading: false });
      })
  }

  render() {
    const { docTypeList, loading } = this.state;

    return (
      <div>
        <div>
          <Loader error={false} loading={loading}>
            <List data={docTypeList} emptyLabel="Aucun type de document">
              {
                docTypeList.map(doc => {
                  return (
                    <BarCard key={doc.id} actions={
                      <Link to={`/infos/document-type/${doc.id}`}>
                        <FlatButton primary label="Voir" />
                      </Link>
                    } extended>
                      <UserCard
                        title={doc.name}
                        subtitle=""
                      />
                    </BarCard>
                  )
                })
              }
            </List>
          </Loader>
        </div>
      </div>
    )
  }
}
