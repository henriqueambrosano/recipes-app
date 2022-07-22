import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useDetailRecipe from '../hooks/useDetailRecipe';
import useIngredientsMeasures from '../hooks/useIngredientsMeasures';

function RecipeInProgress({ props: { history, match }, title }) {
  const { detailsRecipe } = useDetailRecipe(match, title);
  const [endBtn, setEndBtn] = useState(true);
  const { ingredientsFound, measuresFound } = useIngredientsMeasures(detailsRecipe);

  const thumbNail = title === 'Drinks' ? 'Drink' : 'Meal';
  const mealType = title === 'Drinks' ? 'drink' : 'food';
  const recipeType = title === 'Drinks' ? 'cocktails' : 'meals';

  const initialLocalStorage = (ingredient) => (
    title === 'Drinks'
      ? { cocktails: { [match.params.id]: [ingredient] }, meals: {} }
      : { cocktails: { }, meals: { [match.params.id]: [ingredient] } }
  );

  const endRecipe = () => {
    if (localStorage
      .getItem('inProgressRecipes') && JSON
      .parse(localStorage.getItem('inProgressRecipes'))[recipeType][match.params.id]) {
      setEndBtn(JSON.parse(localStorage
        .getItem('inProgressRecipes'))[recipeType][match.params.id]
        .length !== ingredientsFound.length);
      console.log(JSON.parse(localStorage
        .getItem('inProgressRecipes'))[recipeType][match.params.id]
        .length);
    } else {
      setEndBtn(true);
    }
  };

  useEffect(() => {
    endRecipe();
  }, [ingredientsFound]);

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
    endRecipe();
  };

  const checkDisabled = (ingredient) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const recipesFound = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return recipesFound[recipeType][match.params.id]
        .some((savedIngredients) => savedIngredients === ingredient);
    }
    return false;
  };

  const saveDoneRecipe = () => {
    const recipeToSave = {
      id: detailsRecipe[`id${thumbNail}`],
      nationality: detailsRecipe.strArea ? detailsRecipe.strArea : '',
      name: detailsRecipe[`str${thumbNail}`],
      category: detailsRecipe.strCategory,
      doneDate: new Date().toDateString(),
      image: detailsRecipe[`str${thumbNail}Thumb`],
      alcoholicOrNot: detailsRecipe.strAlcoholic ? detailsRecipe.strAlcoholic : '',
      type: mealType,
      tags: detailsRecipe.strTags ? detailsRecipe.strTags
        .replace(',', '').split(' ').slice(0, 2) : [''],
    };

    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes'))];
      const alreadyExist = doneRecipes
        .some((item) => item.id === detailsRecipe[`id${thumbNail}`]);
      if (!alreadyExist) {
        doneRecipes.push(recipeToSave);
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      }
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeToSave]));
    }
    history.push('/done-recipes');
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
            cardDetails={ detailsRecipe }
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
              {`${ingredient} - ${measuresFound[index]}`.replace('- undefined', '')}
            </label>
          ))}
          <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ endBtn }
            onClick={ saveDoneRecipe }
          >
            Finalizar receita

          </button>
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
