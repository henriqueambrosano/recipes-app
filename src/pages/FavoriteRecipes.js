import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import useBtnFilter from '../hooks/useBtnFilter';
import useFavoriteStorage from '../hooks/useFavoriteStorage';

function FavoriteRecipes({ history }) {
  const { btnFilter, setBtnFilter } = useBtnFilter();
  const { favoriteRecipes } = useFavoriteStorage();
  const setFilter = ({ target }) => {
    const { value } = target;
    setBtnFilter(value);
  };

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
            onClick={ setFilter }
          />
        </label>
        <label htmlFor="FoodBtn" data-testid="filter-by-food-btn">
          Food
          <input
            id="FoodBtn"
            type="radio"
            name="filterBtn"
            value="food"
            onClick={ setFilter }
          />
        </label>
        <label htmlFor="DrinkBtn" data-testid="filter-by-drink-btn">
          Drink
          <input
            id="DrinkBtn"
            type="radio"
            name="filterBtn"
            value="drink"
            onClick={ setFilter }
          />
        </label>
      </div>
      {
        favoriteRecipes.filter((item) => item.type === btnFilter || btnFilter === 'All')
          .map((recipe, index) => (
            <FavoriteCard
              history={ history }
              key={ index }
              recipe={ recipe }
              index={ index }
            />
          ))
      }
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default FavoriteRecipes;
