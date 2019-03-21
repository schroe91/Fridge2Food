import React from "react"
import "./RecipeList.css"
import {Link} from 'react-router';

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: [],
        };
    }

    /*componentDidMount() {
        fetch('http://127.0.0.1:5000/api/recipes/get_all_recipes')
            .then(response => {
                response.json();
            }).then(data => {
                let recipes = data.response.map((recipe) => {
                    return(
                        <div key={recipe.result}>
                        </div>
                    )
                })
                this.setState({recipes: recipes});
                console.log("state",this.state.recipes);
            })
    }
*/
    render(){
        return( 
            <div>
                <ul>
                    {this.state.recipes.map((recipe,index) => (
                        <li><Link to={recipe.index}>{recipe.index}</Link></li>
                    ))}
                </ul>
        </div>);       

    }
}

/*                       
                <ListGroup variant="flush">   
                <a href="#" class= "list-group-item">Turkey and Cheese Sandwich</a>
                <a href="#" class= "list-group-item">Tomato Basil Soup</a>
                <a href="#" class= "list-group-item">Ceasar Salad</a>
                <a href="#" class= "list-group-item">Chicken Parmeasan</a>      
            </ListGroup>
                      
< */

export default RecipeList