import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Search = this.Search.bind(this);
	  }
	
	handleChange(event) {
	    this.setState({value: event.target.value});
	    this.Search();
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({value: ""});
	}

	Search() {
		fetch('http://127.0.0.1:5000//recipes/<int:id>', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then( response => response.ok )
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