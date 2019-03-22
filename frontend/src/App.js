import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Recipe from './components/Recipe'
import Userpage from './components/Userpage'
import Home from './components/Home'


class App extends Component {
  render() {
    return (
      <div id="layout">
        <Router>
          <Route path="/recipe/:recipe" exact strict component={Recipe} />
          <Route path="/" exact strict component={Home} />
          <Route path="/user/:id" exact strict component={Userpage} />
        </Router>
      </div>
    );
  }
}

export default App;