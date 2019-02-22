import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import IngredientList from "./IngredientList";
import IngredientChecklist from "./IngredientChecklist";

class NumOfIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 0
		}

		this.updateNum = this.updateNum.bind(this);
	}

	updateNum(value) {
		const newState = this.state;
		newState.num = newState.num + value;
		this.setState(newState);
	}

	render() {
		return (
			<ListGroup>
        <ListGroupItem className="justify-content-between"># of Ingredients
					<Badge style={badge} pill>{this.state.num}</Badge>
				</ListGroupItem>
				<div id="input" style={input}>
					<IngredientChecklist funct={this.updateNum}/>
					<IngredientList funct={this.updateNum} />
				</div>
			</ListGroup>
		);
	}
}

export default NumOfIngredients;

const badge = {
	marginLeft: "25px",
}

const input = {
	display: "flex",
}