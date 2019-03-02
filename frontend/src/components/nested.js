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
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  login(username, password) {
    console.log(username);
    console.log(password);
    fetch('http://127.0.0.1:5000/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
  }
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
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
      <input type="text" name="password" placeholder="Password" size="22"
						onChange={this.handleChange} value={this.state.password}/>
    </div>
    <div onSubmit={this.handleSubmit}>
      <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
      <Button>Forgot Password</Button>
      <Popup
    trigger={<button> Create new user </button>}
    modal
  >
    {close => (
      <div >
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Enter new user information </div>
        <div className="actions">
          <input type="text" name="newUsername" placeholder="Username" size="22"/>
          <input type="text" name="newPassword" placeholder="Password" size="22"/>
           <Button> Submit </Button>
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