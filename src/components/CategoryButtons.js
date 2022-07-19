import React, { useEffect, useState } from 'react';

function CategoryButtons({ title }) {
  const [categories, setCategories] = useState([]);
  const URL = title === 'Drinks' ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list' : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const isItDrink = title === 'Drinks' ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchCategories = () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => setCategories(data[isItDrink]
          .filter((_item, index) => index < +'5')));
    };
    fetchCategories();
  }, []);

  return (
    categories.map((category) => (
      <button
        key={ category.strCategory }
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
      >
        {category.strCategory}
      </button>
    ))
  );
}

export default CategoryButtons;
