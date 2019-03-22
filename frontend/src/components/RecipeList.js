import React from "react"
import "./RecipeList.css"
import PropTypes from "prop-types"
import ListGroup from 'react-bootstrap/ListGroup'
import NumOfRecipes from "./NumOfRecipes";

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: [],
            first: '',
            second: 0,
            link: '',
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/recipes')
        .then(response => response.json())
        .then(data => {this.setState({ recipes: data })})
    }

    componentWillUpdate() {
        //this.props.callback(this.state.recipes);
    }

    render(){
        return( 
            <div>
                <h3>Recipe List</h3>
                <ListGroup variant="flush"> 
                {this.state.recipes.map((recipe) => (
                        this.state.first = '/recipe/',
                        this.state.second = recipe.id,
                        this.state.link = this.state.first + this.state.second,
                        <a href={this.state.link} class="list-group-item">{recipe.name}</a>
                    ))}   
            </ListGroup>
        </div>);       

    }
}
export default RecipeList

NumOfRecipes.protoTypes = {
    callback : PropTypes.func,
}
/*          
<ul>
                    {this.state.recipes.map((recipe) => (
                        this.state.first = '/recipe',
                        this.state.second = recipe.id,
                        this.state.link = this.state.first + this.state.second,
                        <li><Link to={this.statelink}>{recipe.name}</Link></li>
                    ))}
                </ul>             
               
                      
< */