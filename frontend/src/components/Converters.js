import React from "react";
import "./Converters.css";

const dropdown = ["Cups", "Tablespoons", "Teaspoons", "Pints", "Quarts", "Gallons", "Liters", "Mililiters"];

class Converters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			measurement: 0,
			tempSelected: "f",
			convertFrom: "From",
			convertTo: "To",
		};

		this.handleTempSubmit = this.handleTempSubmit.bind(this);
		this.handleMeasureSubmit = this.handleMeasureSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleTempChange = this.handleTempChange.bind(this);
		this.handleMeasureChange = this.handleMeasureChange.bind(this);
		this.handleConvertFrom = this.handleConvertFrom.bind(this);
		this.handleConvertTo = this.handleConvertTo.bind(this);
	}

	handleTempSubmit(ev) {
		ev.preventDefault();
		var temp = this.state.value;

		if (this.state.tempSelected === "c") {
			temp -= 32;
			temp *= (5.0 / 9.0);
			temp = Math.round(temp);
			this.setState({ measurement: temp });
		} else if (this.state.tempSelected === "f") {
			temp *= (9.0 / 5.0);
			temp += 32;
			temp = Math.round(temp);
			this.setState({ measurement: temp });
		}
	}

	handleMeasureSubmit(ev) {
		ev.preventDefault();


	}

	handleTempChange(ev) {
		this.setState({ value: ev.target.value });
	}

	handleMeasureChange(ev) {
		this.setState({ value: ev.target.value });
	}

	handleOptionChange(ev) {
		this.setState({
			tempSelected: ev.target.value
		});
	}

	handleConvertFrom(ev) {
		this.setState({ convertFrom: ev.target.value })
	}

	handleConvertTo(ev) {
		this.setState({ convertTo: ev.target.value })
	}

	render() {
		return (
			<div id="converters">
				<div id="temp">
					<label>Your Temp:</label>
					<label id="convertLabel">Convert To:</label>
					<form id="tempForm" onSubmit={this.handleTempSubmit}>
						<input
							type="text"
							name="temperature"
							placeholder="Temperature"
							value={this.state.value}
							id="tempInput"
							onChange={this.handleTempChange}
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
				<div id="measure">
					<form id="measureForm">
						<div id="convertFrom">
							<input
								type="text"
								name="measurement"
								value={this.state.value}
								id="measureInput"
								onChange={this.handleMeasureChange}
							/>
							<select name="select" onChange={this.handleConvertFrom}>
								{dropdown.map(item => (
									<option value={item} selected={this.state.convertFrom === item}>{item}</option>
								))}
							</select>
						</div>
						<div id="convertTo">
							To:
							<select name="select" id="to" onChange={this.handleConvertTo}>
								{dropdown.map(item => (
									<option value={item} selected={this.state.convertTo === item}>{item}</option>
								))}
							</select>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
export default Converters;