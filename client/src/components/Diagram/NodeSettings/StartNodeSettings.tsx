import * as React from 'react';
import Button from 'react-bootstrap/Button';

import { NodeModels } from 'engine';

interface OwnProps {
	node: InstanceType<typeof NodeModels.StartNodeModel>;
	removeNode: () => void;
}

type Props = OwnProps;

export default class StartNodeSettings extends React.PureComponent<Props> {
	render() {
		return (
			<div className="node-settings">
				<h3 style={{ color: this.props.node.color }}>{this.props.node.name} node settings</h3>
				<br />
				<Button variant="danger" onClick={this.props.removeNode}>Remove Node</Button>
			</div>
		);
	}
}
