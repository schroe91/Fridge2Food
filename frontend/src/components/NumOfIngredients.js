import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import IngredientList from "./IngredientList";
import NewIngredients from "./NewIngredient";
import { NavLink } from 'react-router-dom';

class NumOfIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 0,
			userId : 0,
		}

		this.updateNum = this.updateNum.bind(this);
	}

	updateNum(list) {
		const newState = this.state;
		newState.num = list.length;
		newState.userId = this.props.user;
		this.setState(newState);
	}

	render() {
		return (
			<ListGroup>
				<ListGroupItem className="justify-content-between py-2" style={label}># of Ingredients
					<Badge style={badge} pill>{this.state.num}</Badge>
				</ListGroupItem>
				<div>
					<div style={listStyle}>
						<IngredientList setNumOfIngredients={this.updateNum} userId = {this.state.userId} />
					</div>
				</div>
				<NewIngredients />
				<div>
					<div style={listStyle}>
						<button className="button" id="tosubs"><NavLink exact to="/substitutions" activeClassName="active">Ingredient Substutitions</NavLink></button>
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
const label = {
	width: "100%",
}

const listStyle = {
	display: "inline"
}