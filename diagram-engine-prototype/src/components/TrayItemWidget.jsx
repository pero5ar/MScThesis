import React from 'react';

export class TrayItemWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
  }
  
  addModel = (event) => this.props.addModel(event, this.props.model);

	render() {
		return (
			<div
				style={{ borderColor: this.props.color }}
        onMouseDown={this.addModel}
				className="tray-item"
			>
				{this.props.name}
			</div>
		);
	}
}