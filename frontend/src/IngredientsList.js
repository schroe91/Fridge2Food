import React from "react";


const form = document.querySelector("#ingredient-form");

const handleSubmit = function(ev) {
	ev.preventDefault();
	const ingredient = ev.target.ingredientInput.value;

	renderIngredient(ingredient);

	ev.target.reset();
}

function renderIngredient(data) {
	const ingredientList = document.querySelector("#ingredient-list");
	const list = document.createElement('dl');
	list.appendChild(data);
	ingredientList.appendChild(list);
}

form.addEventListener('submit', handleSubmit);

class IngredientsList extends React.Component {
	render() {
		return (
			<form id="ingredient-form">
				<p>
					<input
						type="text"
						name="ingredientInput"
						placeholder="Type an ingredient"
					/>
				</p>
			</form>
		);
	}
}

export default IngredientsList;