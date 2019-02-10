import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import IngredientsList from "./IngredientsList";

class App extends Component {
  render() {
    return (
      <div id="layout">
        <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
        </div>
        <IngredientsList />
      </div>
    );
  }
}

export default App;