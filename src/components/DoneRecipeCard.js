import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';

function DoneRecipeCard({ recipe, index, history }) {
  const { name, category, nationality, doneDate, image, alcoholicOrNot } = recipe;
  return (
    <>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality}${alcoholicOrNot} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          className="recipe-image "
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="recipe"
        />
      </button>
      <ShareBtn path={ `/${recipe.type}s/${recipe.id}` } index={ { index } } />
      {recipe.tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
    </>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default DoneRecipeCard;
