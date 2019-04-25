import React from 'react';

export class TrayItemWidget extends React.Component {
	static defaultProps = {
		disabled: false,
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	addModel = (event) => this.props.addModel(event, this.props);

	render() {
		return (
			<div
				style={{ borderColor: this.props.color }}
				onMouseDown={this.addModel}
				className="tray-item"
				disabled={this.props.disabled}
			>
				{this.props.name}
			</div>
		);
	}
}