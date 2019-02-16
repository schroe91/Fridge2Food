import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import IngredientsSearch from "./components/IngredientsSearch"
import RecipeList from "./components/RecipeList"
import NestedLogin from './components/nested.js'
import RecipeSearch from './components/RecipeSearch'

import NumOfIngredients from './components/NumOfIngredients'
import NumOfRecipes from './components/NumOfRecipes'
import IngredientCheckList from './components/IngredientChecklist'
import IngredientList from './components/IngredientList';

class App extends Component {
  render() {
    return (
      <div id="layout">
        <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
            <NestedLogin />
          </div>
        </div>
        <div id="info-panel">
          <div id="ingredients-panel">
            <IngredientsSearch />
            <NumOfIngredients />
            <div id="ingredient-checklist">
            <IngredientCheckList />
            </div>
            <div id="ingredient-list">
            <h3>Current Ingredients</h3>
            <div id="ingredients">
              <IngredientList />
            </div>
            </div>
          </div>
          <div id="recipe-panel">
            <RecipeSearch />
            <div id="num-of-recipes">
            <NumOfRecipes />
            <RecipeList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;