import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

export default function FormField(props) {

  const LABEL_STYLE = {
  	width:100
  }

  const TD_STYLE = {
  	width: 180,
  }

  return (
    <tr>
      <th style={props.titleStyle || LABEL_STYLE}>{props.title}</th>
      <td>
        <TextField
          id={props.fname}
          style={props.tfStyle || TD_STYLE}
          defaultValue={props.defaultValue}
          onChange={(e) => props.onChange(props.fname, e.target.value)}
          disabled={props.disabled || false}
        />
      </td>
    </tr>
  )
}
