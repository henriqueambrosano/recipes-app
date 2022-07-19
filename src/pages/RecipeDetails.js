import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealDetailCard from '../components/MealDetailCard';

function RecipeDetails({ match }) {
  const [recipeDetail, setRecipeDetail] = useState(null);
  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetail(data));
    };
    fetchDetails();
  }, []);

  return (
    // recipeDetail && console.log(recipeDetail)
    recipeDetail && <MealDetailCard cardDetails={ recipeDetail.meals[0] } />
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default RecipeDetails;
