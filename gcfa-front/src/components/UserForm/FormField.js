import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default function FormField(props) {

  const LABEL_STYLE = {
  	width:100
  }

  const TD_STYLE = {
  	width: 180,
  }

  const renderField = () => {
    if (props.children) {
      return props.children;
    } else {
      return (
        <TextField
          id={props.fname}
          style={props.tfStyle || TD_STYLE}
          defaultValue={props.defaultValue}
          onChange={(e) => props.onChange(props.fname, e.target.value)}
          disabled={props.disabled || false}
          type={props.type || 'text'}
        />
      )
    }
  }

  return (
    <tr>
      <th style={props.titleStyle || LABEL_STYLE}>{props.title}</th>
      <td>
        {renderField()}
      </td>
    </tr>
  )
}


export class TitleSelect extends Component {
  state = {
    choice: 'Male',
  }

  handleChange = (e, index, value) => {
    this.setState({ choice: value });
    this.props.onChange(e, index, value)
  }

  componentDidMount() {
    if (this.props.default) {
      this.setState({ choice: this.props.default });
    }
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.props.title}
        fullWidth={this.props.fullWidth}
        disabled={this.props.disabled}
        value={this.state.choice}
        onChange={this.handleChange}
      >
        <MenuItem value="Male" primaryText="Mr" />
        <MenuItem value="Female" primaryText="Mme" />
      </SelectField>
    )
  }
}

export function SelectForm(props) {
  return (
    <SelectField
      floatingLabelText={props.title}
      fullWidth={props.fullWidth}
      value={props.selectValue}
      onChange={props.handleChange}
      disabled={props.disabled}
    >
      {
        props.itemList.map((e, i) => {
          return <MenuItem key={i} value={e._value} primaryText={e._text} />
        })
      }
    </SelectField>
  )
}
