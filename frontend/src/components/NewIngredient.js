import React from "react";
import Popup from "reactjs-popup";
import { Button } from 'reactstrap';

const NewIngredient = () => (
  <Popup
    trigger={<button className="button"> Add New Ingredient </button>}
    position="bottom center"
    closeOnDocumentClick
  >
    <div>
      Add New Ingredient
      <input type="text" placeholder="Ingredient to be added" size="35" />
    </div>
    <div>
      <Button>Submit</Button>
      <Button>Cancel</Button>
    </div>
  </Popup>
);

export default NewIngredient;