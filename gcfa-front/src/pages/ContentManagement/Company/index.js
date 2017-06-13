import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';


import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';

import * as companyService from '../../../services/companyService';

export default class Company extends Component {

  state = {
    companyList: []
  }

  componentDidMount() {
    this.requestCompanies();
  }

  requestCompanies() {
    companyService.getAllCompany()
      .then(res => {
        this.setState({ companyList: res.data });
      })
  }

  render() {
    const { companyList } = this.state;

    return (
      <div>
        <Loader error={false} loading={false}>
          <List data={companyList} emptyLabel="Aucune entreprise">
            {
              companyList.map(comp => {
                return (
                  <BarCard key={comp.id} actions={
                    <Link to={`/infos/company/${comp.id}`}>
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
        </Loader>
      </div>
    )
  }
}
