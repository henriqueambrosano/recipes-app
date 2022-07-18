import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, hasSearchBar, history }) {
  const [searchBarVisible, setSearchbar] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      {hasSearchBar && (
        <button
          type="button"
          onClick={ () => setSearchbar(!searchBarVisible) }
        >
          <img
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      <h1 data-testid="page-title">{title}</h1>
      {searchBarVisible && <SearchBar title={ title } history={ history } />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
  history: PropTypes.shape(),
};

Header.defaultProps = {
  history: {},
};

export default Header;
