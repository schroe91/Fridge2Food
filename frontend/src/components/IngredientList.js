import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import NewIngredients from "./NewIngredient";
import './IngredientList.css'

class IngredientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			name: "",
			numOfIngredients: 0,
		}
		this.AddIngredient = this.AddIngredient.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
	}

	AddIngredient() {
    fetch('http://127.0.0.1:5000/api/users/<int:id>/ingredients', {
        method: "POST",
        body: JSON.stringify(this.state.name)
    }).then( response => response.ok )
	}

deleteIngredient(){
	fetch('http://127.0.0.1:5000/api/users/<int:id>/ingredients<int:ing_id>', {
        method: "DELETE",
        body: JSON.stringify(this.state.name)
    }).then( response => response.ok )
}

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		//Only update list if ingredient is not already in there
		if(this.state.list.indexOf(this.state.value) === -1) {
			this.state.list.unshift(this.state.value);
			this.props.funct(1); //Passes value to NumOfIngredients.js
			this.state.name = this.state.value;
			this.AddIngredient();
		}

		//Reset form
		this.setState({
			value: "",
			numOfIngredients: this.state.numOfIngredients + 1
		});
	}

	handleDelete(item) {
		const newState = this.state;
		let i = this.state.list.indexOf(item);

		if(i > -1) {
			newState.list.splice(i, 1);
			newState.numOfIngredients -= 1;
			this.props.funct(-1); //Passes value to NumOfIngredients.js
			this.setState(newState);
			this.deleteIngredient();
		}
	}

	handleDeleteAll() {
		const newState = this.state;
		const numToDel = newState.numOfIngredients;
		newState.list = [];
		newState.numOfIngredients = 0;
		this.props.funct("delAll", numToDel); //Passes value to NumOfIngredients.js
		this.setState(newState);
	}

	render() {
		return (
			<div id="ingredientInput">
				<form id="ingredient-form" onSubmit={this.handleSubmit} style={form}>
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
								style={delButton}
								onClick={() => {this.handleDelete(item)}}>
								<i class="fa fa-times"></i>
							</button>
						</li>
					))}
				</ul>
				<div style={delAll}>
				<button
					onClick={() => {this.handleDeleteAll()}}>
					Delete All
				</button>
				</div>
				<NewIngredients />
			</div>
		)
	}
}

export default IngredientList

const delButton = {
	backgroundColor: 'transparent',
    border: '0',
    color: "#c20",
		outline: 'none',
}

const delAll = {
	textAlign: "center",
	marginTop: "10px",
	paddingLeft: "n12px"
}

const form = {
	marginTop: "20px",
	paddingLeft: "15px",
}
