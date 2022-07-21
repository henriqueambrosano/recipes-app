import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
// import DoneRecipeCard from '../components/DoneRecipeCard';
// import CategoryButtons from '../components/CategoryButtons';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavorites] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(favorites);
    }
  }, []);
  return (
    <>
      <Header title="Favorite Recipes" hasSearchBar={ false } />
      <div>
        <label htmlFor="AllBtn" data-testid="filter-by-all-btn">
          All
          <input
            id="AllBtn"
            type="radio"
            name="filterBtn"
            value="All"
          />
        </label>
        <label htmlFor="FoodBtn" data-testid="filter-by-food-btn">
          Food
          <input
            id="FoodBtn"
            type="radio"
            name="filterBtn"
            value="food"
          />
        </label>
        <label htmlFor="DrinkBtn" data-testid="filter-by-drink-btn">
          Drink
          <input
            id="DrinkBtn"
            type="radio"
            name="filterBtn"
            value="drink"
          />
        </label>
      </div>
      {
        favoriteRecipes.map((recipe, index) => (
          <FavoriteCard key={ index } recipe={ recipe } index={ index } />
        ))
      }
    </>
  );
}

export default FavoriteRecipes;
