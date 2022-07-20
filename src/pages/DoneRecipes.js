import React from 'react';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" hasSearchBar={ false } />
      <CategoryButtons title="Done Recipes" />
      Conteudo
    </>
  );
}

export default DoneRecipes;
