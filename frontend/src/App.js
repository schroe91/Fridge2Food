import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import RecipeList from "./components/RecipeList";
import IngredientsList from "./components/IngredientsList";
import NestedLogin from './components/nested.js'
import SearchBar from './components/SearchBar.js'
import IngredientsChecklist from './components/IngredientsChecklist';
import RecipeSearch from './components/RecipeSearch';

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
        <IngredientsList />
        <SearchBar />
        <RecipeSearch />
        <IngredientsChecklist />
        <RecipeList />
      </div>
    );
  }
}

export default App;