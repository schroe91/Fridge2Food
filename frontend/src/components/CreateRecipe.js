import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';
import Inputs from "./Inputs"

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: '',
      ingredients: [{name:"", amount:""}],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',
      cats: [{ingredient:"", amount:""}],
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

  /*componentDidMount() {
    const first = '/api/recipes/';
    const second = this.state.id;
    const link = first + second;
    fetch(link)
      .then(response => response.json())
      .then(data => this.setState({
        ingredients: data.ingredients, name: data.name, calories: data.calories, carbs: data.carbs,
        date: data.date_added, prep_time: data.prep_time, prep_steps: data.prep_steps
      }))
  }*/
  handleChange = (e) => {
    if (["name", "age"].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ cats }, () => console.log(this.state.cats))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
addIngredient = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, {ingredient:"", amount:""}],
    }));
  }
handleSubmit = (e) => { e.preventDefault() }
  render() {
    let {recipe, calories, carbs, prep_time, cats, prep_steps} = this.state
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
        
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        
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
        <Inputs cats={cats} />
        <br></br>
        <div><label htmlFor="prep_steps">Instructions</label> 
        <input type="text" size="22" name="prep_steps" id="prep_steps" value={prep_steps} /></div>
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

const pageStyle = {
  display: "flex",
}