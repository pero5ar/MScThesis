import * as React from 'react';

import { NodeModels } from 'engine';

interface OwnProps {
	node: InstanceType<typeof NodeModels.EndNodeModel>;
	removeNode: () => void;
}

type Props = OwnProps;

export default class EndNodeSettings extends React.PureComponent<Props> {
	render() {
		return (
			<div className="node-settings">
				<h3>END node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
			</div>
		);
	}
}
