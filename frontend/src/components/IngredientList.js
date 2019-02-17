import React from "react"
import ListGroup from "react-bootstrap/ListGroup"

class IngredientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		//Reset form
		this.setState({
			value: ""
		});
	}

	render() {
		return (
			<div>
				<ListGroup variant="flush">
					<ListGroup.Item>Chicken</ListGroup.Item>
				</ListGroup>
				<form id="ingredient-form" onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="ingredientInput"
							placeholder="Type an ingredient"
							value={this.state.value}
							onChange={this.handleChange}
						/>
				</form>
				<ul>
					
				</ul>
			</div>
		)
	}
}

export default IngredientList