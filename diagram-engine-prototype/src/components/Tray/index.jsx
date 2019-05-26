
import * as React from 'react';
import { connect } from 'react-redux';

import NodeModels from '../../core/nodeModels/index';

import TrayItem from './TrayItem';

class Tray extends React.PureComponent {

	render() {
		const { hasStart, hasEnd, addNode } = this.props;

		return (
			<div className="tray">
				<TrayItem
					model={NodeModels.StartNodeModel}
					onClick={addNode}
					disabled={hasStart}
				/>
				<TrayItem
					model={NodeModels.SelectNodeModel}
					onClick={addNode}
				/>
				<TrayItem
					model={NodeModels.WhereNodeModel}
					onClick={addNode}
				/>
				<TrayItem
					model={NodeModels.EndNodeModel}
					onClick={addNode}
					disabled={hasEnd}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		hasStart: !!state.diagram.startNodeId,
		hasEnd: !!state.diagram.endNodeId,
	};
}

export default connect(mapStateToProps)(Tray);