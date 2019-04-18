import React, { Component } from 'react';
import logo from '../logo.png';
import profilepic from '../profilepic.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Userpage.css";
import { NavLink } from 'react-router-dom';
import IngredientDisplay from "./IngredientDisplay.js";
import FavoriteRecipeDisplay from "./FavoriteRecipeDisplay.js";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      email: '',
      modal: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      newUsername: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      favorites: [],
      newPic: '',
      id: '',
      avatar_url: profilepic,
      ingredients: [],
      allergies: [],
      tempAllergies: [],
      userRecipes: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.usernameModal = this.usernameModal.bind(this);
    this.passwordModal = this.passwordModal.bind(this);
    this.pictureModal = this.pictureModal.bind(this);
    this.allergyModal = this.allergyModal.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addAllergy = this.addAllergy.bind(this);
    this.getCurrentIngredients = this.getCurrentIngredients.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.cancelAllergies = this.cancelAllergies.bind(this);
    this.submitAllergies = this.submitAllergies.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  componentDidMount() {
    fetch('/api/users/current')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          name: data.username,
          email: data.email,
          avatar_url: data.avatar_url,
          id: data.id,
          ingredients: data.ingredients,
          allergies: data.allergies,
          favorites: data.favorites
        })
        console.log(this.state.id)
        console.log(this.state.ingredients)
        console.log(data.avatar_url)
      })

      this.getUserRecipes();
      console.log("User: " + this.state.id)
  }

  usernameModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUsername: '',
      oldUsername: '',
      password: '',
    }));
  }
  passwordModal() {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
      newPassword: '',
      oldPassword: '',
    }));
  }

  pictureModal() {
    this.setState(prevState => ({
      modal4: !prevState.modal4,
      newPic: '',
    }));
  }

  allergyModal() {
    this.setState(prevState => ({
      modal5: !prevState.modal5,
      allergies: this.state.allergies,
    }));
  }

  handleChange(e) {
    //console.log(this.state.id);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeUsername(ev) {
    ev.preventDefault();
    const { newUsername, password, } = this.state;
    this.changeUsername(newUsername, password);
    this.setState({
      newUsername: '',
      password: '',
      name: newUsername
    });
    this.usernameModal();
  }

  handleChangePassword(ev) {
    ev.preventDefault();
    const { newPassword, oldPassword } = this.state;
    this.changePassword(oldPassword, newPassword);
    this.setState({
      newPassword: '',
      oldPassword: '',
    });
  }

  changeUsername(newU, password) {
    fetch('/api/users/changename', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newU, password: password })
    }).then(response => response.ok).then(console.log('username success'))
  }

  changePassword(newP, oldP) {
    fetch('/api/users/newpassword', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPassword: newP, oldPassword: oldP })
    }).then(response => response.ok).then(console.log('password success'))
  }

  handleChangePicture(ev) {
    ev.preventDefault();
    const { newPic } = this.state;
    this.changePic(newPic);
    this.setState({
      newPic: '',
    });
  }

  changePic(newPic) {
    fetch('/api/users/changeavatar', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url: newPic, })
    }).then(response => response.ok).then(console.log('img success'))
  }

  addAllergy(allergy) {
    this.setState({ tempAllergies: allergy });
  }

  getFavorites() {

  }

  getCurrentIngredients() {

  }

  cancelAllergies() {
    this.setState({ allergies: [] });
    this.allergyModal();
  }

  submitAllergies() {
    var newState = this.state;
    newState.allergies = this.state.tempAllergies;
    this.setState(newState);

    //Add to backend
    /*var link = 'api/users/' + this.state.id + '/allergies'
    fetch(link,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({allergy: allergy})
    }).then(response => response.ok).then(console.log('allergy added'))*/

    this.allergyModal();
  }

  getUserRecipes() {
    var recipeArray = [];
    fetch("/api/recipes", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if(response.ok) {
        return response.json();
    }})
    .then(data => {recipeArray = data});
    
    var newState = this.state;
    recipeArray.map(r => {
      if(r.id === this.state.id) {
        newState.userRecipes.unshift(r.name);
      }
    });
  }

  render() {
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <button className="button" id="backButton"><NavLink exact to="/" activeClassName="active">Back</NavLink></button>
        </div>
        <div id="userPage">
          <div id="profilePic">
            <img src={profilepic} alt="" id="pic" />
            <button className="button style" onClick={this.pictureModal}>Edit Profile Picture</button>
            <Modal isOpen={this.state.modal4} toggle={this.pictureModal} size="sm">
              <ModalHeader toggle={this.toggle}>Enter New Pic</ModalHeader>
              <ModalBody>
                <input type="text" name="newPic" placeholder="New Pic" size="22"
                  onChange={this.handleChange} value={this.state.newPic} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleChangePicture}>Submit</Button>
                <Button color="secondary" onClick={this.pictureModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
          <div id="info">
            <h3 id="header">Account Info</h3>
            <div id="username">
              <h5>Username: {this.state.name}</h5>
              <button className="button" onClick={this.usernameModal}> Change Username </button>
              <Modal isOpen={this.state.modal} toggle={this.usernameModal} size="sm">
                <ModalHeader toggle={this.toggle}>Enter New Username</ModalHeader>
                <ModalBody>
                  <input type="text" name="newUsername" placeholder="New Username" size="22"
                    onChange={this.handleChange} value={this.state.newUsername} />
                  <input type="password" name="password" placeholder="Password" size="22"
                    onChange={this.handleChange} value={this.state.password} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleChangeUsername}>Submit</Button>
                  <Button color="secondary" onClick={this.usernameModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div id="email">
              <h5>Email: {this.state.email}</h5>
              <button className="button" onClick={this.passwordModal}> Change Password </button>
              <Modal isOpen={this.state.modal2} toggle={this.passwordModal} size="sm">
                <ModalHeader toggle={this.toggle}>Enter New Password</ModalHeader>
                <ModalBody>
                  <input type="password" name="oldPassword" placeholder="Old Password" size="22"
                    onChange={this.handleChange} value={this.state.oldPassword} />
                  <input type="password" name="newPassword" placeholder="New Password" size="22"
                    onChange={this.handleChange} value={this.state.newPassword} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleChangePassword}>Submit</Button>
                  <Button color="secondary" onClick={this.passwordModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div id='ingredients'>
              <IngredientDisplay ingredients={this.state.ingredients} />
            </div>
            <div id="allergies">
              <div style={{display: "block"}}>
                <h5>Allergies</h5>
                <ul>
                  {this.state.allergies.map((item, index) => (
                    <li key={index}>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="button" onClick={this.allergyModal}> Add Allergy </button>
              <Modal isOpen={this.state.modal5} toggle={this.allergyModal} size="sm">
                <div id="multiSelect">
                  <ReactMultiSelectCheckboxes
                    options={filters}
                    isSearchable={false}
                    onChange={this.addAllergy}
                    placeholderButtonLabel="Allergies"
                  />
                </div>
                <ModalFooter>
                  <Button color="primary" onClick={this.submitAllergies}>Submit</Button>
                  <Button color="secondary" onClick={this.cancelAllergies}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div id='favorites'>
              <FavoriteRecipeDisplay favorites={this.state.favorites} />
            </div>
            <div id="userRecipes" style={{display: "block"}}>
              <h5>My Recipes</h5>
              {(this.state.userRecipes.length !== 0) ? (
                  this.state.userRecipes.map((recipe, index) => {
                    return <li key={index}>{recipe.name}</li>
                   })) : <h5 style={{paddingLeft: 40}}>No recipes yet!</h5>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default Userpage;

const filters = [
  { value: 1, label: "Milk" },
  { value: 2, label: "Nuts" },
  { value: 3, label: "Soy" },
  { value: 4, label: "Wheat" },
];

const style = {
  position: "absolute",
  width: "100%",
};