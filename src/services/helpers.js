export const checkErrors = (data, isItMeal, alertMessage, history) => {
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

export const add = '';

export const isItDrinkF = (title) => {
  console.log(title);
  return title === 'Drinks' ? 'thecocktaildb' : 'themealdb';
};

export const isItMealF = (title) => {
  console.log(title);
  return title === 'Drinks' ? 'drinks' : 'meals';
};
