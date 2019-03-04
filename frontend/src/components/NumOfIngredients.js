import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import IngredientList from "./IngredientList";
import IngredientChecklist from "./IngredientChecklist";
import './NumOfIngredients.css';


class NumOfIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 0
		}

		this.updateNum = this.updateNum.bind(this);
	}

	updateNum(value, numToDel) {
		const newState = this.state;

		if(value === "delAll") {
			newState.num -= numToDel;
		} else {
			newState.num = newState.num + value;
		}
		this.setState(newState);
	}

	render() {
		return (
			<ListGroup>
				<ListGroupItem className="justify-content-between py-2" style={label}># of Ingredients
					<Badge style={badge} pill>{this.state.num}</Badge>
				</ListGroupItem>
				<div id="list">
				<IngredientList funct={this.updateNum} />
				<div id="input" style={input}>
					<IngredientChecklist funct={this.updateNum}/>
				</div>
				</div>
			</ListGroup>
		);
	}
}

export default NumOfIngredients;

const badge = {
	float: "right",
	marginTop: "3px",
}
const input = {
	display: "flex",
}
const label = {
	width: "85%",
	marginLeft: "15px",
}