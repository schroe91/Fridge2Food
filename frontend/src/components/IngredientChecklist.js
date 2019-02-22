import React, { Component } from "react";
import Checkbox from "./Checkbox";

const OPTIONS = ["Bread", "Chicken", "Lettuce", "Beef", "Turkey", "Ham", "Rice", "Tomato", "Bacon", "Mayonnaise"];

class IngredientChecklist extends Component {  
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = option => {
    //alert(option.label);
    if (this.selectedCheckboxes.has(option)) {
      //alert("delete");
      this.selectedCheckboxes.delete(option);
    } else {
      this.selectedCheckboxes.add(option);
      //alert("add");
    }
  }

  handleFormSubmit = ev => {
    alert(ev.target.value.name);
    ev.preventDefault();
    var curr = 0;
    for (const checkbox of this.selectedCheckboxes) {
      //alert(checkbox, 'is selected.');
      curr++;
    }
    //alert(curr);
  }

  createCheckbox = option => (
    <Checkbox
      label={option}
      onCheckboxChange={this.toggleCheckbox}
      key={option}
    />
  );

  createCheckboxes = () => (
    OPTIONS.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form style={list} onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientChecklist;

const list = {
  marginTop: "-30px",
}