import React from "react";

class SearchBar extends React.Component {
	render() {
		return (
			<form>
				<input
					className="py-2"
					type="text"
					name="search-input"
					placeholder="Search for recipe"
				/>
			</form>
		);
	}
}

export default SearchBar;