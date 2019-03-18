import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class NumOfRecipes extends React.Component {
	render() {
		return (
			<ListGroup>
        		<ListGroupItem className="py-2"># of Recipes 
					<Badge pill style={badge}>4</Badge>
				</ListGroupItem>
			</ListGroup>
		);
	}
}

export default NumOfRecipes;

const badge = {
	float: "right",
	marginTop: "3px",
}