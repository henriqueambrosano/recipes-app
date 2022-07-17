import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, hasSearchBar }) {
  return (
    <>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      {hasSearchBar && (
        <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      )}
      <h1 data-testid="page-title">{title}</h1>
      <SearchBar />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
};

export default Header;
