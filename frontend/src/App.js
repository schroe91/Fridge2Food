import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import IngredientsList from "./components/IngredientsList"
import NestedLogin from './components/nested.js'
import RecipeSearch from './components/RecipeSearch'
import NumOfIngredients from './components/NumOfIngredients'
import NumOfRecipes from './components/NumOfRecipes'

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
            <IngredientsList />
            <NumOfIngredients />
          </div>
          <div id="recipe-panel">
            <RecipeSearch />
            <NumOfRecipes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;