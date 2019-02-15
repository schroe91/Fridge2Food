import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';

const NestedLogin = () => (
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

export default NestedLogin;