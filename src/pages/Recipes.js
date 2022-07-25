import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import RecepiesAppContext from '../context/RecepiesAppContext';
import CategoryButtons from '../components/CategoryButtons';
import SearchBar from '../components/SearchBar';

function Recipes({ history }) {
  const { recipesList } = useContext(RecepiesAppContext);
  const [searchBarVisible, setSearchbar] = useState(false);

  let recipes = [];
  recipes = recipesList.meals
    ? recipesList.meals.filter((item, index) => index < +'12') : [];

  return (
    <>
      <Header title="Foods" hasSearchBar history={ history } />
      <CategoryButtons title="Foods" />
      {
        recipes.map((item, index) => (
          <Card
            key={ index }
            name={ item.strMeal }
            index={ index }
            image={ item.strMealThumb }
            path={ `foods/${item.idMeal}` }
            history={ history }
          />
        ))
      }
      {searchBarVisible && <SearchBar
        title="Foods"
        history={ history }
        searchBarVisible={ searchBarVisible }
        setSearchbar={ setSearchbar }
      />}
      <Footer history={ history } />
    </>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
};

Recipes.defaultProps = {
  history: {},
};

export default Recipes;
