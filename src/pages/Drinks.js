import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks({ history }) {
  return (
    <>
      <Header title="Drinks" hasSearchBar history={ history } />
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape(),
};

Drinks.defaultProps = {
  history: {},
};

export default Drinks;
