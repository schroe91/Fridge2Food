import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';
import "./Converters.css";

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: '',
      name: '',
      ingredients: [{name:""}],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
  }

  createRecipe(recipe, ingredients, calories, carbs, date, prep_time, prep_steps){
    fetch('/api/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: recipe, ingredients: ingredients, calories: calories, carbs: carbs, date: date,
                            prep_time: prep_time, prep_steps: prep_steps})
    }).then(response => response.ok).then(success => (success ? alert("Recipe Successfully created") : alert("Failed to create recipe")))
  }
  
  handleIngredientNameChange = idx => evt => {
    console.log(this.state.ingredients);
    const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredients: newIngredient });
  };
  handleSubmit = evt => {
    const { name, ingredients } = this.state;
    alert(`Incorporated: ${name} with ${ingredients.length} shareholders`);
  };
    handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: "" }])
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

handleSubmit2 = (e) => { 
  e.preventDefault();
  const {recipe, ingredients, calories, carbs, date, prep_time, prep_steps } = this.state;
  this.createRecipe(recipe, ingredients, calories, carbs, date, prep_time, prep_steps);

}
  render() {
    let {recipe, calories, carbs, prep_time, prep_steps} = this.state
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
						<button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
		  </div>
        </div>
        <h2>Create New Recipe</h2>
        
        <form onSubmit={this.handleSubmit2} onChange={this.handleChange} >
        
        <div><label htmlFor="recipe">Recipe Name</label> 
        <input type="text" name="recipe" id="recipe" value={recipe} /></div>
        <br></br>
        <div><label htmlFor="calories">Calories</label> 
        <input type="text" name="calories" id="calories" value={calories} /></div>
        <br></br>
        <div><label htmlFor="carbs">Carbs</label> 
        <input type="text" name="carbs" id="carbs" value={carbs} /></div>
        <br></br>
        <div><label htmlFor="preptime">Prep Time</label> 
        <input type="text" name="prep_time" id="prep_time" value={prep_time} /></div>
        <br></br>
        <div><button onClick={this.addIngredient}>Add new new Ingredient</button></div>
        <br></br>
        
        {this.state.ingredients.map((ingredient, idx) => (
          <div className="ingredient">
            <input
              type="text"
              placeholder={`Ingredient ${idx + 1}`}
              value={ingredient.name}
              onChange={this.handleIngredientNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveIngredient(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddIngredient}
          className="small"
        >
          Add Ingredient
        </button>



        <br></br>
        <div><label htmlFor="prep_steps">Instructions:</label> 
        </div>
        <div><textarea  name="prep_steps" cols="60" rows="8" id="prep_steps" value={prep_steps}></textarea></div>
        <input type="submit" value="Submit" /> 
        </form>
        
      </div>
    )
  }

}
export default CreateRecipe;

const style = {
  position: "absolute",
  width: "100%",
}
