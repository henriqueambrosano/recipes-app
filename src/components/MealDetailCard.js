import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const MealDetailCard = ({ cardDetails, path }) => {
  const { strMealThumb, strMeal, strInstructions, strCategory, strYoutube } = cardDetails;
  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');

  return (
    <>
      <img
        src={ strMealThumb }
        data-testid="recipe-photo"
        alt="meal"
        className="recipe-image"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <ShareBtn path={ path } />
      <FavoriteBtn cardDetails={ cardDetails } recipeType="idMeal" />
      <p data-testid="recipe-category">{strCategory}</p>
      {ingredients.map((ingr, i) => (
        <p
          data-testid={ `${i}-ingredient-name-and-measure` }
          key={ `ingr-${i}` }
        >
          {`${ingr}${measures[i] ? ` - ${measures[i]}` : ''}`}
        </p>
      ))}
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        title="recipe-video"
        width="400"
        src={ strYoutube.replace('/watch?v=', '/embed/') }
        data-testid="video"
      />
    </>
  );
};

MealDetailCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default MealDetailCard;
