import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';
import "./CreateRecipe.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: '',
      name: '',
      modal: false,
      ingredients: [{ name: "" }],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',
      recipeIMG_url: '',
      ingredientsid: [{ id: "" }],
      userId: 0,
      vegan: false,
      veg: false,
      gluten: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addnew = this.addnew.bind(this);
    this.handleVegChange = this.handleVegChange.bind(this);
    this.handleVeganChange = this.handleVeganChange.bind(this);
    this.handleGlutenChange = this.handleGlutenChange.bind(this);
  }
  //need to add recipeurl to fetch
  createRecipe(recipe, ingredients, calories, carbs, date, prep_time, prep_steps) {
    fetch('/api/recipes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: recipe, ingredients: ingredients, calories: calories, carbs: carbs, date: date,
        prep_time: prep_time, prep_steps: prep_steps, is_vegan: this.state.vegan,
        is_vegetarian: this.state.veg, is_glutenfree: this.state.gluten, fat: 0, protein: 0
      })
    }).then(response => response.ok).then(success => (success ? alert("Recipe Successfully created") : alert("Failed to create recipe")))
  }

  handleIngredientNameChange = idx => evt => {
    console.log(this.state.ingredients);
    const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredients: newIngredient });
  };
  handleSubmit = evt => {
    const { name, ingredients } = this.state;
    alert(`Incorporated: ${name} with ${ingredients.length} shareholders`);
  };
  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: "" }])
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  addnew(ingredient) {
    console.log("addnew =" + ingredient)
    fetch('/api/ingredients', {
      method: "POST",
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: ingredient })
    }).then(response => {
      if (response.status === 200 || response.status === 409 || response.status === 201) {
        return response.json();
      }
    }).then(data => {
      this.setState({ ingredientsid: [...this.state.ingredientsid, data.id] }) //simple value
    })
  };
  handleSubmit2 = (e) => {
    e.preventDefault();
    const { recipe, ingredients, calories, carbs, date, prep_time, prep_steps } = this.state;
    ingredients.map((name) =>
      //console.log(name)
      this.addnew(name.name)
    );
    const { ingredientsid } = this.state;

    console.log("ing id = " + ingredientsid);
    this.createRecipe(recipe, ingredientsid, calories, carbs, date, prep_time, prep_steps);

  };

  addImage(recipeIMG_url) {
    fetch('/api/recipeIMG', {
      method: "POST",
      body: JSON.stringify({ url: recipeIMG_url }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.ok).then(success => (success ? alert("img successfully added") : alert("Failed to add image")))
  };
  getID(ingredients) {

  }

  handleSubmit3 = (ev) => {
    ev.preventDefault();
    const { recipeIMG_url } = this.state;
    this.addImage(recipeIMG_url);
    this.setState({
      recipeIMG_url: '',
    });
  }
  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      recipeIMG_url: '',
    }));
  }

  handleVeganChange(ev) {
    if (this.state.vegan === false)
      this.setState({ vegan: true });
    else
      this.setState({ vegan: false });
  }

  handleVegChange(ev) {
    if (this.state.veg === false)
      this.setState({ veg: true });
    else
      this.setState({ veg: false });
  }

  handleGlutenChange(ev) {
    if (this.state.gluten === false)
      this.setState({ gluten: true });
    else
      this.setState({ gluten: false });
  }

  render() {
    let { recipe, calories, carbs, prep_time, prep_steps } = this.state
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <div id="login">
            <button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
          </div>
        </div>
        <div id="createRecipe">
          <h4 id="newLabel">Create New Recipe</h4>
          <div id="panel" style={{ display: "flex" }}>
            <div>
              <form onSubmit={this.handleSubmit2} onChange={this.handleChange} id="recipeForm">
                <div id="inputDiv">
                  <label htmlFor="recipe">Recipe Name</label>
                  <input type="text" className="forminput5" name="recipe" id="recipe" value={recipe} />
                </div>
                <br></br>
                <div id="inputDiv">
                  <label htmlFor="calories">Calories</label>
                  <input type="text" className="forminput5" name="calories" id="calories" value={calories} />
                </div>
                <br></br>
                <div id="inputDiv">
                  <label htmlFor="carbs">Carbs</label>
                  <input type="text" className="forminput5" name="carbs" id="carbs" value={carbs} />
                </div>
                <br></br>
                <div id="inputDiv">
                  <label htmlFor="preptime">Prep Time</label>
                  <input type="text" className="forminput5" name="prep_time" id="prep_time" value={prep_time} />
                </div>
                <br></br>
                <label htmlFor="Ingredients" id="ingList">List of Ingredients</label>
                {this.state.ingredients.map((ingredient, idx) => (
                  <div className="ingredient">
                    <input
                      type="text"
                      className="ingInput"
                      placeholder={`Ingredient ${idx + 1}`}
                      value={ingredient.name}
                      onChange={this.handleIngredientNameChange(idx)}
                    />
                    <button
                      type="button"
                      onClick={this.handleRemoveIngredient(idx)}
                      className="small"
                      id="removeIng"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={this.handleAddIngredient}
                  className="small"
                  id="addIngButton"
                >
                  Add Ingredient
                </button>
                <br></br>
                <div>
                  <label htmlFor="prep_steps">Instructions:</label>
                </div>
                <div>
                  <textarea name="prep_steps" cols="60" rows="8" id="prep_steps" value={prep_steps} />
                </div>
                <label id="veganBox">
                  <input
                    type="checkBox"
                    value="vegan"
                    checked={this.state.vegan === true}
                    onChange={this.handleVeganChange}
                  />
                  Vegan
						</label>
                <label id="vegBox">
                  <input
                    type="checkbox"
                    value="veg"
                    checked={this.state.veg === true}
                    onChange={this.handleVegChange}
                  />
                  Vegetarian
						</label>
                <label id="glutenBox">
                  <input
                    type="checkbox"
                    value="gluten"
                    checked={this.state.gluten === true}
                    onChange={this.handleGlutenChange}
                  />
                  Gluten Free
						</label>
                <div>
                  <input className="button" id="submitButton" type="submit" value="Submit" />
                </div>
              </form>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button className="button" onClick={this.toggleModal} id="image"> Add Recipe Image</button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
                <ModalHeader toggle={this.toggle}>Enter recipe image url</ModalHeader>
                <ModalBody>
                  <input type="text" name="recipeIMG_url" placeholder="Recipe Image Url" size="22"
                    onChange={this.handleChange} value={this.state.recipeIMG_url} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmit3}>Submit</Button>
                  <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
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
