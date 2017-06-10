import React from 'react';
import './BarCard.css';


import colors from '../../colors';

export default function BarCard(props) {

  const BAR_STYLE = {
    display: 'flex',
    borderRadius: 5,
    background: colors.GREY_LIGHT,
    maxWidth: props.extended ? '100%' : 600,
    marginBottom: 10,
  }

  const ACTION_STYLE = {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    marginRight: 10,
  }


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

const USER_STYLE = {
  padding: 15,
}
const USER_TITLE_STYLE = {
  fontSize: 20,
  fontWeight: 'normal',
  color: colors.GREY_DARK,
  margin: 0,
  marginBottom: 3,
}
const USER_SUBTITLE_STYLE = {
  margin: 0,
  color: colors.GREY_DARK,
  fontStyle: 'italic',
}

export function UserCard(props) {
  return (
    <div style={USER_STYLE}>
      <h1 style={USER_TITLE_STYLE}>{props.title}</h1>
      <p style={USER_SUBTITLE_STYLE}>{props.subtitle}</p>
    </div>
  )
}

const ICON_TYPE_DOC_STYLE = {
  width: 30,
}

const DOCUMENTATION_STYLE = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 15,
}

export function DocumentationCard(props) {
  const selectIcon = (type) => {
    switch (type) {
      case '.pdf':
        return 'PDF.png'
      case '.docx':
      case '.doc':
        return 'Word.png'
      case '.xls':
      case '.xlsx':
        return 'Excel.png'
      default:
        return ''
    }

  }

  return (
    <div style={DOCUMENTATION_STYLE}>
      <div>
        <img style={ICON_TYPE_DOC_STYLE} src={'/icons/' + selectIcon(props.type)} alt="doc-icon-type"/>
      </div>
      <DocumentCard title={props.title} subtitle={props.subtitle} />
    </div>
  )
}


const EMPTY_STYLE = {
  color: colors.GREY_DARK,
  marginBottom: 30,
}

export function List(props) {
  if (props.data.length > 0) {
    return <div>{props.children}</div>;
  }
  return <div style={EMPTY_STYLE}>{props.emptyLabel}</div>
}
