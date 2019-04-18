import React from "react";

class FavoriteRecipeDisplay extends React.Component {
    constructor(props){
        super(props);
        this.FavoriteRecipeDisplay = this.FavoriteRecipeDisplay.bind(this);
      }
  FavoriteRecipeDisplay(){
      return (<ul>
          <h5>Favorite Recipes</h5>
          {this.props.favorites.map((item) => (
          <li>
            {item.name}
          </li>
        ))}
      </ul>);
  }
render(){
    return(
        <div>
            {console.log("favoriotes: " + this.props.favorites)}
            <ul>{this.props.favorite ? this.FavoriteRecipeDisplay() :<h5>No Favorite Recipes</h5>}
            </ul>
        </div>
    )
}

}export default FavoriteRecipeDisplay