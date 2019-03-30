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
          <h2>Common Ingredient Substitutions</h2>
          <h3>Eggs:</h3>
          <p>1 egg = ¼ cup applesauce</p>
          <p>1 egg = 1 tablespoons ground flaxseed + 3 tablespoons water</p>
          <p>1 egg = ¼ cup silken tofu pureed</p>
          <p>1 egg = 3 tablespoons mayonnaise</p>
          <p>1 egg = ½ banana mashed with ½ teaspoon baking powder</p>
          <h3>Butter:</h3>
          <p>1 cup salted butter = 1 cup margarine</p>
          <p>1 cup salted butter = 1 cup vegetable shortening + ½ teaspoon salt</p>
          <p>1 cup salted butter = 7/8 cup lard + ½ teaspoon salt</p>
          <p>1 cup unsalted butter = 1 cup salted butter = 1 cup vegetable shortening = 1 cup lard *minus* ½ teaspoon salt from recipe</p>
          <h3>Baking Powder:</h3>
          <p>1 teaspoon baking powder = ¼ teaspoon baking soda + ½ teaspoon cream of tartar + ¼ teaspoon cornstarch</p>
          <h3>Milk:</h3>
          <p>1 cup whole milk = ½ cup evaporated milk + ½ cup water</p>
          <p>whole milk = 1 cup skim milk + 2 tablespoons melted butter or margarine</p>
          <h3>Sour Cream:</h3>
          <p>1 cup sour cream = 1 cup plain yogurt</p>
          <h3>Yeast:</h3>
          <p>1 envelope (¼-ounce) active dry yeast = 2¼ teaspoons active dry yeast</p>
          <p>1 envelope (¼-ounce) active dry yeast = 2¼ teaspoons rapid-rise yeast</p>
          <p>1 envelope (¼-ounce) active dry yeast = ⅓ of a 2-ounce cake yeast</p>
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