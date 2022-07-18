import { useEffect, useContext } from 'react';
import RecepiesAppContext from '../context/RecepiesAppContext';

// const useDefaultList = (type, ingredient) => {
const useDefaultList = () => {
  const { setRecipes } = useContext(RecepiesAppContext);
  useEffect(() => {
    const ingredientsList = async () => {
      fetch('www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRecipes(data);
        });
    };
    ingredientsList();
  }, []);
};

export default useDefaultList;
