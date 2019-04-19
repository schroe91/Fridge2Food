import React from 'react'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import IngredientList from "./IngredientList";
import { NavLink } from 'react-router-dom';
//import {updated} from './RecipeList';

class NumOfIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 0,
		}

		this.updateNum = this.updateNum.bind(this);
	}

	updateNum(list) {
		const newState = this.state;
		newState.num = list.length;
		this.setState(newState);
		//var num = list.length;
		//this.props.setNumOfIngredients(num)
		//updated();
	}

	render() {
		return (
			<ListGroup>
				<ListGroupItem className="justify-content-between py-2" style={label}># of Ingredients
					<Badge style={badge} pill>{this.state.num}</Badge>
				</ListGroupItem>
				<div>
					<div style={listStyle}>
						<IngredientList setNumOfIngredients={this.updateNum} userId={this.props.user} />
					</div>
				</div>
				<div>
					<div style={listStyle}>
						<button className="button" id="tocreaterecipe"><NavLink exact to="/CreateRecipe" activeClassName="active">Create New Recipe</NavLink></button>
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