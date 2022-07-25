import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProfileEffects from '../hooks/useProfileEffects';
import SearchBar from '../components/SearchBar';

function Profile({ history }) {
  const { savedEmail } = useProfileEffects();
  const [searchBarVisible, setSearchbar] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    if (localStorage.getItem('doneRecipes')) {
      localStorage.removeItem('doneRecipes');
    }
    if (localStorage.getItem('favoriteRecipes')) {
      localStorage.removeItem('favoriteRecipes');
    }
    if (localStorage.getItem('inProgressRecipes')) {
      localStorage.removeItem('inProgressRecipes');
    }
    history.push('/');
  };
  return (
    <main>
      <Header title="Profile" hasSearchBar={ false } history={ history } />
      <section>
        <p data-testid="profile-email">{savedEmail}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </section>
      {searchBarVisible && <SearchBar
        title="Profile"
        history={ history }
        searchBarVisible={ searchBarVisible }
        setSearchbar={ setSearchbar }
      />}
      <Footer history={ history } />
    </main>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(),
};

Profile.defaultProps = {
  history: {},
};

export default Profile;
