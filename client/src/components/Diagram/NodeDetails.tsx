import React from 'react';
import { connect } from 'react-redux';

import { RootState } from 'state';

import NodeSettings from './NodeSettings';
import NodeData from './NodeData';
import QueryPreview from './QueryPreview';

interface StateProps {
	selectedNodeId: Nullable<string>;
}

type Props = StateProps;

class NodeDetails extends React.PureComponent<Props> {
	render() {
		const { selectedNodeId } = this.props;
		return (
			<div className="node-details">
				<NodeSettings nodeId={selectedNodeId} />
				<div className="node-data">
					<NodeData nodeId={selectedNodeId} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		selectedNodeId: state.diagram.selectedNodeId,
	};
}

export default connect(mapStateToProps)(NodeDetails);
