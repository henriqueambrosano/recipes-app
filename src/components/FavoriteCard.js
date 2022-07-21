import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function FavoriteCard({ recipe, index }) {
  const [isFavorited, setIsFavorite] = useState(true);
  const verifieFavorite = () => {
    setIsFavorite(false);
  };
  const { id, image, name, nationality, type, alcoholicOrNot, category } = recipe;
  return (
    <div>
      { isFavorited
        && (
          <div>
            <image src={ image } data-testid={ `${index}-horizontal-image` } />
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nationality}${alcoholicOrNot} - ${category}`}
            </h6>
            <h6 data-testid={ `${index}-horizontal-name` }>{name}</h6>
            <ShareBtn index={ { index } } path={ `/${type}s/${id}` } />
            <button type="button" onClick={ verifieFavorite } className="no-border">
              <FavoriteBtn cardDetails={ recipe } index={ index } recipeType={ type } />
            </button>
          </div>
        )}
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
//   history: PropTypes.shape().isRequired,
};

export default FavoriteCard;
