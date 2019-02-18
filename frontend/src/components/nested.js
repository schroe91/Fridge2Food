import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';

/*const NestedLogin = () => (
  <Popup
    trigger={<button className="button"> Login </button>}
    position="bottom center"
    closeOnDocumentClick
  >
    <div>
      enter login information
      <input type="text" placeholder="Username" size="35" />
    </div>
    <div>
      <input type="text" placeholder="Password" size="35" />
    </div>
    <div>
      <Button>Submit</Button>
      <Button>Forgot Password</Button>
      <Button>Create New User</Button>
    </div>
  </Popup>
);

export default NestedLogin;*/

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
              value={this.state.value} onChange={this.handleChange}    
      />
    </div>
    <div>
      <input type="text" name="Password" placeholder="Password" size="35" value={this.state.value}
							onChange={this.handleChange}/>
    </div>
    <div onSubmit={this.handleSubmit}>
      <Button type="submit">Submit</Button>
      <Button>Forgot Password</Button>
      <Button>Create New User</Button>
    </div>
    </Popup>
    )
  }
}
export default NestedLogin;