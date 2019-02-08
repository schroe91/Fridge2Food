import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <body id="background">
        <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
        </div>
      </body>
    );
  }
}

export default App;
