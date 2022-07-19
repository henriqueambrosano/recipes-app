import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import RecepiesAppContext from '../context/RecepiesAppContext';

function Recipes({ history }) {
  const { recipesList } = useContext(RecepiesAppContext);
  let recipes;
  if (!recipesList) {
    recipes = [];
  } else {
    recipes = recipesList.meals
      ? recipesList.meals.filter((item, index) => index < +'12') : [];
  }

  return (
    <>
      <Header title="Foods" hasSearchBar history={ history } />
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
