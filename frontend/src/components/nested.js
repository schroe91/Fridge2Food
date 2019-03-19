import React from "react";
import Popup from "reactjs-popup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./login.css"

class NestedLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }
  login(username, password) {
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/api/user/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(response => response.ok).then(success => (success ? this.setState({ isAuth: success }) : this.setState({ error: { message: "Incorrect email/password" } })))
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
    if(this.state) {
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
      <Popup
        trigger={<button className="button"> Login </button>}
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
          trigger={<button type="submit" className="button style"> Forgot Password </button>}
          position="bottom right"
          closeOnDocumentClick
        >
          <div>
            Enter your email
              <input type="text" name="email3" placeholder="Email" size="22"
              onChange={this.handleChange} value={this.state.email3} />
            <Button type="submit" onClick={this.handleSubmit3}>Forgot Password</Button>
          </div>
        </Popup>
        <button className="button style" onClick={this.toggleModal}> Create new user </button>
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
    )
  }
}
export default NestedLogin;

/*<Popup
          trigger={<button className="button style"> Create new user </button>}
          modal
        >
          {close => (
            <div style={modalStyle} size="sm">
              <a className="close" onClick={close} style={closeButton}>
                &times;
              </a>
              <div className="header"> Enter new user information </div>
              <div className="actions">
                <input type="text" name="newEmail" placeholder="Email" size="22"
                  onChange={this.handleChange} value={this.state.newEmail} />
                <input type="text" name="newUsername" placeholder="Username" size="22"
                  onChange={this.handleChange} value={this.state.newUsername} />
                <input type="password" name="newPassword" placeholder="Password" size="22"
                  onChange={this.handleChange} value={this.state.newPassword} />
                <Button type="submit" onClick={this.handleSubmit2} style={submit}> Submit </Button>
              </div>
            </div>
          )}
        </Popup> */