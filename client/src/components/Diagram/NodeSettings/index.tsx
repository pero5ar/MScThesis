import * as React from 'react';

import * as Engine from 'engine';

import NoNodeSettings from './NoNodeSettings';
import StartNodeSettings from './StartNodeSettings';
import EndNodeSettings from './EndNodeSettings';
import SelectNodeSettings from './SelectNodeSettings';
import WhereNodeSettings from './WhereNodeSettings';
import UnionNodeSettings from './UnionNodeSettings';

interface OwnProps {
	nodeId: Nullable<string>;
}

type Props = OwnProps;

interface State {
	node: Nullable<Engine.NodeModel>;
}

export default class NodeSettings extends React.PureComponent<Props, State> {
	state: State = {
		node: null,
	};

	static getDerivedStateFromProps(props: Props, state: State): Nullable<State> {
		if (!state.node && !props.nodeId) {
			return null;
		}
		if (state.node && state.node.id === props.nodeId) {
			return null;
		}
		if (!props.nodeId) {	// && state.node (handled via condition above)
			return { node: null };
		}
		return { node: Engine.getInstance().getNode(props.nodeId) };
	}

	removeNode = () => {
		const { node } = this.state;
		if (!node) {
			return;
		}
		this.setState(() => ({ node: null }), () => node.remove());
	}

	render() {
		const { node } = this.state;

		if (!node) {
			return <NoNodeSettings />;
		}
		if (node instanceof Engine.NodeModels.StartNodeModel) {
			return <StartNodeSettings node={node} removeNode={this.removeNode} />;
		}
		if (node instanceof Engine.NodeModels.EndNodeModel) {
			return <EndNodeSettings node={node} removeNode={this.removeNode} />;
		}
		if (node instanceof Engine.NodeModels.SelectNodeModel) {
			return <SelectNodeSettings node={node} removeNode={this.removeNode} />;
		}
		if (node instanceof Engine.NodeModels.WhereNodeModel) {
			return <WhereNodeSettings node={node} removeNode={this.removeNode} />;
		}
		if (node instanceof Engine.NodeModels.UnionNodeModel) {
			return <UnionNodeSettings node={node} removeNode={this.removeNode} />;
		}
		return null;
	}
}
