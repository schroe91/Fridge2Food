import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import './IngredientList.css'
import IngredientChecklist from "./IngredientChecklist";
import IngredientInput from "./IngredientInput";

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
		this.deleteAll = this.deleteAll.bind(this);
	}

	AddIngredient() {
		fetch('http://127.0.0.1:5000/api/users/<int:id>/ingredients', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.name)
		}).then(response => response.ok)
	}

	deleteIngredient() {
		fetch('http://127.0.0.1:5000/api/users/<int:id>/ingredients<int:ing_id>', {
			method: "DELETE",
			body: JSON.stringify(this.state.name)
		}).then(response => response.ok)
	}

	deleteAll() {
		fetch('http://127.0.0.1:5000/api/users/<int:user_id>/ingredients', {
			method: "DELETEALL",
		}).then(response => response.ok)
	}

	handleChange(ev) {
		this.setState({ value: ev.target.value });
	}

	handleSubmit(ingredient) {
		//Only update list if ingredient is not already in there
		if (this.state.list.indexOf(ingredient) === -1) {
			const newState = this.state;
			newState.list.unshift(ingredient);
			//this.props.funct(1); //Passes value to NumOfIngredients.js
			newState.name = ingredient;
			this.setState(newState);
			this.AddIngredient();
		}
		this.props.setNumOfIngredients(this.state.list);
		//Reset form
		this.setState({
			value: "",
			numOfIngredients: this.state.numOfIngredients + 1
		});
	}

	handleDelete(item) {
		const newState = this.state;
		let i = this.state.list.indexOf(item);

		if (i > -1) {
			newState.list.splice(i, 1);
			newState.numOfIngredients -= 1;
			this.state.name = this.state.value;
			this.setState(newState);
			this.deleteIngredient();
			this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
		}
	}

	handleDeleteAll() {
		const newState = this.state;
		//const numToDel = newState.numOfIngredients;
		newState.list = [];
		newState.numOfIngredients = 0;
		this.setState(newState);
		this.deleteAll();
		this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
	}

	/* Updates ingredient list whenever an ingredient is added/removed.
	 *@param ingredient	The ingredient to be added/removed.
	 *@param del				0 if ingredient is to be removed, 1 if it is to be added.
	 */
	updateList(ingredient, del) {
		if (del === 0) {
			this.handleDelete(ingredient);
		} else {
			this.handleSubmit(ingredient);
		}
		this.props.setNumOfIngredients(this.state.list);
	}

	render() {
		return (
			<div style={layout}>
				<div style={input}>
					<IngredientInput funct={this.handleSubmit} />
					<IngredientChecklist funct={this.updateList} />
				</div>
				<div>
					<ul id="template">
						{this.state.list.map((item) => (
							<li>
								{item}
								<button
									style={delButton}
									onClick={() => { this.handleDelete(item) }}>
									<i class="fa fa-times"></i>
								</button>
							</li>
						))}
					</ul>
					<div style={delAll}>
						<button
							className="btn btn-danger"
							onClick={() => { this.handleDeleteAll() }}>
							Delete All
				</button>
					</div>
				</div>
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

const layout = {
	display: "flex",
}

const input = {
	display: "block",
}