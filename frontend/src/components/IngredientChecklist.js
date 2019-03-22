import React, { Component } from "react";
import Checkbox from "./Checkbox";

const OPTIONS = ["Bread", "Chicken", "Lettuce", "Beef", "Turkey", "Ham", "Rice", "Tomato", "Bacon", "Mayonnaise"];

class IngredientChecklist extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  state = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    if(this.state.checkboxes[name])
      this.props.removeIngredient(name);
    else
      this.props.addIngredient(name);

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  //Used for when a checklist ingredient is removed from the list
  //Updates the checklist accordingly
  handleDeleteFromParent(name) {
    alert(name);
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  //Used for when the Delete All button is pressed
  //Updates the checklist accordingly
  handleDeleteAllFromParent() {
    const newState = this.state;
    newState.checkboxes = OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
    this.setState(newState);
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        if(!this.selectedCheckboxes.has(checkbox.name) > -1) {
          this.addItem(checkbox.name);
        }
      });
  };

  addItem(item) {
    this.setState(({ selectedCheckboxes }) => ({
      selectedCheckboxes: new Set(selectedCheckboxes).add(item)
    }));
  }

  createCheckbox = OPTIONS => (
    <Checkbox
      label={OPTIONS}
      isSelected={this.state.checkboxes[OPTIONS]}
      onCheckboxChange={this.handleCheckboxChange}
      key={OPTIONS}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    return (
      <div style={checkList}>
        <form onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}
          <div className="form-group mt-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default IngredientChecklist;
const checkList = {
  marginTop: "20px",
}