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
  addnew(ingredient){
    fetch('http://127.0.0.1:5000/api/ingredients', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: ingredient})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Ingredient in database"}})))
  }
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