import React from 'react';
import { connect } from 'react-redux';

import * as Engine from '../../core/engine';
import NodeModels from '../../core/nodeModels/index';

import NoNodeSettings from './NoNodeSettings';
import StartNodeSettings from './StartNodeSettings';
import EndNodeSettings from './EndNodeSettings';
import SelectNodeSettings from './SelectNodeSettings';
import WhereNodeSettings from './WhereNodeSettings';

class NodeSettings extends React.PureComponent {
	static getDerivedStateFromProps(props, state) {
		if (state.node && !props.selectedNodeId) {
			return { node: null };
		}
		if (!state.node && !props.selectedNodeId) {
			return null;
		}
		if (state.node && state.node.id === props.selectedNodeId) {
			return null;
		}
		return { node: Engine.getInstance().getActiveDiagram().getNode(props.selectedNodeId) };
	}

	constructor(props) {
		super(props);
		this.engine = Engine.getInstance();
		this.state = {
			node: null
		}
	}

	removeNode = () => {
		const { node } = this.state;
		this.setState(() => ({ node: null }), () => node.remove());
	}

	render() {
		const { node } = this.state;

		if (!node) {
			return <NoNodeSettings />;
		}
		if (node instanceof NodeModels.StartNodeModel) {
			return <StartNodeSettings node={node} removeNode={this.removeNode} />
		}
		if (node instanceof NodeModels.EndNodeModel) {
			return <EndNodeSettings node={node} removeNode={this.removeNode} />
		}
		if (node instanceof NodeModels.SelectNodeModel) {
			return <SelectNodeSettings node={node} removeNode={this.removeNode} />
		}
		if (node instanceof NodeModels.WhereNodeModel) {
			return <WhereNodeSettings node={node} removeNode={this.removeNode} />
		}
		return null;
	}
}

function mapStateToProps(state) {
	return {
		selectedNodeId: state.diagram.selectedNodeId,
	};
}

export default connect(mapStateToProps)(NodeSettings);