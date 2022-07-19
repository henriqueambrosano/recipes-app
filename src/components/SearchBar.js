import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from '../context/RecepiesAppContext';
import fetchRecipes from '../services/services';

function SearchBar({ title, history }) {
  const { setSearchType, searchType, setRecipes } = useContext(RecepiesAppContext);
  const [searchInput, setSearchInput] = useState('');

  const handleTextChange = ({ target }) => {
    setSearchInput(target.value);
  };
  const isItDrink = title === 'Drinks' ? 'thecocktaildb' : 'themealdb';

  const alertMessage = () => {
    alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const checkErrors = (data, isItMeal) => {
    console.log('enter');
    if (data === undefined || data[isItMeal] === null) {
      alertMessage();
    } else if (data) {
      if (!data[isItMeal]) {
        alertMessage();
      }
      console.log(data[isItMeal]);
      if (data[isItMeal].length === 1) {
        if (isItMeal === 'drinks') {
          history.push(`/drinks/${data.drinks[0].idDrink}`);
        } else {
          history.push(`/foods/${data.meals[0].idMeal}`);
        }
      }
    }
  };

  const saveRecipes = async () => {
    const firstLetterURL = `https://www.${isItDrink}.com/api/json/v1/1/search.php?f=`;
    if (searchType === firstLetterURL && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    } else {
      const data = await fetchRecipes(`${searchType}${searchInput}`);
      setRecipes(data);
      const isItMeal = title === 'Drinks' ? 'drinks' : 'meals';
      checkErrors(data, isItMeal);
    }
  };

  return (
    <>
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="search_option"
          onClick={ () => setSearchType(
            `https://www.${isItDrink}.com/api/json/v1/1/filter.php?i=`,
          ) }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="search_option"
          value="name"
          onClick={ () => setSearchType(
            `https://www.${isItDrink}.com/api/json/v1/1/search.php?s=`,
          ) }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          name="search_option"
          value="first-letter"
          onClick={ () => setSearchType(
            `https://www.${isItDrink}.com/api/json/v1/1/search.php?f=`,
          ) }
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <input
        type="text"
        id="search-input"
        name="searchInput"
        data-testid="search-input"
        onChange={ handleTextChange }
        placeholder="Search for recipe, name or first letter"
      />
      <button type="button" data-testid="exec-search-btn" onClick={ saveRecipes }>
        Search
      </button>
    </>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default SearchBar;
