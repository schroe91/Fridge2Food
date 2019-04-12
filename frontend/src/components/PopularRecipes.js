import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';


class  PopularRecipes extends Component {
    constructor(props) {
      super(props);
      this.state = {
        recipe: '',
        name: '',
        modal: false,
        ingredients: [{name:""}],
        calories: '',
        carbs: '',
        date: '',
        prep_time: '',
        prep_steps: '',
        recipeIMG_url: '',
      }
    }
    componentDidMount() {
        fetch('/api/recipes/1')
          .then(response => response.json())
          .then(data => {
            this.setState({
                ingredients: data.ingredients, name: data.name, calories: data.calories, carbs: data.carbs,
                date: data.date_added, prep_time: data.prep_time, prep_steps: data.prep_steps
            })
            console.log(this.state.ingredients)
          })
      }
  
    render() {
      return (
        <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
				<button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
                <button className="button" id="login"><NavLink exact to="/user" activeClassName="active">Back</NavLink></button>
          </div>
        </div>
        <h2>Most popular recipes:</h2>
        </div>
      )
    }
  
  }
  const style = {
    position: "absolute",
    width: "100%",
  }
  export default PopularRecipes;