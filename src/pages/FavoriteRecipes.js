import React from 'react';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" hasSearchBar={ false } />
      <CategoryButtons title="Favorite Recipes" />
      Conteudo
    </>
  );
}

export default FavoriteRecipes;
