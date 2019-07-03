import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';

import NodeData from 'models/nodeData.model';

import * as Engine from 'engine';

import { RootState } from 'state';
import DiagramActions from 'state/diagram';

import TrayItem from './TrayItem';

interface OwnProps {
	input: NodeData;
}

interface StateProps {
	hasEnd: boolean;
}

interface DispatchProps {
	addNode: typeof DiagramActions.addNode;
}

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

class Tray extends React.PureComponent<Props> {

	addNode = (event: React.MouseEvent, model: Engine.NodeModelClass) => {
		const { addNode, input } = this.props;

		const points = Engine.getInstance().getDiagramEngine().getRelativeMousePoint(event);
		const x = points.x + 200;
		const y = points.y + 200;

		addNode(model, x, y, input);
	}

	render() {
		const { hasEnd } = this.props;

		return (
			<div className="tray">
				<TrayItem
					model={Engine.NodeModels.StartNodeModel}
					onClick={this.addNode}
				/>
				<TrayItem
					model={Engine.NodeModels.SelectNodeModel}
					onClick={this.addNode}
				/>
				<TrayItem
					model={Engine.NodeModels.WhereNodeModel}
					onClick={this.addNode}
				/>
				<TrayItem
					model={Engine.NodeModels.UnionNodeModel}
					onClick={this.addNode}
				/>
				<TrayItem
					model={Engine.NodeModels.EndNodeModel}
					onClick={this.addNode}
					disabled={hasEnd}
				/>
			</div>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		hasEnd: !!state.diagram.endNodeId,
	};
}

const dispatchProps: DispatchProps = {
	addNode: DiagramActions.addNode,
};

export default connect(mapStateToProps, dispatchProps)(Tray);
