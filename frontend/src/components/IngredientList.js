import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import 'font-awesome/css/font-awesome.min.css';
import { StyleSheet, css } from 'aphrodite'

class IngredientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			numOfIngredients: 0,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		//Only update list if ingredient is not already in there
		if(this.state.list.indexOf(this.state.value) === -1) {
			this.state.list.unshift(this.state.value);
			this.numOfIngredients++;
		}

		//Reset form
		this.setState({
			value: ""
		});
	}

	handleDelete(item) {
		let i = this.state.list.indexOf(item);

		if(i > -1)
			this.state.list.splice(i, 1);
	}

	handleDeleteAll() {
		this.setState = {
			list: [],
			numOfIngredients: 0
		};
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
							autoFocus
						/>
				</form>
				<ul id="template">
					{this.state.list.map((item) => (
						<li>
							{item}
							<button 
								className={css(styles.deleteButton)}
								onClick={() => {this.handleDelete(item)}}>
								<i class="fa fa-times"></i>
							</button>
						</li>
					))}
				</ul>
				<button onClick={() => {this.handleDeleteAll()}}>Delete All</button>
			</div>
		)
	}
}

export default IngredientList

const styles = StyleSheet.create({
	deleteButton: {
    backgroundColor: 'transparent',
    border: '0',
    color: "#c20",
    cursor: 'pointer',
    outline: 'none',
  }
})