import React from "react";
import Popup from "reactjs-popup";
//

const NewUser = () => (
  <Popup
    trigger={<button className="button"> New User </button>}
    position="bottom center"
    closeOnDocumentClick
  >
    <div>
      Enter New User Information
      <input type="text" placeholder="Username" size="35" />
    </div>
    <div>
      <input type="text" placeholder="Password" size="35" />
    </div>
    <div>
      <input type="text" placeholder="E-mail" size="35" />
    </div>
  </Popup>
);

export default NewUser;