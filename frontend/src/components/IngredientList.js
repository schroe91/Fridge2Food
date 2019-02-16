import React from "react"
import ListGroup from "react-bootstrap/ListGroup"

class IngredientList extends React.Component{
    render(){
        return(
            <ListGroup variant="flush">
                <ListGroup.Item>Chicken</ListGroup.Item>
            </ListGroup>
        )
    }
}

export default IngredientList