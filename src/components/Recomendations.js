import React from 'react';
import { PropTypes } from 'prop-types';

function Recomendations({ recipes, type }) {
  return (
    <div className="recomendations-container">
      {recipes.map((item, i) => (
        <div
          key={ item[type] }
          className="recomendation-item"
          data-testid={ `${i}-recomendation-card` }
        >
          <img src={ item[`${type}Thumb`] } alt={ item[type] } />
          <h1 data-testid={ `${i}-recomendation-title` }>{item[type]}</h1>
        </div>
      ))}
    </div>
  );
}

Recomendations.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendations;
