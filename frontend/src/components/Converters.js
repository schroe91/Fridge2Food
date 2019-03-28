import React from "react";
import "./Converters.css"

class Converters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			measurement: 0,
			tempSelected: "f",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(ev) {
		ev.preventDefault();
		var temp = this.state.value;

		if(this.state.tempSelected === "c") {
			temp -= 32;
			temp *= (5.0/9.0);
			temp = Math.round(temp);
			this.setState({measurement: temp});
		} else if(this.state.tempSelected === "f") {
			temp *= (9.0/5.0);
			temp += 32;
			temp = Math.round(temp);
			this.setState({measurement: temp});
		}
	}

	handleChange(ev) {
		this.setState({value: ev.target.value});
	}

	handleOptionChange(ev) {
		this.setState({
			tempSelected: ev.target.value
		});
	}

	render() {
		return (
			<div>
				<div id="temp">
					<label>Your Temp:</label>
					<label id="convertLabel">Convert To:</label>
					<form id="tempForm" onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="temperature"
							placeholder="Temperature"
							value={this.state.value}
							id="tempInput"
							onChange={this.handleChange}
						>
						</input>
						<label>
							<input 
								type="radio" 
								value="f" 
								checked={this.state.tempSelected === "f"}
								onChange={this.handleOptionChange}
								/>
							°F
						</label>
						<label>
							<input 
								type="radio" 
								value="c" 
								checked={this.state.tempSelected === "c"}
								onChange={this.handleOptionChange}
								/>
							°C
						</label>
					</form>
					<label id="resultTemp">Result: {this.state.measurement}</label>
				</div>
				<div id="volume">

				</div>
			</div>
		)
	}
}
export default Converters;