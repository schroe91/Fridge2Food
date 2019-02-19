import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';
import {browserHistory} from 'react-router';

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

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleSubmit(ev) {
		ev.preventDefault();
    browserHistory.push('/login');
		this.setState({
      username: '',
      Password: '',
		});
	}
  render(){
    return (
    <Popup
    trigger={<button className="button"> Login </button>}
    position="bottom center"
    closeOnDocumentClick
    >
    <div>
      enter login information
      <input type="text" name="username" placeholder="Username" size="35"
              value={this.state.value} onChange={(event,newValue) => this.setState({username:newValue})}    
      />
    </div>
    <div>
      <input type="text" name="Password" placeholder="Password" size="35" value={this.state.value}
						onChange={(event,newValue) => this.setState({Password:newValue})}/>
    </div>
    <div onSubmit={this.handleSubmit}>
      <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
      <Button>Forgot Password</Button>
      <Button>Create New User</Button>
    </div>
    </Popup>
    )
  }
}
export default NestedLogin;