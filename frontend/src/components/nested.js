import React from "react";
import Popup from "reactjs-popup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./login.css"
import IngredientList from "./IngredientList";

class NestedLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      newEmail: '',
      email3: '',
      modal: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(username, password) {
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(response => response.ok).then(success => (success ? this.setState({ isAuth: success }) : this.setState({ error: { message: "Incorrect email/password" } })))
    .then(data =>this.setState({id: data.id}))
  }

  logout(ev) {
    if (this.state.isAuth) {
      fetch('http://127.0.0.1:5000/api/users/logout', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.ok).then(this.setState({ isAuth: false }))
      alert("You have been logged out");
    } else
      alert("You are not currently logged in");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  newUser(email, username, password) {
    console.log(email);
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, username: username, password: password })
    }).then(response => response.ok).then(success => (success ? this.setState({ isAuth: success }) : this.setState({ error: { message: "Failed to regiester" } })))
  }

  forgotPassword(email) {
    console.log(email);
    fetch('http://127.0.0.1:5000/api/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    }).then(response => response.ok).then(success => (success ? this.setState({ isAuth: success }) : this.setState({ error: { message: "Failed to send emailr" } })))
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    this.login(username, password);
    this.setState({
      username: '',
      password: '',
    });
  }

  handleSubmit2(ev) {
    ev.preventDefault();
    if (this.state) {
      const { newEmail, newUsername, newPassword } = this.state;
      this.newUser(newEmail, newUsername, newPassword);
      this.setState({
        newUsername: '',
        newPassword: '',
        newEmail: '',
        modal: false,
      });
    }
  }

  handleSubmit3(ev) {
    ev.preventDefault();
    const { email3 } = this.state;
    this.forgotPassword(email3);
    this.setState({
      email3: '',
    })
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div id="user">
      <IngredientList userID = {this.state.id}/>
        <Popup
          trigger={<button className="button">{this.state.isAuth ? "My Account" : "Login"}</button>}
          position="bottom right"
          closeOnDocumentClick
        >
          <div>
            enter login information
          <input type="text" name="username" placeholder="Username" size="22"
              onChange={this.handleChange} value={this.state.username} />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" size="22"
              onChange={this.handleChange} value={this.state.password} />
          </div>
          <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
          <Popup
            trigger={<button type="submit" className="button" id="bStyle"> Forgot Password </button>}
            position="bottom right"
            closeOnDocumentClick
          >
            <div>
              Enter your email
            <input type="text" name="email3" placeholder="Email" size="22"
                onChange={this.handleChange} value={this.state.email3} />
              <Button className="button" type="submit" onClick={this.handleSubmit3}>Forgot Password</Button>
            </div>
          </Popup>
          <button className="button" id="bStyle" onClick={this.toggleModal}> Create new user </button>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
            <ModalHeader toggle={this.toggle}>Enter New User Info</ModalHeader>
            <ModalBody>
              <input type="text" name="newEmail" placeholder="Email" size="22"
                onChange={this.handleChange} value={this.state.newEmail} />
              <input type="text" name="newUsername" placeholder="Username" size="22"
                onChange={this.handleChange} value={this.state.newUsername} />
              <input type="password" name="newPassword" placeholder="Password" size="22"
                onChange={this.handleChange} value={this.state.newPassword} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit2}>Submit</Button>
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Popup>
        <button className="button" onClick={this.logout}> Logout </button>
      </div>
    )
  }
}
export default NestedLogin;
/**<Popup
      trigger={<button className="button" onClick={this.logout}> Logout </button>}
      position="bottom right"
      closeOnDocumentClick
      >
      <div>
        You have logged out
      </div>
      </Popup> */