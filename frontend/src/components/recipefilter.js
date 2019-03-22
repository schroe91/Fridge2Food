import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import './RecipeFilter.css';

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

    render(){
        return(
            <div id="filters">
              <ReactMultiSelectCheckboxes options={filters} isSearchable={false}/>
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

const filters = [
  {value: 1, label: "Gluten Free"},
  {value: 2, label: "Lactose Free"},
  {value: 3, label: "Vegan"},
  {value: 4, label: "Vegetarian"},
]
                //<DropdownButton><DropdownButton id="diet" title="Dietary Restrictions" size="sm">
