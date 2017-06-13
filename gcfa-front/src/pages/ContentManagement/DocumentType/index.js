import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Loader from '../../../components/Loader';
import { SelectForm } from '../../../components/UserForm/FormField';
import BarCard, { List, UserCard } from '../../../components/BarCard';
import DocTypeForm from './documentTypeForm';

import * as documentTypeService from '../../../services/documentTypeService';

import { TWO_YEARS, THREE_YEARS } from '../../../constants';

export default class DocumentType extends Component {
  state = {
    docTypeList: [],
    loading: false,
    contractSelected: TWO_YEARS,

    showModal: false,
    formData: null,
    modify: false,
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

  selectContract = (contract) => {
    this.setState({ contractSelected: contract });
  }

  filterDocs = () => {
    return this.state.docTypeList.filter(d => d.contract === this.state.contractSelected);
  }

  create = () => {
    const { formData } = this.state;
    documentTypeService.createDocumentType(formData)
      .then(ok => {
        this.requestDocType();
        this.setState({ showModal: false, formData: {} });
      })
  }

  onFormChange = (formData) => {
    this.setState({ formData });
  }

  delete = (id) => {
    documentTypeService.deleteDocumentType(id)
      .then(ok => {
        this.requestDocType();
      })
  }

  openModify = (doc) => {
    this.setState({
      formData: doc,
      showModal: true,
      modify: true
    });
  }

  modify = () => {
    const  { formData } = this.state;
    console.log(formData);
    documentTypeService.updateDocumentType(formData.id, formData)
      .then(ok => {
        this.requestDocType();
        this.setState({ showModal: false });
      })
    this.setState({ formData: null, modify: false });
  }

  render() {
    const {
      loading,
      contractSelected,

      formContract,
      modify,
      formData,
    } = this.state;

    const docs = this.filterDocs();

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
        <div>
          <div style={{marginBottom: 20}}>
            <RaisedButton primary label="+ Ajouter" style={{ marginRight: 20 }} onTouchTap={
              () => this.setState({ showModal: true })
            } />
            <span>
              <span>Contrat : </span>
              <RaisedButton primary={contractSelected === TWO_YEARS} label="2 ans" style={{ marginRight: 10 }} onTouchTap={() =>this.selectContract(TWO_YEARS)} />
              <RaisedButton primary={contractSelected === THREE_YEARS} label="3 ans" style={{ marginRight: 10 }} onTouchTap={() =>this.selectContract(THREE_YEARS)} />
            </span>
          </div>
          <Loader error={false} loading={loading}>
            <List data={docs} emptyLabel="Aucun type de document">
              {
                docs.map(doc => {
                  return (
                    <BarCard key={doc.id} actions={
                      <div>
                        <FlatButton primary label="Modifier" onTouchTap={()=>this.openModify(doc)} />
                        <FlatButton secondary label="Supprimer" onTouchTap={()=>this.delete(doc.id)} />
                      </div>
                    } extended>
                      <UserCard
                        title={doc.name}
                        subtitle={`${doc.day}/${doc.month} Année ${doc.year}`}
                      />
                    </BarCard>
                  )
                })
              }
            </List>
          </Loader>
        </div>
        <Dialog
          title={(modify ? "Modifier " : "Ajouter") + " un type de document"}
          actions={actions}
          modal
          open={this.state.showModal}
        >
          <div className="row">
            <DocTypeForm default={formData} onUpdate={this.onFormChange} />
          </div>
        </Dialog>
      </div>
    )
  }
}
