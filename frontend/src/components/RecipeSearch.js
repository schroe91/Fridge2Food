import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			recipes: [],
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
		var list = [];
		fetch('/api/recipes', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(response => response.json)
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
