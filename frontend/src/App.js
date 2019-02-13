import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import IngredientsList from "./components/IngredientsList";
import NestedLogin from './components/nested.js'
import NewUser from './components/NewUser.js'
import SearchBar from './components/SearchBar.js'

class App extends Component {
  render() {
    return (
      <div id="layout">
        <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
            <NestedLogin />
            <NewUser />
          </div>
        </div>
        <IngredientsList />
        <SearchBar />
      </div>
    );
  }
}

export default App;