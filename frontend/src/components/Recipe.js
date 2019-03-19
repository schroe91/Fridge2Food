import React, { Component } from 'react';
import logo from '../logo.png';

class Recipe extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      ingredients: [],
    }
  }

componentDidMount(){
  fetch('http://127.0.0.1:5000/api/recipes/2') 
  .then( response => response.json())
  .then(data=>this.setState({ingredients: data.ingredients ,name: data.name}))
}

render(){
  return( 
    <div id="layout" style={style}>
      <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
      </div>
    
  <div>
    <h2>Recipe: {this.state.name}</h2>
    <h2>Ingredients</h2>
        <ul>
          {this.state.ingredients.map(ingredient => {
            return <li key={`ingredient-${ingredient.id}`}>{ingredient.name}</li>
          })}
        </ul>
  </div>
  </div>)
}

} 
const style = {
  position: "absolute",
  width: "100%",
}
export default Recipe;