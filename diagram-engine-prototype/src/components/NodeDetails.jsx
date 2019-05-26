import React from 'react';
import { connect } from 'react-redux';

import NodeSettings from './NodeSettings';
import NodeData from './NodeData';
import QueryPreview from './QueryPreview';

class NodeDetails extends React.PureComponent {
	render() {
		const { selectedNodeId } = this.props;
		return (
			<div className="footer">
				<div>
					<QueryPreview />
					<NodeData nodeId={selectedNodeId} />
				</div>
				<NodeSettings nodeId={selectedNodeId} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedNodeId: state.diagram.selectedNodeId,
	};
}

export default connect(mapStateToProps)(NodeDetails);