import React from "react";

const Recipe = ({match}) => {

    /*fetch('http://127.0.0.1:5000/api/recipes?=', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({recipe: toSearch})
      }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
    */return(<h1>Your recipe is {match.params.recipe}</h1>)
  }
  
export default Recipe;