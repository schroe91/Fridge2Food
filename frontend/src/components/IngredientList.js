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
			user:"",
		}
		this.AddIngredient = this.AddIngredient.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.deleteAll = this.deleteAll.bind(this);

		this.update = React.createRef();
		this.updateAll = React.createRef();
	}

	AddIngredient() {
		const first = 'http://127.0.0.1:5000/api/users/';
		const second = this.state.name;
		const third = '/ingredients'  
  		const link = first + second + third;
		fetch(link, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.name)
		}).then(response => response.ok)
	}

	deleteIngredient() {
		const first = 'http://127.0.0.1:5000/api/users/';
		const second = this.state.user
		const third = '/ingredients'
		const fourth = this.state.name;  
  		const link = first + second + third + fourth;
		fetch(link, {
			method: "DELETE",
			body: JSON.stringify(this.state.name)
		}).then(response => response.ok)
	}

	deleteAll() {
		const first = 'http://127.0.0.1:5000/api/users/';
		const second = this.state.user;
		const third = '/ingredients'  
  		const link = first + second + third;
		fetch(link, {
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
			newState.name = ingredient;
			this.setState(newState);
			this.AddIngredient();
		}
		this.props.setNumOfIngredients(this.state.list);
		//Reset form
		this.setState({
			value: "",
		});
	}

	handleDelete(item) {
		const newState = this.state;
		let i = this.state.list.indexOf(item);

		if (i > -1) {
			newState.list.splice(i, 1);
			this.state.name = this.state.value;
			this.setState(newState);
			this.deleteIngredient();
			this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
		}
		this.update.current.handleDeleteFromParent(item);
	}

	handleDeleteAll() {
		const newState = this.state;
		newState.list = [];
		this.setState(newState);
		this.deleteAll();
		this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
		this.updateAll.current.handleDeleteAllFromParent();
	}

	render() {
		return (
			<div id="Ingredientlayout">
				<div id="input">
					<IngredientInput funct={this.handleSubmit} />
					<IngredientChecklist 
						addIngredient={this.handleSubmit} 
						removeIngredient={this.handleDelete} 
						ref={this.update}	
						ref={this.updateAll}
					/>
				</div>
				<div id="list">
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
					<div id="delAll">
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