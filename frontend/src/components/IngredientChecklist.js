import React, { Component } from "react";
import Checkbox from "./Checkbox";

const OPTIONS = ["Bread", "Chicken", "Lettuce", "Beef", "Turkey", "Ham", "Rice", "Tomato", "Bacon", "Mayonnaise"];

class IngredientChecklist extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
      ),
      numOfIngredients: 0,
      list: []
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }*/


  
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = option => {
    if (this.selectedCheckboxes.has(option)) {
      alert("delete");
      this.selectedCheckboxes.delete(option);
    } else {
      this.selectedCheckboxes.add(option);
      alert("add");
    }
  }

  handleFormSubmit = ev => {
    ev.preventDefault();
    var curr = 0;
    for (const checkbox of this.selectedCheckboxes) {
      alert(checkbox, 'is selected.');
      curr++;
    }
    alert(curr);
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

  /*handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit(ev) {
    ev.preventDefault();
    var curr = 0;

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        if(this.state.list.indexOf(checkbox) === -1) {
          this.state.list.unshift(checkbox);
          curr++;
        }
      });
      this.props.funct(curr - this.state.numOfIngredients);
      alert(this.state.checkboxes);
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );*/

  //createCheckboxes = () => OPTIONS.map(this.createCheckbox);

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