import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import fetchRecipes from '../services/services';
import { isItDrinkF } from '../services/helpers';

function RecipeInProgress({ props: { history, match }, title }) {
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [measuresFound, setMeasuresFound] = useState([]);

  const thumbNail = title === 'Drinks' ? 'Drink' : 'Meal';
  const enterData = title === 'Drinks' ? 'drinks' : 'meals';
  const recipeType = title === 'Drinks' ? 'cocktails' : 'meals';
  const initialLocalStorage = (ingredient) => (
    title === 'Drinks'
      ? { cocktails: { [match.params.id]: [ingredient] }, meals: {} }
      : { cocktails: { }, meals: { [match.params.id]: [ingredient] } }
  );

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchRecipes(
        `https://www.${isItDrinkF(title)}.com/api/json/v1/1/lookup.php?i=${
          match.params.id
        }`,
      );
      setDetailsRecipe(details[enterData][0]);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const ingredientsKeys = Object.keys(detailsRecipe)
      .filter((item) => item.includes('Ingredient'));
    const measuresKeys = Object.keys(detailsRecipe)
      .filter((item) => item.includes('Measure'));
    const ingredients = ingredientsKeys
      .map((item) => detailsRecipe[item])
      .filter((item) => item !== '' && item !== null);
    const measures = measuresKeys
      .map((item) => detailsRecipe[item])
      .filter((item) => item !== '' && item !== null);
    setIngredientsFound(ingredients);
    setMeasuresFound(measures);
  }, [detailsRecipe]);

  const addIngredient = (ingredient) => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(initialLocalStorage(ingredient)),
      );
    } else {
      const recipesFound = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let newIngredients;
      const isAlreadyInside = recipesFound[recipeType][match.params.id]
        .some((savedIngredients) => savedIngredients === ingredient);

      if (isAlreadyInside) {
        newIngredients = recipesFound[recipeType][match.params.id]
          .filter((ingredientSaved) => ingredientSaved !== ingredient);
      } else {
        newIngredients = [...recipesFound[recipeType][match.params.id], ingredient];
      }
      const finalObject = {
        ...recipesFound,
        [recipeType]: {
          ...recipesFound[recipeType],
          [match.params.id]: newIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(finalObject));
    }
  };

  const checkDisabled = (ingredient) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const recipesFound = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return recipesFound[recipeType][match.params.id]
        .some((savedIngredients) => savedIngredients === ingredient);
    }
    return false;
  };

  return (
    <div>
      {Object.keys(detailsRecipe).length && (
        <>
          <img
            className="recipe-image"
            src={ `${detailsRecipe[`str${thumbNail}Thumb`]}` }
            alt=""
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{ detailsRecipe[`str${thumbNail}`] }</h2>
          <ShareBtn path={ history.location.pathname } />
          <FavoriteBtn
            cardDetails=""
            recipeType={ title === 'Drinks' ? 'idDrink' : 'idMeal' }
          />
          <p data-testid="recipe-category">{detailsRecipe.strCategory}</p>
          {ingredientsFound.map((ingredient, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingredientFound${index}` }
              key={ `ingredient${index}` }
            >
              <input
                id={ `ingredientFound${index}` }
                type="checkbox"
                onClick={ () => addIngredient(ingredient) }
                defaultChecked={ checkDisabled(ingredient) }
              />
              {`${ingredient} - ${measuresFound[index]}`}
            </label>
          ))}
          <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
        </>
      )}
    </div>
  );
}

RecipeInProgress.propTypes = {
  title: PropTypes.string.isRequired,
  props: PropTypes.shape().isRequired,
};

export default RecipeInProgress;
