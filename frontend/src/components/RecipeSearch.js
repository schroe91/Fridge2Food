import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			search: 0,
			id: []
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
		this.state.value.replace(/ /g, "_")
		//console.log(this.state.value)
		//console.log('/api/recipes?name=' + this.state.value)
		var link = '/api/recipes?name=' + this.state.value;
		if(this.props.filters && this.props.filters.length > 0){

		}
		if(this.props.meal){
			link += '&meal=' + this.props.meal;
		}
		fetch(link)	
		.then(response =>{ 
			if(response.ok){
					console.log("Got a response")
					this.setState({search: 1})
					return response.json();
			}else{
					return Promise.reject(new Error("Not a recipe"));
			}
		}).then(data => {
			//console.log(data)
			this.setState({id: data})
			this.props.getRecipes(this.state.id, this.state.search)
			//console.log(this.state.id);
		}, error=> alert(error.toString()))	
		
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
					style={{height: "42px"}}
				/>
			</form>
		);
	}
}

export default SearchBar;
