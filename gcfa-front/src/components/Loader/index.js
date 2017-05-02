import React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import colors from '../../colors';

const LABEL_STYLE = {
  color: colors.GREY_DARK,
  marginBottom: 30,
}

const REFRESH = {
  position: 'relative',
  margin: '0 auto',
}
const LOADER = {
  textAlign: 'center',
  margin: '100px auto',
}
const LOADING_TEXT = {
  fontWeight: 'normal',
  fontSize: 15,
  color: colors.GREY_DARK,
}

/**
 * Le composant Loader permet de gérer l'affichage d'un spinner
 * lors d'un chargement ou d'afficher une erreur
 */
function Loader(props) {
  const { loading, error, children } = props;
  const message = props.message || "Erreur de chargement";

  if (error) {
    return <div style={LABEL_STYLE}>{message}</div>;
  }

  if (loading) {
    return (
      <div style={LOADER}>
        <RefreshIndicator
          size={40}
          top={0}
          left={0}
          loadingColor={colors.PRIMARY}
          status="loading"
          style={REFRESH}
        />
        <h3 style={LOADING_TEXT}>Chargement en cours</h3>
      </div>
    )
  } else {
    return children;
  }
  return null;
}

export default Loader;
