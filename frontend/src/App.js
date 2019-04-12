import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Recipe from './components/Recipe'
import Userpage from './components/Userpage'
import Home from './components/Home'
import Substitution from './components/Substitution'
import CreateRecipe from './components/CreateRecipe'
import forkRecipe from './components/forkRecipe'
import PopularRecipes from './components/PopularRecipes'


class App extends Component {
  render() {
    return (
      <div id="layout">
        <Router>
          <Route path="/recipe/:recipe" exact strict component={Recipe} />
          <Route path="/" exact strict component={Home} />
          <Route path="/user" exact strict component={Userpage} />
          <Route path="/substitutions" exact strict component={Substitution}/>
          <Route path="/createRecipe" exact strict component={CreateRecipe}/>
          <Route path="/forkRecipe/:id" exact strict component={forkRecipe}/>
          <Route path="/mostPopular" exact strict component={PopularRecipes}/>
        </Router>
      </div>
    );
  }
}

export default App;
