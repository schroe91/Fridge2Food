import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import './RecipeFilter.css';

class recipefilter extends Component{
    render(){
        return(
            <div id="filters">
            <DropdownButton id="diet" title="Dietary Restrictions" size="sm">
                <Dropdown.Item href="#/action-1">Vegetarian</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegan</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Pescatarian</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Gluten-free</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Lactose-free</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="sort" title="Sort" size="sm">
                <Dropdown.Item href="#/action-1">Cooking Time</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Rating</Dropdown.Item>
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