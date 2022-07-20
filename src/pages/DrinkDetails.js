import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinkDetailCard from '../components/DrinkDetailCard';
import fetchRecipes from '../services/services';
import Recomendations from '../components/Recomendations';

function DrinkDetails({ match, history }) {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [recomendedMeals, setRecomendedMeals] = useState(null);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [btnName, setBtnName] = useState('Start Recipe');

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetail(data));
    };
    const fetchRecomendations = async () => {
      const recomendedRecipes = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecomendedMeals(recomendedRecipes.meals.filter((item, i) => i < +'6'));
    };
    fetchRecomendations();
    fetchDetails();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const checkDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(checkDoneRecipes);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      const checkProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ).cocktails;
      if (Object.keys(checkProgressRecipes).some((item) => item === match.params.id)) {
        setBtnName('Continue Recipe');
      }
    }
  }, []);

  const startRecipe = () => {
    const isLocalStorage = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = isLocalStorage
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { meals: {} };
    if (isLocalStorage && JSON.parse(isLocalStorage).cocktails) {
      if (!Object.keys(inProgressRecipes.cocktails)
        .some((item) => item === match.params.id)) {
        localStorage
          .setItem('inProgressRecipes', JSON
            .stringify({ ...inProgressRecipes,
              cocktails: { ...inProgressRecipes.cocktails, [match.params.id]: [] } }));
      }
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
          cocktails: { [match.params.id]: [] } }));
    }
    history.push(`/drinks/${match.params.id}/in-progress`);
  };

  return (
    <>
      {recipeDetail && (
        <DrinkDetailCard
          cardDetails={ recipeDetail.drinks[0] }
          path={ history.location.pathname }
        />
      )}

      {recomendedMeals && <Recomendations recipes={ recomendedMeals } type="strMeal" />}
      {!doneRecipes.some((item) => item.id === match.params.id)
        && (
          <button
            className="btnRecipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
          >
            {btnName}
          </button>
        )}
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default DrinkDetails;
