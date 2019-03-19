import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';
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
		}

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
	}
  login(username, password) {
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/api/user/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
  }
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }
  
  newUser(email, username, password){
    console.log(email);
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/api/users',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, username: username, password: password})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Failed to regiester"}})))
  }
  forgotPassword(email){
    console.log(email);
    fetch('http://127.0.0.1:5000/api/',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Failed to send emailr"}})))
  }

	handleSubmit(ev) {
    ev.preventDefault();
    const {username, password } = this.state;
    this.login(username, password);
    this.setState({
      username: '',
      password: '',
		});
  }
  handleSubmit2(ev){
    ev.preventDefault();
    const {newEmail, newUsername, newPassword} = this.state;
    this.newUser(newEmail, newUsername, newPassword);
    this.setState({
      newUsername: '',
      newPassword: '',
      newEmail: '',
    });
  }
  handleSubmit3(ev){
    ev.preventDefault();
    const {email3} = this.state;
    this.forgotPassword(email3);
    this.setState({
      email3:'',
    })
  }
  render(){
    return (
    <Popup
    trigger={<button className="button"> Login </button>}
    position="bottom right"
    closeOnDocumentClick
    >
    <div>
      enter login information
      <input type="text" name="username" placeholder="Username" size="22"
              onChange={this.handleChange} value={this.state.username}    
      />
    </div>
    <div>
      <input type="password" name="password" placeholder="Password" size="22"
						onChange={this.handleChange} value={this.state.password}/>
    </div>
    <div onSubmit={this.handleSubmit}>
      <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
      <Popup
        trigger={<button type="submit" className="button"> Forgot Password </button>}
        position="bottom right"
        closeOnDocumentClick
      >
        <div>
          enter your email
          <input type="text" name="email3" placeholder="Email" size= "22"
            onChange={this.handleChange} value={this.state.email3}/>
            <Button type="submit" onClick={this.handleSubmit3}>Forgot Password</Button>
        </div>
      </Popup>
      <Popup
    trigger={<button> Create new user </button>}
    modal
  >
    {close => (
      <div >
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Enter new user information </div>
        <div className="actions">
          <input type="text" name="newEmail" placeholder="Email" size="22"
          onChange={this.handleChange} value={this.state.newEmail}/>
          <input type="text" name="newUsername" placeholder="Username" size="22"
          onChange={this.handleChange} value={this.state.newUsername}/>
          <input type="password" name="newPassword" placeholder="Password" size="22"
          onChange={this.handleChange} value={this.state.newPassword}/>
           <Button type="submit" onClick={this.handleSubmit2}> Submit </Button>
        </div>
      </div>
    )}
  </Popup>

    </div>
    </Popup>
    )
  }
}
export default NestedLogin;