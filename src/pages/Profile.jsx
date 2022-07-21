import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  return (
    <main>
      <Header title="Profile" hasSearchBar={ false } history={ history } />
      <section>
        <label htmlFor="email">
          User:
          <input
            type="email"
            data-testid="profile-email"
            name="email"
          />
        </label>
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
          onClick={ () => history.push('/') }
        >
          Logout
        </button>
      </section>
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
