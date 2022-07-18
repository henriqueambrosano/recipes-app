import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DrinkDetails from './pages/DrinkDetails';
import DrinkInProgress from './pages/DrinkInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route
        path="/foods/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route
        path="/drinks/:id/in-progress"
        component={ DrinkInProgress }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
