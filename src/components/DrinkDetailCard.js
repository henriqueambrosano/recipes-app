import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const DrinkDetailCard = ({ cardDetails, path }) => {
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = cardDetails;

  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);

  return (
    <>
      <img
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt="drink"
        className="recipe-image"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <ShareBtn path={ path } />
      <FavoriteBtn cardDetails={ cardDetails } recipeType="idDrink" />
      <p data-testid="recipe-category">{strAlcoholic}</p>
      {ingredients.map((ingr, i) => (
        <p
          data-testid={ `${i}-ingredient-name-and-measure` }
          key={ `ingr-${i}` }
        >
          {`${ingr}${measures[i] ? ` - ${measures[i]}` : ''}`}
        </p>
      ))}
      <p data-testid="instructions">{strInstructions}</p>
    </>
  );
};

DrinkDetailCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default DrinkDetailCard;
