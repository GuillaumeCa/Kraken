import React, { Component } from 'react';
import './BarCard.css';

import colors from '../../colors';

const BAR_STYLE = {
  display: 'flex',
  borderRadius: 5,
  background: colors.GREY_LIGHT,
  maxWidth: 600,
  marginBottom: 10,
}
const ACTION_STYLE = {
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
  marginRight: 10,
}

export default function BarCard(props) {
  return (
    <div style={BAR_STYLE}>
      {props.children}
      <div style={ACTION_STYLE}>
        {props.actions}
      </div>
    </div>
  )
}

const DOCUMENT_STYLE = {
  padding: 13,
}
const DOCUMENT_TITLE_STYLE = {
  fontSize: 25,
  fontWeight: 'normal',
  color: colors.GREY_DARK,
  margin: 0,
  marginBottom: 5,
}
const DOCUMENT_SUBTITLE_STYLE = {
  margin: 0,
  color: colors.GREY_DARK,
  fontStyle: 'italic',
}

export function DocumentCard(props) {
  return (
    <div style={DOCUMENT_STYLE}>
      <h1 style={DOCUMENT_TITLE_STYLE}>{props.title}</h1>
      <p style={DOCUMENT_SUBTITLE_STYLE}>{props.subtitle}</p>
    </div>
  )
}
