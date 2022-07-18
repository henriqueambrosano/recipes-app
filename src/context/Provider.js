import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from './RecepiesAppContext';

function Provider({ children }) {
  const [estado, setEstado] = useState({ email: '', password: '', isDisabled: true });
  const [searchType, setSearchType] = useState('');
  const [recipesList, setRecipes] = useState([]);

  const context = {
    estado,
    setEstado,
    searchType,
    setSearchType,
    recipesList,
    setRecipes,
  };

  return (
    <RecepiesAppContext.Provider value={ context }>
      {children}
    </RecepiesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
