import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const DrinkDetailCard = ({ cardDetails, path }) => {
  console.log(cardDetails);
  const [copied, setCopied] = useState('');
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = cardDetails;
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);

  const checkFavorite = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes.some((item) => item.id === cardDetails.idDrink);
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
      id: cardDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: cardDetails.strCategory,
      alcoholicOrNot: cardDetails.strAlcoholic,
      name: cardDetails.strDrink,
      image: cardDetails.strDrinkThumb,
    };
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes.some((item) => item.id === cardDetails.idDrink);
      if (isFavorite) {
        const newFavorites = favoriteRecipes
          .filter((recipe) => recipe.id !== cardDetails.idDrink);
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
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt="drink"
        className="recipe-image"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
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
