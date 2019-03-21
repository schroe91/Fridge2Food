import React, { Component } from 'react';
import logo from '../logo.png';
import profilepic from '../profilepic.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Userpage extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      modal: false,
      modal2: false,
      oldUsername: '',
      newUsername: '',
      password: '',
      oldPassword: '',
      newPassword: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

componentDidMount(){
  fetch('http://127.0.0.1:5000/api/users/4') 
  .then( response => response.json())
  .then(data=>this.setState({name: data.username ,email: data.email}))
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
handleChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
handleSubmit(ev) {
  ev.preventDefault();
  const { newUsername, oldUsername, password, } = this.state;
  this.changeUsername(newUsername, oldUsername, password);
  this.setState({
    newUsername: '',
    oldUsername: '',
    password: '',
  });
}
handleSubmit2(ev){
  ev.preventDefault();
  const { newPassword, oldPassword} = this.state;
  this.changePassword(oldPassword, newPassword);
  this.setState({
    newPassword: '',
    oldPassword: '',
  })
}
changeUsername(newU, oldU, password){
  fetch('http://127.0.0.1:5000/api/users/newusername', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newUsername: newU, oldUsername: oldU, password: password })
    }).then(response => response.ok).then(console.log('username success'))
}
changePassword(newP, oldP){
  fetch('http://127.0.0.1:5000/api/users/newpassword', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPassword: newP, oldPassword: oldP})
    }).then(response => response.ok).then(console.log('password success'))
}
render(){
  return( 
    <div id="layout" style={style}>
      <div id="top-border">
          <img src={logo} alt="" id="logo"/>
          <h2 id="title">Fridge2Food</h2>
      </div>
    
  <div>
    <h3></h3>
    <img src={profilepic} alt="" id="pic"/>
    <h2>Username: {this.state.name}</h2>
    <h2>Email: {this.state.email}</h2>
    <button className="button style" onClick={this.toggleModal}> Change Username </button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
          <ModalHeader toggle={this.toggle}>Enter New Username</ModalHeader>
          <ModalBody>
            <input type="text" name="oldUsername" placeholder="Old username" size="22"
              onChange={this.handleChange} value={this.state.newEmail} />
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
      

        <button className="button style" onClick={this.toggleModal2}> Change Password </button>
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
  </div>
  </div>)
}

} 
const style = {
  position: "absolute",
  width: "100%",
}
export default Userpage;