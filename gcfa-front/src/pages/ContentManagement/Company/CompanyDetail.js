import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import Confirm from '../../../components/Modal/Confirm';

import Loader from '../../../components/Loader';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import { sendNotification } from '../../../components/Notification';
import Auth from '../../../components/Auth';

import {
  SUPER_ADMIN,
} from '../../../constants';

import CompanySiteForm from './companySiteForm';

import * as companyService from '../../../services/companyService';
import * as authService from '../../../services/authService';

export default class CompanyDetail extends Component {

  state = {
    companyName: '',
    companySiteList: [],
    updateCompInfos: false,

    showModal: false,
    formData: {},
    modify: false,

    openConfirm: false,
    selectedCompanySite: null,

    isEnableToEdit: false,
  }

  componentDidMount() {
    this.companyId = this.props.match.params.id;
    this.requestCompany();
    this.requestCompanySiteList();

    var isEnable = authService.hasRole(SUPER_ADMIN)
    this.setState({isEnableToEdit: isEnable});
  }

  requestCompany() {
    companyService.getCompany(this.companyId)
      .then(res => {
        this.setState({ companyName: res.data.name });
      })
  }

  requestCompanySiteList() {
    companyService.getCompanySites(this.companyId)
      .then(res => {
        this.setState({ companySiteList: res.data });
      })
  }

  updateCompInfos = () => {
    companyService.updateCompany(this.companyId, this.state.companyName)
      .then(ok => {
        this.requestCompany();
        this.setState({ updateCompInfos: false });
      })
  }

  create = () => {
    const { formData } = this.state;
    companyService.createCompanySite(this.companyId, formData)
      .then(ok => {
        this.requestCompanySiteList();
        this.setState({ showModal: false, formData: {} });
      })
  }

  modify = () => {
    const  { formData } = this.state;
    companyService.updateCompanySite(formData.id, formData)
      .then(ok => {
        this.requestCompanySiteList();
        this.setState({ showModal: false });
      })
    this.setState({ formData: null, modify: false });
  }

  onFormChange = (formData) => {
    this.setState({ formData });
  }

  delete = (isConfirmed) => {
    if(isConfirmed) {
      companyService.deleteCompanySite(this.state.selectedCompanySite)
      .then(res => {
        sendNotification("Site d'entreprise supprimé")
        this.requestCompanySiteList();
      })
      .catch(err => {
        sendNotification("Erreur lors de la suppression")
      })
    }
    this.setState({ openConfirm: false, selectedCompanySite: null });
  }

  openModify = (doc) => {
    this.setState({
      formData: doc,
      showModal: true,
      modify: true
    });
  }

  confirmDelete = (siteId) => {
    this.setState({ selectedCompanySite: siteId, openConfirm: true });
  }

  render() {
    const {
      companyName,
      companySiteList,
      updateCompInfos,

      showModal,
      formData,
      modify,

      openConfirm,
      selectedCompanySite,

      isEnableToEdit,
    } = this.state;

    const actions = [
      <FlatButton
        primary
        label="Annuler"
        onTouchTap={() => this.setState({ showModal: false })} />,
      <FlatButton
        primary
        label={modify ? "Modifier" : "Créer"}
        onTouchTap={modify ? this.modify : this.create}
      />
    ]

    return (
      <div>
        <Link to="/infos/company">
          <RaisedButton
            primary
            label="Entreprises"
            style={{marginBottom: 20}}
            icon={<ArrowBack />}
          />
        </Link>
        <div style={{marginBottom: 20}}>
          <h2 className="sub-title">Infos entreprises</h2>
          <div>
            <TextField floatingLabelText="Nom" value={companyName} onChange={(e) => this.setState({
              companyName: e.target.value,
              updateCompInfos: true
            })} />
          </div>
          <Auth roles={[SUPER_ADMIN]}>
            <RaisedButton primary label="Enregistrer les modifications" style={{ marginTop: 20 }} onTouchTap={this.updateCompInfos} disabled={!updateCompInfos}/>
          </Auth>
        </div>
        <h2 className="sub-title">Sites</h2>
        <Auth roles={[SUPER_ADMIN]}>
          <RaisedButton
            primary
            label="+ Ajouter un site"
            style={{marginBottom: 20}}
            onTouchTap={() => this.setState({ showModal: true })}
          />
        </Auth>
        <Loader error={false} loading={false}>
          <List data={companySiteList} emptyLabel="Aucun site pour cette entreprise">
            {
              companySiteList.map(site => {
                return (
                  <BarCard key={site.id} actions={
                    <div>
                      <Auth roles={[SUPER_ADMIN]}>
                        <FlatButton primary label="Modifier" onTouchTap={() => this.openModify(site)} />
                        <FlatButton secondary label="Supprimer" onTouchTap={() => this.confirmDelete(site.id)}/>
                      </Auth>
                    </div>
                  } extended>
                    <UserCard
                      title={site.name}
                      subtitle={`${site.address} - ${site.city} ${site.codePostal}`}
                    />
                  </BarCard>
                )
              })
            }
          </List>
        </Loader>
        <Dialog
          title={(modify ? "Modifier " : "Ajouter") + " un site d'entreprise"}
          actions={actions}
          modal
          open={showModal}
        >
          <div className="row">
            <CompanySiteForm default={formData} onUpdate={this.onFormChange} />
          </div>
        </Dialog>
        <Confirm
          title="Suppression d'un site d'entreprise"
          open={openConfirm}
          confirm={this.delete}
        />
      </div>
    )
  }
}
