import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from './RecepiesAppContext';

function Provider({ children }) {
  const [estado, setEstado] = useState('estado-inicial');
  const [email, setEmail] = useState('dev@trybe.com');
  const [password, setPassword] = useState('123Dev');
  const [toggle, setToggle] = useState(true);
  const context = {
    nada: estado,
    setEstado,
    email,
    setEmail,
    password,
    setPassword,
    toggle,
    setToggle,
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
