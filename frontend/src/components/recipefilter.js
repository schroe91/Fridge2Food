import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown";
import './RecipeFilter.css';
import Form from 'react-bootstrap/Form';

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
            <Form>
              {['checkbox'].map(type => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check inline label="vegetarian" type={type} id={`inline-${type}-vegetarian`} />
                  <Form.Check inline label="vegan" type={type} id={`inline-${type}-vegan`} />
                  <Form.Check inline label="gluten-free" type={type} id={`inline-${type}-gluten-free`}/>
                  <Form.Check inline label="lactose-free" type={type} id={`inline-${type}-lactose-free`}/>
                </div>
              ))}
            </Form>
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
