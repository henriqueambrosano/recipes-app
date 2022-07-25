import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import RecepiesAppContext from '../context/RecepiesAppContext';
import CategoryButtons from '../components/CategoryButtons';
import SearchBar from '../components/SearchBar';

function Drinks({ history }) {
  const { recipesList } = useContext(RecepiesAppContext);
  const [searchBarVisible, setSearchbar] = useState(false);

  let recipes = [];
  recipes = recipesList.drinks
    ? recipesList.drinks.filter((item, index) => index < +'12') : [];
  return (
    <>
      <Header title="Drinks" hasSearchBar history={ history } />
      <CategoryButtons title="Drinks" />
      {searchBarVisible && <SearchBar
        title="Drinks"
        history={ history }
        searchBarVisible={ searchBarVisible }
        setSearchbar={ setSearchbar }
      />}
      {
        recipes.map((item, index) => (
          <Card
            key={ index }
            name={ item.strDrink }
            index={ index }
            image={ item.strDrinkThumb }
            path={ `drinks/${item.idDrink}` }
            history={ history }
          />
        ))
      }
      <Footer history={ history } />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape(),
};

Drinks.defaultProps = {
  history: {},
};

export default Drinks;
