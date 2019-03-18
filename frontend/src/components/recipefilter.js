import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import './RecipeFilter.css';
import Checkbox from "./Checkbox";

class recipefilter extends Component{

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.title1 = "Dietary Restrictions";
        this.title2 = "Sort By";
        this.title3 = "Meal Type";
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
      }
/*
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
  marginLeft: "15px",
}
*/

    render(){
        return(
            <div id="filters">

            <DropdownButton id="diet" title={this.title1} aria-expanded={this.state.isToggleOn} button onClick={this.handleClick}>
                <Dropdown.Item href="#/action-1">Vegetarian</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegan</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Pescatarian</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Gluten-free</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Lactose-free</Dropdown.Item>
            </DropdownButton>

            
                <DropdownButton id="sort" title="Sort By">
                <Dropdown.Item href="#/action-1">Cooking Time</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Rating</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Calories</Dropdown.Item>
                </DropdownButton>

            <DropdownButton id="meal type" title="Meal Type">
                <Dropdown.Item href="#/action-1">Breakfast</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Lunch</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Dinner</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Dessert</Dropdown.Item>
            </DropdownButton>
            </div>
        );
    }
}
export default recipefilter;

                //<DropdownButton><DropdownButton id="diet" title="Dietary Restrictions" size="sm">
