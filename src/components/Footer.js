import React, { useContext } from 'react';
import RecepiesAppContext from '../context/RecepiesAppContext';

function Footer() {
  const { nada } = useContext(RecepiesAppContext);
  return (
    <>
      { nada }
      Footer
    </>
  );
}

export default Footer;
