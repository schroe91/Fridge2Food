import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import './RecipeFilter.css';

class recipefilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkboxes: filters.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
      )
    }
    this.sortValue = 'Sort By';
    this.title1 = "Dietary Restrictions";
    this.title2 = "Sort By";
    this.title3 = "Meal Type";
    this.handleClick = this.handleClick.bind(this);

  }
  filter_recipe() {
    fetch('http://127.0.0.1:5000/api/recipes', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }

    })

  }
  handleChange(event) {
    this.setState({ sortValue: event.target.value });
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }


  render() {
    return (
      <div id="filters">
        <div id="multiSelect">
          <ReactMultiSelectCheckboxes
            options={filters}
            isSearchable={false}
            onChange={this.handleChange}
          />
        </div>
        <div id="sortBy">
          <select value={this.state.sortValue} onChange={this.handleChange} id="selectSort">
            <option value="Cooking Time">Cooking Time</option>
            <option value="Rating">Rating</option>
            <option value="Calories">Calories</option>
          </select>
        </div>
        <DropdownButton id="mealType" title="Meal Type">
          <Dropdown.Item as="button" id="Breakfast">Breakfast</Dropdown.Item>
          <Dropdown.Item as="button" id="Lunch">Lunch</Dropdown.Item>
          <Dropdown.Item as="button" id="Dinner">Dinner</Dropdown.Item>
          <Dropdown.Item as="button" id="Dessert">Dessert</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}
export default recipefilter;

const filters = [
  { value: 1, label: "Gluten Free" },
  { value: 2, label: "Lactose Free" },
  { value: 3, label: "Vegan" },
  { value: 4, label: "Vegetarian" },
]
                //<DropdownButton><DropdownButton id="diet" title="Dietary Restrictions" size="sm">
/**<DropdownButton id="sort" title="Sort By" >
                <Dropdown.Item as="button" eventKey='Cooking Time'>Cooking Time </Dropdown.Item>
                <Dropdown.Item as="button" >Rating</Dropdown.Item>
                <Dropdown.Item as="button" >Calories</Dropdown.Item>
                </DropdownButton> */
