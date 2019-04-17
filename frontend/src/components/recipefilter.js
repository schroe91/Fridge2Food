import React, { Component } from "react";
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
      ),
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeMeal = this.handleChangeMeal.bind(this);
  }

  filter_recipe() {
    fetch('http://127.0.0.1:5000/api/recipes', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }

    })
  }

  handleChangeSort(ev) {
    this.props.setSort(ev);
  }
  handleChangeMeal(ev) {
    this.props.setMeal(ev);
  }

  handleClick(index) {
    // alert(this.state.value)
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
            onChange={this.handleClick}
            placeholderButtonLabel="Restrictions"
          />
        </div>
        <div id="sortBy">
          <ReactMultiSelectCheckboxes
            options={sortBy}
            isSearchable={false}
            onChange={this.handleChangeSort}
            isMulti={false}
            placeholderButtonLabel="Sort By"
          />
        </div>
        <div id="MealType">
        <ReactMultiSelectCheckboxes
          options={mealType}
          isSearchable={false}
          onChange={this.handleChangMeal}
          isMulti={false}
          placeholderButtonLabel="Meal Type"
        />
        </div>
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

const sortBy = [
  { value: 1, label: "Calories" },
  { value: 2, label: "Cooking Time" },
  { value: 3, label: "Rating" },
]

const mealType = [
  { value: 1, label: "Breakfast" },
  { value: 2, label: "Lunch" },
  { value: 3, label: "Dinner" },
  { value: 5, label: "Dessert" },
]



                //<DropdownButton><DropdownButton id="diet" title="Dietary Restrictions" size="sm">
/**<DropdownButton id="sort" title="Sort By" >
                <Dropdown.Item as="button" eventKey='Cooking Time'>Cooking Time </Dropdown.Item>
                <Dropdown.Item as="button" >Rating</Dropdown.Item>
                <Dropdown.Item as="button" >Calories</Dropdown.Item>
                </DropdownButton> 
                
                </div>
        <DropdownButton id="mealType" title="Meal Type">
          <Dropdown.Item as="button" id="Breakfast">Breakfast</Dropdown.Item>
          <Dropdown.Item as="button" id="Lunch">Lunch</Dropdown.Item>
          <Dropdown.Item as="button" id="Dinner">Dinner</Dropdown.Item>
          <Dropdown.Item as="button" id="Dessert">Dessert</Dropdown.Item>
        </DropdownButton>
      </div>*/

/**<div id="sortBy">
          <select value={this.state.sortValue} onChange={this.handleChange} id="selectSort">
            <option value="Cooking Time">Cooking Time</option>
            <option value="Rating">Rating</option>
            <option value="Calories">Calories</option>
          </select>
        </div> */
