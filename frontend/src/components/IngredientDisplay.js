import React from "react";

class IngredientDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.IngredientDisplay = this.IngredientDisplay.bind(this);
  }

  IngredientDisplay() {
    return (<ul>
      {this.props.ingredients.map((item) => (
        <li>
          {item.name}
        </li>
      ))}
    </ul>)
  }
  render() {
    return (
      <div>
        <h5>User Ingredients</h5>
        {console.log("current ingredients: " + this.props.ingredient)}
        <ul>{(this.props.ingredients.length > 0) ? this.IngredientDisplay() : <h5>No Ingredients</h5>}
        </ul>
      </div>
    )
  }
} export default IngredientDisplay