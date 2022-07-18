import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ history }) {
  return (
    <>
      <Header title="Foods" hasSearchBar history={ history } />
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
};

Recipes.defaultProps = {
  history: {},
};

export default Recipes;
