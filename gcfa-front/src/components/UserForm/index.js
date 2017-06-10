import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


class FormModal extends Component {

  state = {
    open: true,
    userType: null,
  }

  closeModal = () => {
    this.setState({open: false});
  }

  renderForm(type) {
    switch(type) {
      case 0:
        return <ApprenticeForm />
      case 1:
        return <TutorForm />
      case 2:
        return <ConsultantForm />
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
    <div>
      <TextField
        floatingLabelText="Prénom"
        fullWidth
        onChange={(e) => props.update('prenom', e)}
      />
      <TextField
        floatingLabelText="Nom"
        fullWidth
        onChange={(e) => props.update('nom', e)}
      />
      <TextField
        floatingLabelText="Email"
        fullWidth
        onChange={(e) => props.update('email', e)}
      />
      <TextField
        floatingLabelText="Emploi"
        fullWidth
        onChange={(e) => props.update('emploi', e)}
      />
    </div>
  )
}


class ConsultantForm extends Component {

  render() {
    return (
      <div>
        <TextField
            hintText="Mail"
            fullWidth={true}
          /><br />
      </div>
    )
  }
}
