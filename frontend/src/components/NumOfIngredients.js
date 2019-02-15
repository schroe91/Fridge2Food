import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class NumOfIngredients extends React.Component {
	render() {
		return (
			<ListGroup>
        		<ListGroupItem className="justify-content-between"># of Ingredients<Badge pill>0</Badge></ListGroupItem>
			</ListGroup>
		);
	}
}

export default NumOfIngredients;