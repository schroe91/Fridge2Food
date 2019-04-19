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
	    userId: '',
	    filters: [],
	    sort: '',
	    mealType: '',
	    recipes: [],
	    search: 0,
	    ingredientsNum: 0,
	    searchStr: '',
	    excludeUnmakeable: false
	}
	this.setId = this.setId.bind(this);
	this.doSearch = this.doSearch.bind(this);
	this.doSearch();
	//this.getUserId = this.getUserId.bind(this)
    }

	//Callback function to set numOfRecipes.
	//Sets this.state and sends it to NumOfRecipes.js
	/*setNumOfIngredients(num){
		console.log("callll")
		this.setState({
			ingredientsNum: num
		})
		console.log("parent stuff: " + this.state.ingredientsNum)
	}*/
    setExcludeUnmakeable(val){
	this.setState({excludeUnmakeable: val});
	this.doSearch();
    }
    
	setNumOfRecipes(recipes) {
		const num = recipes.length;
		this.setState({
			numOfRecipes: num,
		})
	}
	setId = (id) => {
		this.setState({ userId: id })
	}
	setFilters = (filters) => {
		this.setState({ filters: filters })
		console.log("Filters:")
		console.log(filters)
	}
	setSort = (sortby) => {
		this.setState({ sort: sortby })
	}
	setMealType = (meal) => {
		this.setState({ mealType: meal })
		console.log("Setting meal type:")
		console.log(meal)
	}
    setRecipes = (recipes) => {
	console.log("Home - setting recipes");
	this.setState({ recipes: recipes})
	//console.log(this.state.recipes);
	//console.log(this.state.search)
	}
    
    setSearchString = (searchStr) => {
	this.setState({searchStr: searchStr});
    }
	setSearch = (search) => {
		this.setState({ search: search })
	}

    	doSearch() {
	    this.state.searchStr.replace(/ /g, "_")
	    //console.log(this.state.value)
	    //console.log('/api/recipes?name=' + this.state.value)
	    var paramCount = 0;
	    var link = '/api/recipes'
	    if(this.state.searchStr.length > 0){
		link += "?name=" + this.state.searchStr;
		paramCount++;
	    }
	    var prefix;
	    if(this.state.filters && this.state.filters.length > 0){
		prefix = (paramCount > 0) ? '&' : '?';
		link += prefix + "type=";
		link += this.state.filters[0];
		for(var i = 1; i<this.state.filters.length; i++){
		    link += "," + this.state.filters[i];
		}
		paramCount++;
	    }
	    console.log("This.props.meal under RecipeSearch");
	    console.log(this.state.meal);
	    if(this.state.meal){
		prefix = (paramCount > 0) ? '&' : '?';
		link += prefix + 'meal=' + this.props.meal;
	    }

	    if(this.state.excludeUnmakeable){
		prefix = (paramCount > 0) ? '&' : '?';
		link += prefix + 'excludeunmakeable=true';
	    }
	    
	    const request = async() => {
		const response = await fetch(link);
		if(response.ok){
		    console.log("Got a response");
		    this.setState({search: 1});
		    const data = await response.json();
		    this.setRecipes(data);

		}
	    }
	    request();
		    /*.then(response =>{ 
		    if(response.ok){
			console.log("Got a response")
			this.setState({search: 1})
			return response.json();
		    }else{
			return Promise.reject(new Error(""));
		    }
		}).then(data => {
		    //console.log(data)
		    this.setState({id: data})
		    this.props.getRecipes(this.state.id, this.state.search)
		    //console.log(this.state.id);
		}, error=> alert(error.toString()))	*/
		
	}

    
	componentDidMount() {
		//Get current username
		fetch("/api/users/current")
			.then(data => this.setState({ userId: data.id }))
	}


    render() {
		return (
			<div id="layout" style={style}>
				<div id="top-border">
					<img src={logo} alt="" id="logo" />
					<h2 id="title"><b>Fridge2Food</b></h2>
					<div id="login">
						<NestedLogin user={this.setId}
							userId={this.props.userId}
						/>
					</div>
				</div>
				<div id="info-panel">
					<div id="ingredients-panel">
						<NumOfIngredients user={this.state.userId} />
					</div>
					<div id="recipe-panel">
						<div id="recipe-search">
							<RecipeSearch getRecipes={this.setRecipes.bind(this)}
								filters={this.state.filters}
		    meal={this.state.mealType}
		    setSearchString = {this.setSearchString.bind(this)}
		    doSearch = {this.doSearch.bind(this)}
			/>
							<div id="filter">
								<RecipeFilter setFilters={this.setFilters.bind(this)}
									setSort={this.setSort.bind(this)}
		                                                        setMeal={this.setMealType.bind(this)}
		    doSearch={this.doSearch.bind(this)}
								/>
							</div>
						</div>
						<div id="recipe-list">
							<RecipeList setNumOfRecipes={this.setNumOfRecipes.bind(this)}
								setSearch={this.setSearch.bind(this)}
								userId={this.state.userId}
								filters={this.state.filters}
								meal={this.state.mealType}
								sort={this.state.sort}
								recipes={this.state.recipes}
		    search={this.state.search}
		    setExcludeUnmakeable = {this.setExcludeUnmakeable.bind(this)}
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
