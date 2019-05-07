import React from 'react';

export default class StartNodeSettings extends React.PureComponent {

	render() {
		return (
			<div className="node-settings">
				<h3>START node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
			</div>
		);
	}
}