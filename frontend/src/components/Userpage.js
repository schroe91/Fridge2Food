import React, { Component } from 'react';
import logo from '../logo.png';
import profilepic from '../profilepic.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import "./Userpage.css";

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //id: this.props.match.params.id,
      name: '',
      email: '',
      modal: false,
      modal2: false,
      modal3: false,
      modal4: false,
      newUsername: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      favorites: [],
      newPic: '',
      id: '',
      avatar_url: profilepic,
      ingredients: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.toggleModal3 = this.toggleModal3.bind(this);
    this.toggleModal4 = this.toggleModal4.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

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
          ingredients: data.ingredients
        })
        console.log(this.state.id)
        console.log(this.state.ingredients)
        console.log(data.avatar_url)
      })
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUsername: '',
      oldUsername: '',
      password: '',
    }));
  }
  toggleModal2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
      newPassword: '',
      oldPassword: '',
    }));
  }
  toggleModal3() {
    this.setState(prevState => ({
      modal: !prevState.modal3,
      newUsername: '',
      oldUsername: '',
      password: '',
    }));
  }
  toggleModal4() {
    this.setState(prevState => ({
      modal: !prevState.modal4,
      newPic: '',
    }));
  }
  handleChange(e) {
    console.log(this.state.id);
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const { newUsername, password, } = this.state;
    this.changeUsername(newUsername, password);
    this.setState({
      newUsername: '',
      password: '',
    });
  }
  handleSubmit2(ev) {
    ev.preventDefault();
    const { newPassword, oldPassword } = this.state;
    this.changePassword(oldPassword, newPassword);
    this.setState({
      newPassword: '',
      oldPassword: '',
    })
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
  render() {
    return (
      <div id="layout" style={style}>
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <button className="button" id="backButton">Back</button>
        </div>
        <div id="userPage">
          <div id="profilePic">
            <img src={profilepic} alt="" id="pic" />
            <button className="button style">Edit Profile Picture</button>
          </div>
          <div id="info">
            <h3 id="header">Account Info</h3>
            <div id="username">
              <h5>Username: {this.state.name}</h5>
              <button className="button" onClick={this.toggleModal}> Change Username </button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
                <ModalHeader toggle={this.toggle}>Enter New Username</ModalHeader>
                <ModalBody>
                  <input type="text" name="newUsername" placeholder="New Username" size="22"
                    onChange={this.handleChange} value={this.state.newUsername} />
                  <input type="password" name="password" placeholder="Password" size="22"
                    onChange={this.handleChange} value={this.state.password} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                  <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div id="email">
              <h5>Email: {this.state.email}</h5>
              <button className="button" onClick={this.toggleModal2}> Change Password </button>
              <Modal isOpen={this.state.modal2} toggle={this.toggleModal2} size="sm">
                <ModalHeader toggle={this.toggle}>Enter New Password</ModalHeader>
                <ModalBody>
                  <input type="password" name="oldPassword" placeholder="Old Password" size="22"
                    onChange={this.handleChange} value={this.state.oldPassword} />
                  <input type="password" name="newPassword" placeholder="New Password" size="22"
                    onChange={this.handleChange} value={this.state.newPassword} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmit2}>Submit</Button>
                  <Button color="secondary" onClick={this.toggleModal2}>Cancel</Button>
                </ModalFooter>
              </Modal>
              <ul>
              {this.state.ingredients.map((item) => (
							<li>
								{item}
							</li>
						))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
  }

}
const style = {
  position: "absolute",
  width: "100%",
}
export default Userpage;
