import React from "react";

class IngredientsSearch extends React.Component {
	render() {
		return (
			<form>
				<p>
					<input
						type="text"
						name="ingredients-input"
						placeholder="Type an ingredient"
					/>
				</p>
			</form>
		);
	}
}

export default IngredientsSearch;