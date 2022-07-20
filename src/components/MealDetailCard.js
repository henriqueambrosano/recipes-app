import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const MealDetailCard = ({ cardDetails, path }) => {
  const [copied, setCopied] = useState('');
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const { strMealThumb, strMeal, strInstructions, strCategory, strYoutube } = cardDetails;
  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');

  const checkFavorite = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes.some((item) => item.id === cardDetails.idMeal);
      setFavoriteRecipe(isFavorite);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  const copyToClipboard = () => {
    setCopied('Link copied!');
    copy(`http://localhost:3000${path}`);
  };

  const setAsFavorite = () => {
    const newFavorite = {
      id: cardDetails.idMeal,
      type: 'food',
      nationality: cardDetails.strArea,
      category: cardDetails.strCategory,
      alcoholicOrNot: '',
      name: cardDetails.strMeal,
      image: cardDetails.strMealThumb,
    };
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes.some((item) => item.id === cardDetails.idMeal);
      if (isFavorite) {
        const newFavorites = favoriteRecipes
          .filter((recipe) => recipe.id !== cardDetails.idMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      }
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
    checkFavorite();
  };

  return (
    <>
      <img
        src={ strMealThumb }
        data-testid="recipe-photo"
        alt="meal"
        className="recipe-image"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button type="button" data-testid="share-btn" onClick={ copyToClipboard }>
        <img src={ shareIcon } alt="share-btn" />
      </button>
      <span>{copied}</span>
      <button
        type="button"
        onClick={ setAsFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeart : whiteHeart }
          alt="favorite-btn"
        />
      </button>
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
