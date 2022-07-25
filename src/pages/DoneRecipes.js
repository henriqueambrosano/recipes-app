import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import useDoneRecipesStorage from '../hooks/useDoneRecipesStorage';
import useBtnFilter from '../hooks/useBtnFilter';
import SearchBar from '../components/SearchBar';

function DoneRecipes({ history }) {
  const { btnFilter, setBtnFilter } = useBtnFilter();
  const { doneRecipes } = useDoneRecipesStorage();
  const [searchBarVisible, setSearchbar] = useState(false);

  const setFilter = ({ target }) => setBtnFilter(target.value);

  return (
    <>
      <Header title="Done Recipes" hasSearchBar={ false } />
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
      {searchBarVisible && <SearchBar
        title="Done Recipes"
        history={ history }
        searchBarVisible={ searchBarVisible }
        setSearchbar={ setSearchbar }
      />}
      <div>
        {doneRecipes.filter((item) => item.type === btnFilter || btnFilter === 'All')
          .map((recipe, index) => (
            <DoneRecipeCard
              history={ history }
              key={ index }
              index={ index }
              recipe={ recipe }
            />
          ))}
      </div>
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
