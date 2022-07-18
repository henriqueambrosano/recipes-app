import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, name, image }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      <img src={ image } data-testid={ `${index}-card-img` } alt={ name } />
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
