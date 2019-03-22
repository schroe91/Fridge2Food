import React, { Component } from 'react';
import '../App.css';

import logo from '../logo.png';

import RecipeList from "./RecipeList"
import NestedLogin from './nested.js'
import RecipeSearch from './RecipeSearch'

import NumOfIngredients from './NumOfIngredients'
import NumOfRecipes from './NumOfRecipes'
import RecipeFilter from './recipefilter'

class Home extends Component {
	constructor(){
		super();
		this.state= {
			numOfRecipes : 0
		}
	}

	//Callback function to set numOfRecipes.
	//Sets this.state and sends it to NumOfRecipes.js
	setNumOfRecipes(recipes) {
		const num = recipes.length;
		this.setState({
			numOfRecipes : num
		})
	}

	render() {
		return (
			<div id="layout" style={style}>
				<div id="top-border">
					<img src={logo} alt="" id="logo" />
					<h2 id="title"><b>Fridge2Food</b></h2>
					<div id="login">
						<NestedLogin />
					</div>
				</div>
				<div id="info-panel">
					<div id="ingredients-panel">
						<NumOfIngredients />
					</div>
					<div id="recipe-panel">
						<div id="recipe-search">
							<RecipeSearch />
							<div id="filter">
								<RecipeFilter />
								<div id="numRecipes">
									<NumOfRecipes numOfRecipes={this.state.numOfRecipes}/>
								</div>
							</div>
						</div>
						<div id="recipe-list">
							<RecipeList setNumOfRecipes={this.setNumOfRecipes.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Home;

const style = {
  position: "absolute",
  width: "100%",
}