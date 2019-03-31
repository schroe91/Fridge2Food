import React, { Component } from 'react';
import logo from '../logo.png';
import profilepic from '../profilepic.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Userpage extends Component {
  constructor(props){
    super(props);
    this.state = {
      //id: this.props.match.params.id,
      name: '',
      email: '',
      modal: false,
      modal2: false,
      newUsername: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      favorites: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

componentDidMount(){
  //const first = '/api/users/';
  //const second = this.state.id;
  //const link = first + second;
 // console.log(link);
  fetch('/api/users/current') 
  .then( response => response.ok)
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
handleSubmit2(ev){
  ev.preventDefault();
  const { newPassword, oldPassword} = this.state;
  this.changePassword(oldPassword, newPassword);
  this.setState({
    newPassword: '',
    oldPassword: '',
  })
}
changeUsername(newU, password){
  fetch('/api/users/changename', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newU, password: password })
    }).then(response => response.ok).then(console.log('username success'))
}
changePassword(newP, oldP){
  fetch('/api/users/newpassword', {
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
          <div id="login">
						<button className="button" id="login"><NavLink exact to="/" activeClassName="active">Home</NavLink></button>
					</div>
      </div>
    
  <div>
    <h3>   </h3>
    <img src={profilepic} alt="" id="pic"/>
    <button className="button style">Edit Profile Picture</button>
    <h2>Username: {this.state.name}</h2>
    <h2>Email: {this.state.email}</h2>
    <button className="button style" onClick={this.toggleModal}> Change Username </button>
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
        
        <button className="button style" onClick={this.toggleModal3}> Add Allergy</button>
        <Modal isOpen={this.state.modal3} toggle={this.toggleModal3} size="sm">
          <ModalHeader toggle={this.toggle}>Enter Allergy</ModalHeader>
          <ModalBody>
            <input type="password" name="oldPassword" placeholder="Old Password" size="22"
              onChange={this.handleChange} value={this.state.oldPassword} />
            <input type="password" name="newPassword" placeholder="New Password" size="22"
              onChange={this.handleChange} value={this.state.newPassword} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit3}>Submit</Button>
            <Button color="secondary" onClick={this.toggleModal3}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <ul>
              {this.state.favorites.map(favorite => {
                return <li key={`favorite`}>{favorite.name}</li>
              })}
            </ul>
  </div>
  </div>)
}

} 
const style = {
  position: "absolute",
  width: "100%",
}
export default Userpage;
