import React from 'react';

function SearchBar() {
  return (
    <>
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="search_option"
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
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          name="first_letter"
          value="JavaScript"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <input
        type="text"
        id="search-input"
        name="searchInput"
        data-testid="search-input"
        placeholder="Search for recipe, name or first letter"
      />
      <button type="button" data-testid="exec-search-btn">
        Search
      </button>
    </>
  );
}

export default SearchBar;
