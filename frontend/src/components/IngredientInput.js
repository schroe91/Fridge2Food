import React from "react";

class IngredientInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		this.props.funct(this.state.value, 1); //Passes value to IngredientList.js
		//this.AddIngredient();

		//Reset form
		this.setState({
			value: "",
		});
	}

	render() {
		return (
			<div id="ingredientInput">
				<form id="ingredient-form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="ingredientInput"
						placeholder="Type an ingredient"
						value={this.state.value}
						onChange={this.handleChange}
						autoFocus
					/>
				</form>
			</div>
		)
	}
}
export default IngredientInput;