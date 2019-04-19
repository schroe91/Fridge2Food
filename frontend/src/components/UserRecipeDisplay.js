import React from "react";

class UserRecipeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.UserRecipeDisplay = this.UserRecipeDisplay.bind(this);
    }
    UserRecipeDisplay() {
        return (<ul>
            {this.props.userRecipes.map((item) => (
                <li>
                    {item.name}
                </li>
            ))}
        </ul>);
    }
    render() {
        return (
            <div>
                <h5>User Recipes</h5>
                <ul>{this.props.userRecipes ? this.UserRecipeDisplay() : <h5>No User Recipes</h5>}
                </ul>
            </div>
        )
    }

} export default UserRecipeDisplay