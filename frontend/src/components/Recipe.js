import React, { Component } from 'react';
import logo from '../logo.png';

class Recipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.recipe,
      name: '',
      ingredients: [],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',

    }
  }

componentDidMount(){
  const first = 'http://127.0.0.1:5000/api/recipes/';
  const second = this.state.id;
  const link = first + second;
  fetch(link) 
  .then( response => response.json())
  .then(data=>this.setState({ingredients: data.ingredients ,name: data.name, calories: data.calories, carbs: data.carbs,
    date: data.date_added, prep_time: data.prep_time, prep_steps: data.prep_steps}))
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
    <p>Prep time: {this.state.prep_time}</p>
    <p>Calories: {this.state.calories}</p>
    <p>Carbs: {this.state.carbs}</p>
    <h2>Ingredients</h2>
        <ul>
          {this.state.ingredients.map(ingredient => {
            return <li key={`ingredient-${ingredient.id}`}>{ingredient.name}</li>
          })}
        </ul>
    <h2>Steps: {this.state.prep_steps}</h2>
    <p>Date created: {this.state.date}</p>
  </div>
  </div>)
}

} 
const style = {
  position: "absolute",
  width: "100%",
}
export default Recipe;