import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class NumOfRecipes extends React.Component {
	render() {
		return (
			<ListGroup>
        		<ListGroupItem className="justify-content-between"># of Recipes <Badge pill>4</Badge></ListGroupItem>
			</ListGroup>
		);
	}
}

export default NumOfRecipes;