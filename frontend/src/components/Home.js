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
	constructor() {
		super();
		this.state = {
			numOfRecipes: 0,
			userId:'',
			filters: [],
			sort: '',
			mealType: '',
			recipes: [],
			search: 0
		}
		this.setId = this.setId.bind(this) 
	}

	//Callback function to set numOfRecipes.
	//Sets this.state and sends it to NumOfRecipes.js
	setNumOfRecipes(recipes) {
		const num = recipes.length;
		this.setState({
			numOfRecipes: num,
		})
	}
	setId = (id) => {
		this.setState({userId : id})
	}
	setFilters = (filters) =>{
		this.setState({filters: filters})
	}
	setSort = (sortby) =>{
		this.setState({sort: sortby})
	}
	setMealType = (mealtype) =>{
		this.setState({mealType:mealtype})
	}
	setRecipes = (recipes, search) => {
		this.setState({recipes: recipes, search:search})
		console.log(this.state.recipes);
		console.log(this.state.search)
	}

	setSearch = (search) => {
		this.setState({search: search})
	}

	componentDidMount() {
		//Get current username
    fetch("/api/users/current")
      .then(data => this.setState({userId: data.id}))
	}

	render() {
		return (
			<div id="layout" style={style}>
				<div id="top-border">
					<img src={logo} alt="" id="logo" />
					<h2 id="title"><b>Fridge2Food</b></h2>
					<div id="login">
						<NestedLogin/>
					</div>
				</div>
				<div id="info-panel">
					<div id="ingredients-panel">
						<NumOfIngredients user={this.state.userId}/>
					</div>
					<div id="recipe-panel">
						<div id="recipe-search">
							<RecipeSearch getRecipes = {this.setRecipes.bind(this)}
							filters = {this.state.filters}
							meal = {this.state.mealType}/>
							<div id="filter">
								<RecipeFilter setFilters = {this.setFilters.bind(this)}
								setSort = {this.setSort.bind(this)}
								setMeal = {this.setMealType.bind(this)}
								/>
							</div>
						</div>
						<div id="recipe-list">
							<RecipeList setNumOfRecipes={this.setNumOfRecipes.bind(this)} 
							setSearch = {this.setSearch.bind(this)}
							userId = {this.state.userId}
							filters = {this.state.filters}
							meal = {this.state.mealType}
							sort = {this.state.sort}
							recipes = {this.state.recipes}
							search = {this.state.search}
							/>
						</div>
					</div>
					<div id="numRecipes">
						<NumOfRecipes numOfRecipes={this.state.numOfRecipes} />
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