import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';

function Profile({ history }) {
  return (
    <>
      <Header title="Profile" hasSearchBar={ false } history={ history } />
      <CategoryButtons title="Profile" />
      <Footer history={ history } />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(),
};

Profile.defaultProps = {
  history: {},
};

export default Profile;
