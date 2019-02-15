import React from "react"
import ListGroup from "react-bootstrap/ListGroup"

class RecipeList extends React.Component{
    render(){
        return(
            <ListGroup variant="flush">
                <ListGroup.Item>Turkey and Cheese Sandwich</ListGroup.Item>
                <ListGroup.Item>Tomato Basil Soup</ListGroup.Item>
                <ListGroup.Item>Ceasar Salad</ListGroup.Item>
                <ListGroup.Item>Chicken Parmeasan</ListGroup.Item>
            </ListGroup>
        )
    }
}

export default RecipeList