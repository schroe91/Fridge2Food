import React from "react"
import "./RecipeList.css"
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            first: '',
            second: 0,
            link: '',
            ingredients: [],
            num: '',
        };
        this.sort = this.sort.bind(this)
        this.getRecipes = this.getRecipes.bind(this)
        this.updated = this.updated.bind(this)
    }

    /*export updated(){
        this.getingredients();
        this.getRecipes();
       // this.setState({num:this.props.num})
    }*/

    getingredients(){
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
    
    componentWillMount() {
        var more = false;
        if(this.props.search){
            this.setState({recipes:this.props.id})
        }else{
            var link = '/api/recipes';
            if(this.props.filters && this.props.filters.length > 0){
                link += '?type=';
                more = true;
                this.state.filters.map((filters) => (
                    link += filters + ',')
                )
            }
            if(this.state.ingredients && this.state.ingredients.length > 0){
                if(!more){
                    link += '?ingredients';
                    more = true;
                }else{
                    link += '&ingredients';
                }
                this.state.ingredients.map((ingredients) => (
                    link += ingredients.id + ',' )
                )
                //map each ingredient id to link
            }
            if(this.props.meal){
                if(!more){
                    link += '?meal='
                    more = true;
                }else{
                    link += '&meal='
                }
                link += this.props.meal;
            }
	    console.log(link)
	    
	    fetch(link).then(response =>{ 
            if(response.ok){
                //this.setState({isAuth : true})
                    return response.json();
            }else{
                return Promise.reject(new Error("No recipes"));
            }
            }).then(data => {
                this.setState({ recipes: data })
                this.sort();
            }, error=> alert(error.toString()))
            .catch((error) =>{
                console.log("No recipes found");
            });
              
        }
    }

    componentDidMount() {
        this.updated();
    }   

    componentDidUpdate(prevProps, prevState) {
        /*console.log("update")
        console.log("current num: " + this.props.NumofIngredients)
        console.log("new num: " + prevProps.NumofIngredients)
        if(this.props.NumofIngredients !== prevProps.NumofIngredients){
            this.numUpdated();
        }*/
        if((this.state.recipes !== prevState.recipes) || this.props.search){
            this.props.setSearch(0);
            this.setState({
                recipes: this.props.recipes
            })
	    this.sort();
            this.props.setNumOfRecipes(this.state.recipes); //Sends recipe array to Home.js (the parent)
        }
    }

    sort(){
        if(this.props.sort === 'calories'){
            this.state.recipes.sort(function(a,b){return a.calories -b.calories})
        }else if(this.props.sort === 'cooking time'){
            this.state.recipes.sort(function(a,b){return a.prep_time -b.prep_time})
        }else if(this.props.sort === 'rating'){
            this.state.recipes.sort(function(a,b){return b.rating - a.rating})
        }else{
            this.state.recipes.sort();
        }
    }

    render() {
        return (
            <div id='a'>
                <h3>Recipe List</h3>
                <ListGroup variant="flush">
                    {this.state.recipes.map((recipe) => (
                            <a href={'recipe/' + recipe.id} key={'recipe/' + recipe.id} className="list-group-item">{recipe.name}</a>
                    ))}   
                </ListGroup>
            </div>);

    }
}
export default RecipeList

