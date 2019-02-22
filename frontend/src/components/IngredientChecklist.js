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
        <div className="row mt-5">
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
/*
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

  */

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
  );

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
} */