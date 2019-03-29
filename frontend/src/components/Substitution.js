import React, { Component } from 'react';
import logo from '../logo.png';
import Converters from "./Converters";
import { NavLink } from 'react-router-dom';

class Substitution extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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

  render() {
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
						<button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
					</div>
        </div>
        <div>
          <h3>This is the Substitution page</h3>
        </div>
        <Converters />
      </div>
    )
  }

}
const style = {
  position: "absolute",
  width: "100%",
}
export default Substitution;