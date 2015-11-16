import React, { PropTypes} from "react";


function fixDecimals(s, decimals) {
	if (s.length > 0) {
		let p = s.indexOf(".");
		if (decimals > 0) {
			p += 1 + decimals;
		}
		s = s.substring(0, p);
	}
	return s;
}


function fixFloatString(s, decimals) {
	if (s.length > 0) {
		// Remove all non valid number characters
		s = s.replace(/[^\-\.\,\d]/g, "");

		// Replace comma with point
		s = s.replace(/[\,]/g, ".");

		// Remove all but leading "-"
		s = s.substring(0, 1) + s.substring(1).replace(/\-/g, "");

		// Remove all but first "."
		let p = s.indexOf(".");
		if (p !== -1) {
			p++;
			s = s.substring(0, p) + s.substring(p).replace(/\./g, "");
		}

		// Remove extra decimal digits
		s = fixDecimals(s, decimals);
	}
	return s;
}


function ftoa(f, decimals) {
	if (isNaN(f)) {
		return "";
	}
	return fixDecimals(`${f}`, decimals);
}


function atof(a, decimals) {
	return parseFloat(fixFloatString(a, decimals));
}


export default class FloatInput extends React.Component {
	static displayName = "FloatInput";

	static propTypes = {
		size: PropTypes.number,
		// maxLength: PropTypes.number,
		value: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
		decimals: PropTypes.number,
		label: PropTypes.string,
		addonAfter: PropTypes.string,
		bsStyle: PropTypes.oneOf(["success", "warning", "error"]),
		disabled: PropTypes.bool,
		onChange: PropTypes.func,
		inputClass: PropTypes.string,
		labelClass: PropTypes.string,
	};

	static defaultProps = {
		size: null,
		// maxLength: null,
		value: NaN,
		min: -Number.MAX_VALUE,
		max: +Number.MAX_VALUE,
		decimals: 3,
		label: null,
		addonAfter: null,
		bsStyle: null,
		disabled: false,
		onChange: null,
		inputClass: null,
		labelClass: null,
	};

	trailingPoint = false;
	trailingZeros = 0;

	onChange(event) {
		const s = event.target.value;
		const p = s.lastIndexOf(".");
		if (p === -1) {
			this.trailingPoint = false;
			this.trailingZeros = 0;
		} else {
			this.trailingZeros = 0;
			for (let i = s.length - 1; i > p && s.charAt(i) === "0"; i--) {
				this.trailingZeros++;
			}
			this.trailingPoint = s.length - 1 - this.trailingZeros === p;
		}

		const value = atof(s, this.props.decimals);
		// console.log(`onChange("${s}") -> ${value}`);
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	renderInput() {
		let value = ftoa(this.props.value, this.props.decimals);
		if (this.trailingPoint) {
			value += ".";
		}
		for (let i = 0; i < this.trailingZeros; i++) {
			value += "0";
		}
		value = fixDecimals(value, this.props.decimals);
		// if (this.props.maxLength && value.length > this.props.maxLength) {
		// 	value = value.substring(0, this.props.maxLength);
		// }
		return (
			<input
				className={this.props.inputClass}
				type="number"
				size={this.props.size}
				value={value}
				min={this.props.min}
				max={this.props.max}
				step={Math.pow(10, -this.props.decimals)}
				label={this.props.label}
				inputMode="numeric"
				pattern="[\-\d\.]*"
				title="Input must be a valid floating-point number"
				disabled={this.props.disabled}
				onChange={(event) => this.onChange(event)}
			/>
		);
	}

	render() {
		if (this.props.label) {
			return (
				<div>
					<label className={this.props.labelClass}>{this.props.label}</label>
					{this.renderInput()}
				</div>
			);
		} else {
			return this.renderInput();
		}
	}
}
