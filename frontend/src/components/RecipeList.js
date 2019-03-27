import React from "react"
import "./RecipeList.css"
import ListGroup from 'react-bootstrap/ListGroup'

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            first: '',
            second: 0,
            link: '',
        };
    }

    componentDidMount() {
        fetch('/api/recipes')
            .then(response => response.json())
            .then(data => { this.setState({ recipes: data }) })
    }   

    componentDidUpdate(prevProps, prevState) {
        if(this.state.recipes !== prevState.recipes)
            this.props.setNumOfRecipes(this.state.recipes); //Sends recipe array to Home.js (the parent)
    }

    render() {
        return (
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
