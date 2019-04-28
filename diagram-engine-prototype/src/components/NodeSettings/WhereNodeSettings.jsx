import React from 'react';

export default class WhereNodeSettings extends React.PureComponent {
	render() {
		return (
			<div className="node-settings">
				<span>WHERE node settings for {this.props.node.id}</span>
				<button onClick={this.props.removeNode}>Remove Node</button>
			</div>
		);
	}
}