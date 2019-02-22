import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';
import {browserHistory} from 'react-router';
import "./login.css"

class NestedLogin extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      username: '',
      Password: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  login(email, password) {
    console.log(email);
    console.log(password);
    fetch('http://127.0.0.1:5000/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
  }
    handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
    ev.preventDefault();
    const {email, password } = this.state;
    browserHistory.push('/login');
    this.login(email, password);
    this.setState({
      username: '',
      Password: '',
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
              value={this.state.value} onChange={(event,newValue) => this.setState({username:newValue})}    
      />
    </div>
    <div>
      <input type="text" name="Password" placeholder="Password" size="22" value={this.state.value}
						onChange={(event,newValue) => this.setState({Password:newValue})}/>
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