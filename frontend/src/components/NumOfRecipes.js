import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class NumOfRecipes extends React.Component {
	render() {
		return (
			<ListGroup style={size}>
        		<ListGroupItem className="justify-content-between py-2"># of Recipes 
					<Badge pill style={badge}></Badge>
				</ListGroupItem>
			</ListGroup>
		);
	}
}

export default NumOfRecipes;

const size = {
	marginTop: "-1px",
	position: "absolute",
	left: "82%",
	width: "12%"
}
const badge = {
	float: "right",
	marginTop: "3px",
}