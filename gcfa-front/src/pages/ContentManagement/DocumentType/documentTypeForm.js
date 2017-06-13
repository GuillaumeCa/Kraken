import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import { SelectForm } from '../../../components/UserForm/FormField';


import { TWO_YEARS, THREE_YEARS } from '../../../constants';

export default class DocTypeForm extends Component  {
  state = {
    contract: TWO_YEARS,
    year: 1,
    month: 1,
    day: 1,
    name: '',
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
      contract,
      year,
      month,
      day,
      name,
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
          <SelectForm
            title="Type de contract"
            selectValue={contract}
            handleChange={(e, i, v) => this.onFormChange('contract', v)}
            itemList={[
              { _value: TWO_YEARS, _text: '2 ans'},
              { _value: THREE_YEARS, _text: '3 ans'}
            ]}
            fullWidth
          />
        </div>
        <div className="col-4">
          <TextField
            fullWidth
            type="number"
            min="1"
            max="31"
            floatingLabelText="Jour"
            value={day}
            onChange={(e) => this.onFormChange('day', e.target.value)}
          />
        </div>
        <div className="col-4">
          <TextField
            fullWidth
            type="number"
            min="1"
            max="12"
            floatingLabelText="Mois"
            value={month}
            onChange={(e) => this.onFormChange('month', e.target.value)}
          />
        </div>
        <div className="col-4">
          <SelectForm
            title="Année"
            selectValue={year}
            handleChange={(e, i, v) => this.onFormChange('year', v)}
            itemList={[
              { _value: 1, _text: '1ère année'},
              { _value: 2, _text: '2ème année'},
              { _value: 3, _text: '3ème année'}
            ]}
            fullWidth
          />
        </div>
      </div>
    )
  }
}
