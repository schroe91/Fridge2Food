import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import './IngredientList.css'
import IngredientChecklist from "./IngredientChecklist";
import IngredientInput from "./IngredientInput";


class IngredientList extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
			name: "",
			ingredientId: '',
		}
		this.AddIngredienttoUser = this.AddIngredienttoUser.bind(this);
		this.AddIngredienttoDatabase = this.AddIngredienttoDatabase.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDeleteAll = this.handleDeleteAll.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
		this.delAll = React.createRef();
		this.addIngredients = this.addIngredients.bind(this);
	}

	async addIngredients() {
		await this.AddIngredienttoDatabase();
		console.log("after database: " + this.state.id)
		await this.AddIngredienttoUser();
	}
	

	AddIngredienttoUser(){
		console.log("id:  " + this.state.id)
		console.log("userId: " + this.props.userId)
		const first = '/api/users/';
		const second = this.props.userId;
		const third = '/ingredients'
		const link = first + second + third;
		fetch(link, {
			mode: 'no-cors',
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: this.state.ingredientId})
		}).then(response =>{ 
			console.log(this.state.ingredientId)
			if(response.ok){
				return response.json();
			}else{
				console.log("not added to user")
			}
		})
		.catch((err) =>{
            console.log("no valid user is logged in")
        })
		
	}

	AddIngredienttoDatabase(){
		fetch('/api/ingredients', {
		    //mode: 'no-cors',
		    method: "POST",
		    headers: {
			'Content-Type': 'application/json'
		    },
			body: JSON.stringify({name: this.state.name})
		}).then(response =>{
			console.log("database:" , response)  
			if(response.status === 201){
				console.log("added to database")
				return response.json();
			}else if (response.status === 409){
				console.log("already in database")
				return response.json();
			}else{
				console.log("not added to database")
			}
		}).then(data => {
			this.setState({id:data.id})
			console.log("added: " + this.state.id)
		})
			
	}

	deleteIngredient() {
		this.AddIngredienttoDatabase(this.state.name)
		const first = '/api/users/';
		const second = this.props.userId;
		const third = '/ingredients/'
		const fourth = this.state.id;
		const link = first + second + third + fourth;
		fetch(link, {
			method: "DELETE",
			headers:{
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(this.state.id),
		}).then(response => response.ok)
	}

	deleteAll() {
		const first = '/api/users/';
		const second = this.props.userId;
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
			this.addIngredients();
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
			//this.del.current.handleDeleteFromParent();
			newState.list.splice(i, 1);
			this.setState({name:this.state.value})
			this.setState(newState);
			this.deleteIngredient();
			this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
		}
	}

	handleDeleteAll() {
		const newState = this.state;
		newState.list = [];
		this.setState(newState);
		this.deleteAll();
		this.props.setNumOfIngredients(this.state.list); //Passes value to NumOfIngredients.js
		this.delAll.current.handleDeleteAllFromParent();
	}

	render() {
		return (
			<div id="Ingredientlayout">
				<div id="input">
					<IngredientInput funct={this.handleSubmit} />
					<IngredientChecklist
						addIngredient={this.handleSubmit}
						removeIngredient={this.handleDelete}
						ref={this.delAll}
					/>
				</div>
				<div id="list">
					<ul id="template">
						{this.state.list.map((item) => (
							<li key = {item}>
								{item}
								<button 
									style={delButton}
									onClick={() => { this.handleDelete(item) }}>
									<i className="fa fa-times"></i>
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
