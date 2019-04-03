import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			recipe: '',
			id: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Search = this.Search.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.Search();
		this.setState({ value: "" });
	}

	Search() {
		fetch('/api/recipes?name=' + this.state.value)
		.then(response =>{ 
			if(response.ok){
					//this.setState({isAuth : true})
								return response.json();
			}else{
					return Promise.reject(new Error("Not a recipe"));
			}
				}).then(data => {
			this.setState({id: data.id})
				}, error=> alert(error.toString()))
					
			if(this.state.id > 0){
			window.open("/recipe/" + this.state.id);
			}
			//this.props.getRecipe(this.state.recipe)
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					className="py-2"
					type="text"
					name="search-input"
					placeholder="Search for recipe"
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</form>
		);
	}
}

export default SearchBar;
