import React from "react";

class SearchBar extends React.Component {
	render() {
		return (
			<form>
				<p>
					<input
						type="text"
						name="search-input"
						placeholder="Search..."
					/>
				</p>
			</form>
		);
	}
}

export default SearchBar;