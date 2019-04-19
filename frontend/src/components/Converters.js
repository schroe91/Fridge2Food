import React from "react";
import "./Converters.css";

class Converters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			measurement: "",
			tempSelected: "f",
			convertFrom: "Cups",
			convertTo: "Cups",
			conversion: "",
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
		var temp = this.state.value1;

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
		var temp;
		var rounded;

		if (this.state.convertFrom !== this.state.convertTo) {
			if (this.state.convertFrom === "Cups") {
				temp = this.state.value2 * cupsTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Tablespoons") {
				temp = this.state.value2 * tbTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Teaspoons") {
				temp = this.state.value2 * tspTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Pints") {
				temp = this.state.value2 * pintsTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Quarts") {
				temp = this.state.value2 * quartsTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Gallons") {
				temp = this.state.value2 * gallonsTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Liters") {
				temp = this.state.value2 * litersTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} else if(this.state.convertFrom === "Mililiters") {
				temp = this.state.value2 * miliTo[this.state.convertTo];
				rounded = Math.round(temp * 10) / 10;
				this.setState({ conversion: rounded.toFixed(1) });
			} 
		} else
			this.setState({ conversion: this.state.value2 });
	}

	handleTempChange(ev) {
		this.setState({ value1: ev.target.value });
	}

	handleMeasureChange(ev) {
		this.setState({ value2: ev.target.value });
	}

	handleOptionChange(ev) {
		this.setState({ tempSelected: ev.target.value });
	}

	handleConvertFrom(ev) {
		this.setState({ convertFrom: ev.target.value, conversion: "" });
	}

	handleConvertTo(ev) {
		this.setState({ convertTo: ev.target.value, conversion: "" });
	}

	render() {
		return (
			<div id="converters">
				<div id="temp">
					<label>Your Temp:</label>
					<label id="convertLabel">Convert To:</label>
					<form id="tempForm" onSubmit={this.handleTempSubmit}>
						<input
							type="number"
							name="temperature"
							value={this.state.value1}
							id="tempInput"
							onChange={this.handleTempChange}
						/>
						<label id="FRadio">
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
								type="number"
								name="measurement"
								value={this.state.value2}
								id="measureInput"
								onChange={this.handleMeasureChange}
							/>
							<select name="select" onChange={this.handleConvertFrom}>
								{dropdown.map(item => (
									<option value={item} selected={this.state.convertFrom === item} key={item}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div id="convertTo">
							To:
							<select name="select" id="to" onChange={this.handleConvertTo}>
								{dropdown.map(item => (
									<option value={item} selected={this.state.convertTo === item} key={item}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div id="result">
							<button className="btn btn-primary" onClick={this.handleMeasureSubmit}>Convert</button>
							<label id="measureResult">Result: {this.state.conversion}</label>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
export default Converters;

const dropdown = ["Cups", "Tablespoons", "Teaspoons", "Pints", "Quarts", "Gallons", "Liters", "Mililiters"];
//Conversion variables
const cupsTo = { Tablespoons: 16, Teaspoons: 48, Pints: 0.5, Quarts: 0.25, Gallons: 0.0625, Liters: 0.236588, Mililiters: 236.588 };
const tbTo = { Cups: 0.0625, Teaspoons: 3, Pints: 0.01325, Quarts: 0.015625, Gallons: 0.00390625, Liters: 0.0147868, Mililiters: 14.7868 };
const tspTo = { Cups: 0.0208333, Tablespoons: 0.3333333, Pints: 0.0104167, Quarts: 0.00520833, Gallons: 0.00130208, Liters: 0.00492892, Mililiters: 4.92892};
const pintsTo = { Cups: 2, Tablespoons: 32, Teaspoons: 96, Quarts: 0.5, Gallons: 0.125, Liters: 0.473176, Mililiters: 473.176 };
const quartsTo = { Cups: 4, Tablespoons: 64, Teaspoons: 192, Pints: 2, Gallons: 0.25, Liters: 0.946353, Mililiters: 946.353 };
const gallonsTo = { Cups: 16, Tablespoons: 256, Teaspoons: 768, Pints: 8, Quarts: 4, Liters: 3.78541, Mililiters: 3785.41 };
const litersTo = { Cups: 4.22675, Tablespoons: 67.628, Teaspoons: 202.884, Pints: 2.11338, Quarts: 1.05669, Gallons: 0.264172, Mililiters: 1000 };
const miliTo = { Cups: 0.00422675, Tablespoons: 0.067628, Teaspoons: 0.202884, Pints: 0.00211338, Quarts: 0.00105669, Gallons: 0.000264172, Liters: 0.001 };