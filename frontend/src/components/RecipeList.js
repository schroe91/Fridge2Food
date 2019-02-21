import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import "./RecipeList.css"

class RecipeList extends React.Component{
    render(){
        return(
            <ListGroup variant="flush">
                
                <a href="#" class= "list-group-item">Turkey and Cheese Sandwich</a>
                <a href="#" class= "list-group-item">Tomato Basil Soup</a>
                <a href="#" class= "list-group-item">Ceasar Salad</a>
                <a href="#" class= "list-group-item">Chicken Parmeasan</a>

                {/* <ListGroup.Item>Turkey and Cheese Sandwich</ListGroup.Item>
                <ListGroup.Item>Tomato Basil Soup</ListGroup.Item>
                <ListGroup.Item>Ceasar Salad</ListGroup.Item>
                <ListGroup.Item>Chicken Parmeasan</ListGroup.Item> */}
            </ListGroup>

        )
    }
}

export default RecipeList