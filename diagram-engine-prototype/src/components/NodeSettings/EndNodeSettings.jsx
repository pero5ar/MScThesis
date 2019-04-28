import React from 'react';

export default class EndNodeSettings extends React.PureComponent {
	render() {
		return (
			<div className="node-settings">
				<span>END node settings for {this.props.node.id}</span>
				<button onClick={this.props.removeNode}>Remove Node</button>
			</div>
		);
	}
}