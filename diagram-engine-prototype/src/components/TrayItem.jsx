import React from 'react';

export class TrayItem extends React.PureComponent {
	static defaultProps = {
		disabled: false,
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	onMouseDown = (event) => !this.props.disabled && this.props.onClick(event, this.props.model);

	render() {
		return (
			<div
				style={{ borderColor: this.props.model.COLOR }}
				onMouseDown={this.onMouseDown}
				className="tray-item"
				disabled={this.props.disabled}
			>
				{this.props.model.NAME}
			</div>
		);
	}
}