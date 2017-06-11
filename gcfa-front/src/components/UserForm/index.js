import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { TitleSelect } from './FormField';


class FormModal extends Component {

  state = {
    open: true,
    userType: null,
    data: {},
  }

  closeModal = () => {
    this.setState({open: false});
  }

  update = (key, event) => {
    const value = event.target.value
    const newState = {
      ...this.state.data,
      [key]: value
    };
    this.props.update(newState);
    this.setState({ data: newState });
  }

  renderForm(type) {
    switch(type) {
      case 0:
        return <ApprenticeForm />
      case 1:
        return <TutorForm update={this.update} />
      case 2:
        return <ConsultantForm update={this.update} />
    }
  }

  render() {

    const {
      openModal,
      userType,
      actions,
    } = this.props;

    const userTypeList = ["Apprenti", "Tuteur", "Consultant"]
    const modalTitle = "Ajout d'un " + userTypeList[userType]


    return (
        <Dialog
          title={modalTitle}
          actions={actions}
          open={openModal && this.state.open}
        >
          {this.renderForm(userType)}

        </Dialog>
    )
  }
}

export default FormModal;


class ApprenticeForm extends Component {

  render() {
    return (
        <div>
          <TextField
            hintText="Mail"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Promotion"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Contract Type"
            fullWidth={true}
          /><br />
        </div>
    )
  }

}

function TutorForm(props) {
  return (
    <div className="row">
      <div className="col-3">
        <TitleSelect
          title="Titre"
          fullWidth
          onChange={e => props.update('sexe', e)}
        />
      </div>
      <div className="col-4">
        <TextField
          floatingLabelText="Prénom"
          fullWidth
          onChange={e => props.update('firstName', e)}
        />
      </div>
      <div className="col-5">
        <TextField
          floatingLabelText="Nom"
          fullWidth
          onChange={e => props.update('lastName', e)}
        />
      </div>
      <div className="col-12">
        <TextField
          floatingLabelText="Email"
          fullWidth
          onChange={e => props.update('email', e)}
        />
      </div>
      <div className="col-12">
        <TextField
          floatingLabelText="Emploi"
          fullWidth
          onChange={e => props.update('job', e)}
        />
      </div>
    </div>
  )
}


function ConsultantForm(props) {
  return (
    <div>
      <TextField
        hintText="Mail"
        fullWidth={true}
        onChange={e => props.update('email', e)}
      />
    </div>
  )
}
