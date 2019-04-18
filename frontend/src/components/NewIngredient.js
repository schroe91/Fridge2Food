import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';

class NewIngredient extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      ingredient: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addnew(name){
		console.log(name)
		fetch('/api/ingredients', {
		    //mode: 'no-cors',
		    method: "POST",
		    headers: {
			'Content-Type': 'application/json'
		    },
			body: JSON.stringify({name: name})
		}).then(response =>{
			console.log("database:" , response)  
			if(response.status === 201){
        console.log("added to database")
        return response.json()
			}else if (response.status === 409){
        console.log("already in database")
        return response.json()
				//return Promise.reject(new Error("Did not add to database"));
			}else{
				console.log("not added to database")
			}
		})

	}
  /*
  addnew(ingredient){
    fetch('/api/ingredients', {
        method: "POST",
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: ingredient})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Ingredient in database"}})))
  }*/
  handleSubmit(ev) {
      ev.preventDefault();
      const {ingredient } = this.state;
      this.addnew(ingredient);
      this.setState({
        ingredient: '',
      });
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }


    render(){
      return(
      <Popup
      trigger={<button className="button"> Add New Ingredient </button>}
      position="bottom left"
      closeOnDocumentClick
      >
      <div>
        Add New Ingredient
        <input type="text" name="ingredient" placeholder="Ingredient to be added" size="22" 
        onChange={this.handleChange} value={this.state.ingredient}/>
      </div>
      <div>
        <Button onClick={this.handleSubmit}>Submit</Button>
        <Button>Cancel</Button>
      </div>
    </Popup>
      )}
  }


export default NewIngredient;