import React, { Component } from 'react';
import logo from '../logo.png';
import Converters from "./Converters";
import { NavLink } from 'react-router-dom';
import "./Substitution.css"

class Substitution extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
						<button className="button" id="backB"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
					</div>
        </div>
        <div id="subs">
          <h3>Common Ingredient Substitutions</h3>
          <h2>Eggs:</h2>
          <p>1 egg = ¼ cup applesauce</p>
          <p>1 egg = 1 tablespoons ground flaxseed + 3 tablespoons water</p>
          <p>1 egg = ¼ cup silken tofu pureed</p>
          <p>1 egg = 3 tablespoons mayonnaise</p>
          <p>1 egg = ½ banana mashed with ½ teaspoon baking powder</p>
          <h2>Butter:</h2>
          <p>1 cup salted butter = 1 cup margarine</p>
          <p>1 cup salted butter = 1 cup vegetable shortening + ½ teaspoon salt</p>
          <p>1 cup salted butter = 7/8 cup lard + ½ teaspoon salt</p>
          <p>1 cup unsalted butter = 1 cup salted butter = 1 cup vegetable shortening = 1 cup lard *minus* ½ teaspoon salt from recipe</p>
          <h2>Baking Powder:</h2>
          <p>1 teaspoon baking powder = ¼ teaspoon baking soda + ½ teaspoon cream of tartar + ¼ teaspoon cornstarch</p>
          <h2>Milk:</h2>
          <p>1 cup whole milk = ½ cup evaporated milk + ½ cup water</p>
          <p>whole milk = 1 cup skim milk + 2 tablespoons melted butter or margarine</p>
          <h2>Sour Cream:</h2>
          <p>1 cup sour cream = 1 cup plain yogurt</p>
          <h2>Yeast:</h2>
          <p>1 envelope (¼-ounce) active dry yeast = 2¼ teaspoons active dry yeast</p>
          <p>1 envelope (¼-ounce) active dry yeast = 2¼ teaspoons rapid-rise yeast</p>
          <p>1 envelope (¼-ounce) active dry yeast = ⅓ of a 2-ounce cake yeast</p>
          <h2>Cream Cheese:</h2>
          <p>1 cup ricotta cheese or 1 cup lowfat cottage cheese, beaten until smooth</p>
          <h2>Honey:</h2>
          <p>1 1/4 cups sugar + 1/4 cup liquid (use liquid called for in recipe)</p>
          <h2>Mayonnaise</h2>
          <p>1 cup Sour cream or plain yogurt</p>
          <h2>Shortening</h2>
          <p>1 cup Butter or margarine</p>
          <Converters />
        </div>
      </div>
    )
  }

}
const style = {
  position: "absolute",
  width: "100%",
}
export default Substitution;