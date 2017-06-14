import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import Confirm from '../../../components/Modal/Confirm';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import { sendNotification } from '../../../components/Notification';

import * as companyService from '../../../services/companyService';
import Auth from '../../../components/Auth';

import {
  SUPER_ADMIN,
  CONSULTANT,
} from '../../../constants';

export default class Company extends Component {

  state = {
    companyList: [],
    openModal: false,
    selectedCompanyId: null,

    newCompName: '',
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

  create = () => {
    companyService.createCompany(this.state.newCompName)
      .then(res => {
        this.requestCompanies();
      })
    this.setState({ showCreate: false, newCompName: '' });
  }

  render() {

    const actions = [
      <FlatButton
        primary
        label="Annuler"
        onTouchTap={() => this.setState({ showCreate: false })} />,
      <FlatButton
        primary
        label="Ajouter"
        onTouchTap={this.create}
      />
    ]

    const {
      companyList,
      openModal,

      showCreate,
      newCompName,
    } = this.state;

    return (
      <div>
        <Auth roles={[SUPER_ADMIN]}>
          <RaisedButton
            primary
            label="+ Ajouter"
            style={{marginBottom: 20}}
            onTouchTap={() => this.setState({ showCreate: true })}
          />
        </Auth>
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
                      <Auth roles={[SUPER_ADMIN]}>
                        <FlatButton secondary label="Supprimer" onTouchTap={() => this.openModal(comp.id)}/>
                      </Auth>
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

        <Dialog
          title="Ajouter une entreprise"
          actions={actions}
          modal
          open={showCreate}
        >
          <TextField
            fullWidth
            floatingLabelText="Nom de l'entreprise"
            onChange={(e) => this.setState({ newCompName: e.target.value })} />
        </Dialog>

      </div>
    )
  }
}
