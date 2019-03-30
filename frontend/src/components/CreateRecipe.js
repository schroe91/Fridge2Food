import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',
      comments: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  /*componentDidMount() {
    const first = '/api/recipes/';
    const second = this.state.id;
    const link = first + second;
    fetch(link)
      .then(response => response.json())
      .then(data => this.setState({
        ingredients: data.ingredients, name: data.name, calories: data.calories, carbs: data.carbs,
        date: data.date_added, prep_time: data.prep_time, prep_steps: data.prep_steps
      }))
  }*/
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
						<button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
		  </div>
        </div>
        <h2>Create New Recipe</h2>
        

        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.name} name="name"type="text" onChange={this.handleChange} className="form-control" placeholder="Recipe Name" required />
                </div>
                <div className="from-group">
                    <input value={this.state.ingredients} name="ingredients" type="text" onChange={this.handleChange} className="form-control" placeholder="Ingredients" required />
                </div>
                <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Create Recipe</button>
              </form>
          </div>
        </div>
        
      </div>
    )
  }

}
export default CreateRecipe;

const style = {
  position: "absolute",
  width: "100%",
}

const pageStyle = {
  display: "flex",
}