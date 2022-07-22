import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  const [btnFilter, setBtnFilter] = useState('All');
  const [doneRecipes, setDoneRecipes] = useState([]);

  const setFilter = ({ target }) => setBtnFilter(target.value);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

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
