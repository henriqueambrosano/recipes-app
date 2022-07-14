import React, { useContext } from 'react';
import RecepiesAppContext from '../context/RecepiesAppContext';

function Login() {
  const { nada } = useContext(RecepiesAppContext);
  return (
    <>
      Login
      { nada }
    </>
  );
}

export default Login;
