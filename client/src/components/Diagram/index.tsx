import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';

import { store } from 'index';

import NodeData from 'models/nodeData.model';

import * as Engine from 'engine';

import { RootState } from 'state';
import DiagramActions, { DiagramState } from 'state/diagram';

import { touchHandler } from 'utils/touch.util';
import { getLinkAndPointFromMoveAction } from 'utils/engine.util';

import NodeDetails from './NodeDetails';
import Tray from './Tray';

import 'storm-react-diagrams/dist/style.min.css';

interface OwnProps {
	input: NodeData;
	onUpdate: (diagramState: DiagramState, serializedGraph: string, output?: NodeData) => Promise<void>;
	onEnd: (diagramState: DiagramState, serializedGraph: string, output: NodeData) => Promise<void>;
}

interface StateProps {
	nodesLength: number;	// used to force update
}

interface DispatchProps {
	tryAddLink: typeof DiagramActions.tryAddLink;
};

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

class Diagram extends React.Component<Props> {
	ref: Nullable<HTMLDivElement> = null;

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		this.ref.addEventListener('touchstart', touchHandler, true);
		this.ref.addEventListener('touchmove', touchHandler, true);
		this.ref.addEventListener('touchend', touchHandler, true);
		this.ref.addEventListener('touchcancel', touchHandler, true);
	}

	onActionStoppedFiring = (action: Engine.BaseAction) => {
		const { link, point } = getLinkAndPointFromMoveAction(action);

		if (!link || !point) {
			return;
		}
		const { tryAddLink } = this.props;
		tryAddLink(link, point);
	}

	async componentDidMount() {
		const { onUpdate } = this.props;
		const diagramState = store.getState().diagram;
		const output = diagramState.endNodeId && diagramState.dataByNode[diagramState.endNodeId] || undefined;
		const serializedGraph = JSON.stringify(Engine.getInstance().getActiveDiagram().serializeDiagram());
		await onUpdate(diagramState, serializedGraph, output);
	}

	render() {
		const { input } = this.props;

		return (
			<div className="diagram" ref={this.setRef}>
				<div className="body">
					<div className="header">
						<div className="title">Diagram Engine</div>
					</div>
					<div className="content">
						<Tray input={input} />
						<div className="diagram-layer">
							<Engine.DiagramWidget
								className="srd-demo-canvas"
								diagramEngine={Engine.getInstance().getDiagramEngine()}
								actionStoppedFiring={this.onActionStoppedFiring}
							/>
						</div>
					</div>
					<NodeDetails />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		nodesLength: Object.keys(state.diagram.nodes).length,
	};
}
const dispatchProps: DispatchProps = {
	tryAddLink: DiagramActions.tryAddLink,
};

export default connect(mapStateToProps, dispatchProps)(Diagram);
