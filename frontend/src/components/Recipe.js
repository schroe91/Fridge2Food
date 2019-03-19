import React, { Component } from 'react';


class Recipe extends Component {
  constructor(){
    super();
    this.state = {
      recipe: [],
    }
  }

componentDidMount(){
  fetch('http://127.0.0.1:5000/api/ingredients/1') 
  .then( response => response.json())
  .then(data=>this.setState({recipe: data.name}));
}

render(){
  const {recipe} = this.state;
  return( 
  <div>
    <h1>Your recipe is eggs</h1>
    {this.state.recipe}
  </div>)
}

} 
export default Recipe;