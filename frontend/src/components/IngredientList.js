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
		//this.inDatabase = this.inDatabase.bind(this);
	    this.delAll = React.createRef();
	    this.GetCurrentIngredients();
	}

    GetCurrentIngredients(){
	fetch('/api/users/current', {
	    method: "GET"
	}).then(response =>{
	    if(response.ok){
		return response.json();
	    }
	}).then(data =>{
		if(data){
	    for(var i = 0; i<data.ingredients.length; i++){
		this.handleSubmit(data.ingredients[i].name);
		}
	}
	})
    }
	AddIngredienttoUser() {
	    const first = '/api/users/';
	    const second = 'current';
	    console.log('current: ' + this.state.name)
	    const third = '/ingredients'
	    const link = first + second + third;
	    //check if in database
	    //if(!this.inDatabase()){
	    //	console.log("not in database");
	    //this.AddIngredienttoDatabase(this.state.name);//add to database
	    //}
	    fetch(link, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ name: this.state.name })
	    }).then(response =>{ 
		if(response.ok){
			console.log(this.state.name + " added to user")
		    return response.json();
		}else{
		    console.log("not added to user")
		    //return Promise.reject(new Error("Not added to User"));
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
			//console.log("added: " + this.state.id)
		})
			
	}

	/*inDatabase(){
		var link = '/api/ingredients/' + this.state.name;
		fetch(link, {
			mode: 'no-cors',
			method: "GET",
		}).then(response =>{ 
			if(response.ok){
				this.setState({id:response.id})
				return true;
			}else{
				return false;
			}
		}).catch((error) => {
			console.log(error)
		})

	}*/

	deleteIngredient(name) {
		const first = '/api/users/';
		const second = 'current';
		const third = '/ingredients/'
		const link = first + second + third;
		console.log("delete: " + this.state.name)
		fetch(link, {
		    method: "DELETE",
		    headers:{
			'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({name: name}),
		}).then(response => response.ok)
	}

	deleteAll() {
		console.log("delete all")
		const link = '/api/users/current/ingredients/all';
		fetch(link, {
			method: "DELETE",
		}).then(response => response.ok)
	}

	handleChange(ev) {
		this.setState({ value: ev.target.value });
	}

	handleSubmit(ingredient) {
	    //Only update list if ingredient is not already in there
	    ingredient = ingredient.toLowerCase();
		if (this.state.list.indexOf(ingredient) === -1) {
			const newState = this.state;
			newState.list.unshift(ingredient);
			newState.name = ingredient;
			this.setState(newState);
			this.AddIngredienttoUser(ingredient);
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
			this.deleteIngredient(item);
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
