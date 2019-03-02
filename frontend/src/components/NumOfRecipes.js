import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class NumOfRecipes extends React.Component {
	render() {
		return (
			<ListGroup>
        <ListGroupItem className="justify-content-between py-1" style={size}># of Recipes 
					<Badge pill style={badge}>1000000</Badge>
				</ListGroupItem>
			</ListGroup>
		);
	}
}

export default NumOfRecipes;

const size = {
	maxWidth: "200px",
	width: "110%",
}

const badge = {
	float: "right",
	marginTop: "3px",
}