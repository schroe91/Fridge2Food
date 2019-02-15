import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import IngredientsList from "./components/IngredientsList"
import NestedLogin from './components/nested.js'
import RecipeSearch from './components/RecipeSearch'
import IngredientCheckList from './components/IngredientChecklist'

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
          <IngredientsList />
          <RecipeSearch />
        </div>
        <IngredientCheckList />
      </div>
    );
  }
}

export default App;