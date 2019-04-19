import React from "react";

class prep_steps extends React.Component {
    constructor(props) {
        super(props);
        this.prep_steps = this.prep_steps.bind(this);
    }
    prep_steps() {
        return (<ul>
                {this.props.prep.split("\n").map((i,key) => 
                    <div key={key}>{i}</div>
                )}
                </ul>)
    }
    render() {
        return (
            <div>
                <h5>User Recipes</h5>
                <ul>{this.props.prep ? this.prep_steps() : <h5>No preparation steps</h5>}
                </ul>
            </div>
        )
    }

} export default prep_steps