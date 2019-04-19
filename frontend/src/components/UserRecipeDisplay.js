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
        let display = false;
        if(this.props.userRecipes.length !== 0)
            display = true;

        return (
            <div>
                <h5>User Recipes</h5>
                <ul>{display ? this.UserRecipeDisplay() : (<h5>No User Recipes</h5>)}
                </ul>
            </div>
        )
    }

} export default UserRecipeDisplay