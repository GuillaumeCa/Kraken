import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import Confirm from '../../../components/Modal/Confirm';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import { sendNotification } from '../../../components/Notification';

import * as companyService from '../../../services/companyService';

export default class Company extends Component {

  state = {
    companyList: [],
    openModal: false,
    selectedCompanyId: null,
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

  openModal = (id) => {
    this.setState({selectedCompanyId: id, openModal: true});
  }

  handleCloseModal = () => {
    this.setState({selectedCompanyId: null, openModal: false});
  }

  deleteCompany = (isConfirmed) => {
    if(isConfirmed) {
      companyService.deleteCompany(this.state.selectedCompanyId)
      .then(res => {
        sendNotification("Entreprise supprimée")
        this.requestCompanies();
      })
      .catch(err => {
        sendNotification("Erreur lors de la suppression")
      })
    }

    this.handleCloseModal();
  }

  render() {

    const { companyList, openModal } = this.state;

    return (
      <div>
        <Loader error={false} loading={false}>
          <List data={companyList} emptyLabel="Aucune entreprise">
            {
              companyList.map(comp => {
                return (
                  <BarCard key={comp.id} actions={
                    <div>
                      <Link to={`/infos/company/${comp.id}`}>
                        <FlatButton primary label="Voir" />
                      </Link>
                      <FlatButton secondary label="Supprimer" onTouchTap={() => this.openModal(comp.id)}/>
                    </div>
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

        <Confirm
          title="Suppression d'une entreprise"
          open={openModal}
          confirm={(confirm) => this.deleteCompany(confirm)}
        />

      </div>
    )
  }
}
