import React, { useContext } from 'react';
import RecepiesAppContext from '../context/RecepiesAppContext';

function SearchBar() {
  const { nada } = useContext(RecepiesAppContext);
  return (
    <>
      SearchBar
      { nada }
    </>
  );
}

export default SearchBar;
