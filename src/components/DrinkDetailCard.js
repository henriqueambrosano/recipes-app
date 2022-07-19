import React from 'react';
import PropTypes from 'prop-types';

const DrinkDetailCard = ({ cardDetails }) => {
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
      <div data-testid={ `${0}-recomendation-card` }>
        Receitas Recomendadas
      </div>
    </>
  );
};

DrinkDetailCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
};

export default DrinkDetailCard;
