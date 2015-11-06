import React from "react";


function itoa(i) {
	return isNaN(i) ? "" : `${Math.floor(i)}`;
}


function atoi(a) {
	return parseInt(a);
}


export default class IntInput extends React.Component {
	static displayName = "IntInput";

	static propTypes = {
		value: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		label: React.PropTypes.string,
		addonAfter: React.PropTypes.string,
		bsStyle: React.PropTypes.oneOf(["success", "warning", "error"]),
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func
	};

	static defaultProps = {
		value: NaN,
		min: 0,
		max: Number.MAX_SAFE_INTEGER,
		label: null,
		addonAfter: null,
		bsStyle: null,
		disabled: false,
		onChange: null
	};

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(atoi(event.target.value));
		}
	}

	render() {
		const groupClass = "form-group" + (this.props.bsStyle ? " has-" + this.props.bsStyle : "");
		const { label, addonAfter } = this.props;
		const min = this.props.min;
		const max = this.props.max;
		return (
			<div className={groupClass}>
				{label ? <label className="control-label">{label}</label> : null}
				<div className="input-group">
					<input
						className="form-control"
						type="number"
						value={itoa(this.props.value)}
						label={label}
						min={min}
						max={max}
						inputmode="numeric"
						pattern="[\-\d]*"
						title={`Input must be a non-negative integral number from ${min} to ${max}`}
						disabled={this.props.disabled}
						onChange={(event) => this.onChange(event)}
					/>
					{addonAfter ? <span className="input-group-addon">{addonAfter}</span> : null}
				</div>
			</div>
		);
	}
}
