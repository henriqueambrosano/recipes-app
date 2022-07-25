import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchBar, history, setSearchbar, searchBarVisible }) {
  return (
    <header className="component__header">
      <button
        className="component__header__profile__btn"
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          className="component__header__profile__btn__img"
          data-testid="profile-top-btn"
        />
      </button>
      <h1 className="component__header__title" data-testid="page-title">{title}</h1>
      {hasSearchBar && (
        <button
          type="button"
          className="component__header__search__btn"
          onClick={ () => setSearchbar(!searchBarVisible) }
        >
          <img
            src={ searchIcon }
            alt="search icon"
            className="component__header__search__btn__img"
            data-testid="search-top-btn"
          />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
  setSearchbar: PropTypes.func,
  searchBarVisible: PropTypes.bool,
  history: PropTypes.shape(),
};

Header.defaultProps = {
  history: {},
  setSearchbar: () => {},
  searchBarVisible: false,
};

export default Header;
