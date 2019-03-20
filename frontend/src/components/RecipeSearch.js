import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	
		this.handleChange = this.handleChange.bind(this);
		this.Search = this.Search.bind(this);
	  }
	
	handleChange(event) {
	    this.setState({value: event.target.value});
	    this.Search();
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
			<form>
				<input
					className="py-2"
					type="text"
					name="search-input"
					placeholder="Search for recipe"
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default SearchBar;