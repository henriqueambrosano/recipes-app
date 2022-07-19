import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, name, image, history, path }) {
  return (
    <button type="button" onClick={ () => history.push(path) } className="card">
      <div data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <img src={ image } data-testid={ `${index}-card-img` } alt={ name } />
      </div>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default Card;
