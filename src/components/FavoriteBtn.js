import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteBtn({ cardDetails, recipeType }) {
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const checkFavorite = (idType) => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const isFavorite = favoriteRecipes.some(
        (item) => item.id === cardDetails[idType],
      );
      return isFavorite ? blackHeart : whiteHeart;
    }
    return whiteHeart;
  };

  useEffect(() => {
    if (favoriteRecipe) setFavoriteRecipe(false);
  }, [favoriteRecipe]);

  const setAsFavorite = () => {
    const newFavorite = recipeType !== 'idDrink'
      ? {
        id: cardDetails.idMeal,
        type: 'food',
        nationality: cardDetails.strArea,
        category: cardDetails.strCategory,
        alcoholicOrNot: '',
        name: cardDetails.strMeal,
        image: cardDetails.strMealThumb,
      }
      : {
        id: cardDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: cardDetails.strCategory,
        alcoholicOrNot: cardDetails.strAlcoholic,
        name: cardDetails.strDrink,
        image: cardDetails.strDrinkThumb,
      };

    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const isFavorite = favoriteRecipes.some(
        (item) => item.id === cardDetails[recipeType],
      );
      if (isFavorite) {
        const newFavorites = favoriteRecipes.filter(
          (recipe) => recipe.id !== cardDetails[recipeType],
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipes, newFavorite]),
        );
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
    setFavoriteRecipe(true);
    // checkFavorite(recipeType);
  };

  return (
    <button type="button" onClick={ setAsFavorite }>
      <img
        data-testid="favorite-btn"
        src={ checkFavorite(recipeType) }
        alt="favorite-btn"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default FavoriteBtn;
