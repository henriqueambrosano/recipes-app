export const checkErrors = (data, isItMeal, alertMessage, history) => {
  if (data === undefined || data[isItMeal] === null) {
    alertMessage();
  } else if (data) {
    if (!data[isItMeal]) {
      alertMessage();
    }
    if (data[isItMeal] && data[isItMeal].length === 1) {
      if (isItMeal === 'drinks') {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      } else {
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
    }
  }
};

export const add = '';

export const isItDrinkF = (title) => (
  title === 'Drinks' ? 'thecocktaildb' : 'themealdb'
);

export const isItMealF = (title) => (
  title === 'Drinks' ? 'drinks' : 'meals'
);
