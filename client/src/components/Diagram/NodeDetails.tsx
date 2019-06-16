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

function mapStateToProps(state: RootState): StateProps {
	return {
		selectedNodeId: state.diagram.selectedNodeId,
	};
}

export default connect(mapStateToProps)(NodeDetails);
