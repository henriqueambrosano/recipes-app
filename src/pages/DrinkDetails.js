import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinkDetailCard from '../components/DrinkDetailCard';

function DrinkDetails({ match }) {
  const [recipeDetail, setRecipeDetail] = useState(null);
  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetail(data));
    };
    fetchDetails();
  }, []);

  return (
    recipeDetail && <DrinkDetailCard cardDetails={ recipeDetail.drinks[0] } />
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DrinkDetails;
