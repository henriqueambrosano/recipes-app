import React, { useContext } from 'react';
import RecepiesAppContext from '../context/RecepiesAppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchBar }) {
  return (
    <>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      { hasSearchBar && <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" /> }
      <h1 data-testid="page-title">{ title }</h1>
    </>
  );
}

export default Header;
