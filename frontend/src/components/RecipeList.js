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
            ingredients: [],
        };
    }

    getingredients(){
        console.log(this.props.userId)
        if(this.props.userId !== ''){
        fetch('/users/' + this.props.userId, {
            method: "GET"
        }).then(response=>response.json)
        .then(data=>{this.setState({ingredients: data.ingredients})})
        .catch((error) =>{
            console.log("no valid user is logged in")
        })
    }
    }

    componentDidMount() {
        this.getingredients();
        if(this.props.search){
            this.setState({recipes:this.props.id})
        }else{
        fetch('/api/recipes').then(response =>{ 
            if(response.ok){
                //this.setState({isAuth : true})
                    return response.json();
            }else{
                return Promise.reject(new Error("No recipes"));
            }
            }).then(data => {
                this.setState({ recipes: data })
            }, error=> alert(error.toString()))
            .catch((error) =>{
                console.log("No recipes found");
            });
              
        }
    }   

    componentDidUpdate(prevProps, prevState) {
        if((this.state.recipes !== prevState.recipes) || this.props.search){
            this.props.setSearch(0);
            this.setState({
                recipes: this.props.recipes
            })
            this.props.setNumOfRecipes(this.state.recipes); //Sends recipe array to Home.js (the parent)
        }
    }

    render() {
        return (
            <div id='a'>
                <h3>Recipe List</h3>
                <ListGroup variant="flush">
                    {this.state.recipes.map((recipe) => (
                        this.state.first = '/recipe/',
                        this.state.second = recipe.id,
                        this.state.link = this.state.first + this.state.second,
                        <a href={this.state.link} key={this.state.link} className="list-group-item">{recipe.name}</a>
                    ))}   
                </ListGroup>
            </div>);

    }
}
export default RecipeList

