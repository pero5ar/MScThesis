import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { NodeModels, GetNodeModelSettingsType } from 'engine';

import { RootState } from 'state';

type UnionNodeType = InstanceType<typeof NodeModels.UnionNodeModel>;
type UnionNodeSettingsType = GetNodeModelSettingsType<UnionNodeType>;

interface OwnProps {
	node: UnionNodeType;
	removeNode: () => void;
}

interface StateProps {
	settings: UnionNodeSettingsType;	// used to force updates, use the node prop to read data
}

type Props = OwnProps & StateProps;

class UnionNodeSettings extends React.PureComponent<Props> {

	onCheck = () => {
		const { node } = this.props;
		const { removeDuplicates } = node.settings;
		node.settings = { removeDuplicates: !removeDuplicates };
	}

	render() {
		const { removeNode, node } = this.props;

		return (
			<div className="node-settings">
				<h3 style={{ color: node.color }}>{node.name} node settings</h3>
				<br />
				<Button variant="danger" onClick={removeNode}>Remove Node</Button>
				<br />
				<br />
				<div>
					<label>Remove duplicates</label>
					&nbsp;
					<input type="checkbox" onChange={this.onCheck} checked={node.settings.removeDuplicates} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
	const nodeId = ownProps.node.id;
	const settings = state.diagram.nodes[nodeId].settings as UnionNodeSettingsType;

	return {
		settings,
	};
}

export default connect(mapStateToProps)(UnionNodeSettings);
