import React, { Component } from 'react';
import logo from '../logo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import "./Userpage.css";
import { NavLink } from 'react-router-dom';
import IngredientDisplay from "./IngredientDisplay.js";
import FavoriteRecipeDisplay from "./FavoriteRecipeDisplay.js";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import UserRecipeDisplay from './UserRecipeDisplay';

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
      modal6: false,
      newUsername: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      favorites: [],
      newPic: '',
      avatar_url: '',
      ingredients: [],
      allergies: [],
      tempAllergies: [],
      userRecipes: [],
      ingredientsid: [],
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
    // this.deleteAllergies = this.deleteAllergies.bind(this);
    this.cancelAllergies = this.cancelAllergies.bind(this);
    this.submitAllergies = this.submitAllergies.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  componentDidMount() {
    fetch('/api/users/current')
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: data.username,
          email: data.email,
          avatar_url: data.avatar_url,
          id: data.id,
          ingredients: data.ingredients,
          allergies: data.allergies,
          favorites: data.favorites,
          profile: data.avatar_url,
          userRecipes: data.created_recipes
        })
      })
    this.getUserRecipes();
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
    }).then(response => {
	if(response.ok){
	    alert("Password change succeeded.")
	    this.passwordModal();
	}else{
	    alert("Password incorrect or invalid new password")
	}
    })
  }

  handleChangePicture(ev) {
    ev.preventDefault();
    const { newPic } = this.state;
    this.changePic(newPic);

    this.pictureModal();
  }

  changePic(newPic) {
    fetch('/api/users/changeavatar', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url: newPic, })
    }).then(response => response.json())
      .then(data => this.setState({ avatar_url: data.avatar_url }))
  }

  addAllergy(allergy) {
    this.setState({ tempAllergies: allergy });
  }

  cancelAllergies() {
    this.setState({ allergies: [] });
    this.allergyModal();
  }

  submitAllergies() {
    var newState = this.state;
    newState.allergies = this.state.tempAllergies;
    this.setState(newState);
    var link, index;
    //Add to backend
    this.state.allergies.map((item) => (
      this.addnew(item.label),
      index = this.state.ingredientsid.findIndex(obj => obj.name === item.label),
      console.log(index),
      link = 'api/users/' + this.state.ingredientsid[index].id + '/allergies',
      fetch(link, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ allergy: item.value })
      }).then(response =>
        console.log(response))
    ))

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
      if (response.ok) {
        return response.json();
      }
    })
      .then(data => { recipeArray = data });

    var newState = this.state;
    recipeArray.map(r => {
      if (r.id === this.state.id) {
        newState.userRecipes.unshift(r.name);
      }
    });
  }

  addnew(ingredient) {
      fetch('/api/ingredients', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: ingredient })
    }).then(response => {
      if (response.status === 200 || response.status === 409 || response.status === 201) {
        return response.json();
      }
    }).then(data => {
      const newState = this.state;
      newState.ingredientsid.unshift({ id: data.id, name: data.name });
      this.setState(newState);
    })
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
            <img src={this.state.avatar_url} alt="" id="pic" />
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
              <div style={{ display: "block" }}>
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
            <div id="userRecipes">
              <UserRecipeDisplay userRecipes={this.state.userRecipes} />
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

/*const delButton = {
	backgroundColor: 'transparent',
	border: '0',
	color: "#c20",
	outline: 'none',
}*/
