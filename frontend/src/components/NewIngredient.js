import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';

class NewIngredient extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      Ingredient: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addnew(Ingredient){
    fetch('http://127.0.0.1:5000/api/ingredients', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: Ingredient})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
  }
  handleSubmit(ev) {
      ev.preventDefault();
      const {Ingredient } = this.state;
      this.addnew(Ingredient);
      this.setState({
        Ingredient: '',
      });
  }


    render(){
      return(
      <Popup
      trigger={<button className="button"> Add New Ingredient </button>}
      position="top right"
      closeOnDocumentClick
      >
      <div>
        Add New Ingredient
        <input type="text" placeholder="Ingredient to be added" size="22" 
        value={this.state.value} onChange={(event,newValue) => this.setState({Ingredient:newValue})}/>
      </div>
      <div>
        <Button onClick={this.handleSubmit}>Submit</Button>
        <Button>Cancel</Button>
      </div>
    </Popup>
      )}
  }
/*const NewIngredient = () => (
  <Popup
    trigger={<button className="button"> Add New Ingredient </button>}
    position="right center"
    closeOnDocumentClick
  >
    <div>
      Add New Ingredient
      <input type="text" placeholder="Ingredient to be added" size="22" />
    </div>
    <div>
      <Button>Submit</Button>
      <Button>Cancel</Button>
    </div>
  </Popup>
);*/

export default NewIngredient;