import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import RecipeList from "./components/RecipeList"
import NestedLogin from './components/nested.js'
import RecipeSearch from './components/RecipeSearch'

import NumOfIngredients from './components/NumOfIngredients'
import NumOfRecipes from './components/NumOfRecipes'
import NewIngredient from './components/NewIngredient'

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
            <NumOfIngredients />
          </div>
          </div>
          <div id="recipe-panel">
            <div id="num-of-recipes">
              <NumOfRecipes />
            </div>
            <div id="recipe-search">
              <RecipeSearch />
            </div>
            <div id="recipe-list">
              <RecipeList />
            </div>
            </div>
            <div id="newIng">
              <NewIngredient />
            </div>
      </div>
    );
  }
}

export default App;