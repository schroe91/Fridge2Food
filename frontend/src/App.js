import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

import RecipeList from "./components/RecipeList"
import NestedLogin from './components/nested.js'
import RecipeSearch from './components/RecipeSearch'

import NumOfIngredients from './components/NumOfIngredients'
import NumOfRecipes from './components/NumOfRecipes'
import RecipeFilter from './components/recipefilter'
//import SearchBar from './components/SearchBar'


import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Recipe from './components/Recipe'


const Home = () => {
  //render(){
  return(
    <div id="layout" style={style}>
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
    <div id="recipe-panel">
      <div id="recipe-search">
        <RecipeSearch />          
        <RecipeFilter />
      <div id="numRecipes">
        <NumOfRecipes />
      </div>
      </div>
    <div id="recipe-list">
      <RecipeList />
    </div>
    </div>
    </div>
    </div>)
}

class App extends Component {
  render() {
    return (
      <div id="layout" style={style}>
        <Router>
          <Route path="/recipe/:recipe" exact strict component={Recipe}/>
          <Route path="/" exact strict component={Home}/>
        </Router>
        
      </div>
    );
  }
}

export default App;

const style = {
  position: "absolute",
  width: "100%",
}