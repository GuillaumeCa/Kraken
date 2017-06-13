import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

export default class CompanySiteForm extends Component  {
  state = {
    name: '',
    address: '',
    codePostal: '',
    city: '',
  }

  componentDidMount() {
    if (this.props.default) {
      this.setState({ ...this.props.default });
    }
  }

  onFormChange = (key, value) => {
    const toUpdate = { ...this.state, [key]: value }
    this.props.onUpdate(toUpdate);
    this.setState({
      [key]: value
    });
  }

  render() {

    const {
      name,
      address,
      codePostal,
      city,
    } = this.state;

    return (
      <div>
        <div className="col-12">
          <TextField
            floatingLabelText="Nom"
            fullWidth
            value={name}
            onChange={(e) => this.onFormChange('name', e.target.value)}
          />
          <TextField
            floatingLabelText="Addresse"
            fullWidth
            value={address}
            onChange={(e) => this.onFormChange('address', e.target.value)}
          />
        </div>
        <div className="col-5">
          <TextField
            floatingLabelText="Code Postal"
            fullWidth
            type="number"
            value={codePostal}
            onChange={(e) => this.onFormChange('codePostal', e.target.value)}
          />
        </div>
        <div className="col-7">
          <TextField
            floatingLabelText="Ville"
            fullWidth
            value={city}
            onChange={(e) => this.onFormChange('city', e.target.value)}
          />
        </div>
      </div>
    )
  }
}
