import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import './RecipeFilter.css';
import DropdownMenu from "react-bootstrap/DropdownMenu";

class recipefilter extends Component{
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    
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
            <DropdownButton id="diet" title="Dietary Restrictions" aria-expanded={this.state.isToggleOn} button onClick={this.handleClick}>

                <Dropdown.Item href="#/action-1">Vegetarian</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegan</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Pescatarian</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Gluten-free</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Lactose-free</Dropdown.Item>
            </DropdownButton>

            
                <DropdownButton id="sort" title="Sort By" size="sm">
                <Dropdown.Item href="#/action-1">Cooking Time</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Rating</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Calories</Dropdown.Item>
                </DropdownButton>

            <DropdownButton id="meal type" title="Meal Type" size="sm">
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
