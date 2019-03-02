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
      this.props.funct(-1);
    else
      this.props.funct(1);

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
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
      <div className="container">
        <div className="row mt-3">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary">
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