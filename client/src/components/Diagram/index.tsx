import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';
import Button from 'react-bootstrap/Button';

import NodeData from 'models/nodeData.model';

import { AttemptStateViewModel } from 'models/viewModels/attempt.viewModel';

import * as Engine from 'engine';

import { RootState } from 'state';
import DiagramActions, { DiagramState } from 'state/diagram';

import { touchHandler } from 'utils/touch.util';
import { getLinkAndPointFromMoveAction } from 'utils/engine.util';
import { selectors } from 'utils/state.util';

import NodeDetails from './NodeDetails';
import Tray from './Tray';

import 'storm-react-diagrams/dist/style.min.css';

interface OwnProps {
	title?: string;
	taskDetails?: string;
	input: NodeData;
	initialState: Nullable<AttemptStateViewModel>;
	saveState: (diagramState: DiagramState, serializedGraph: string, output?: NodeData) => Promise<void>;
	onEnd: (diagramState: DiagramState, serializedGraph: string, output: NodeData) => Promise<void>;
}

interface StateProps {	// used mostly for update
	nodesLength: number;
	linksLength: number;
	dataByNodeLength: number;
}

interface DispatchProps {
	setState: typeof DiagramActions.setState;
	tryAddLink: typeof DiagramActions.tryAddLink;
};

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

class Diagram extends React.Component<Props> {
	static defaultProps: Partial<Props> = {
		title: 'Diagram Engine',
		taskDetails: '',
	};

	ref: Nullable<HTMLDivElement> = null;

	componentDidMount() {
		const { initialState, setState } = this.props;
		if (initialState) {
			setState(initialState.diagramState, initialState.serializedGraph);
		}
	}

	save() {
		const { saveState } = this.props;
		const diagramState = selectors.getDiagramState();
		const output = diagramState.endNodeId && diagramState.dataByNode[diagramState.endNodeId] || undefined;
		const serializedGraph = JSON.stringify(Engine.getInstance().getActiveDiagram().serializeDiagram());
		saveState(diagramState, serializedGraph, output);
	}

	componentDidUpdate() {
		this.save();
	}

	componentWillUnmount() {
		this.save();
	}

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		if (!this.ref) {
			return;
		}
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

	render() {
		const { input, title, taskDetails } = this.props;

		return (
			<div className="diagram">
				<div className="diagram-body">
					<div className="diagram-header">
						<div className="title">
							<h4>{title}</h4>
						</div>
						<div style={{ float: 'right' }}>
							<Button size="sm" variant="info">Submit solution</Button>
							{' '}
							<Button size="sm" variant="primary">Back</Button>
						</div>
					</div>
					<div className="diagram-content">
						<Tray input={input} />
						<div className="diagram-layer" ref={this.setRef}>
							<Engine.DiagramWidget
								className="srd-demo-canvas"
								diagramEngine={Engine.getInstance().getDiagramEngine()}
								actionStoppedFiring={this.onActionStoppedFiring}
							/>
						</div>
					</div>
					<div className="task-details">
						<h5>{taskDetails}</h5>
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
		linksLength: Object.keys(state.diagram.links).length,
		dataByNodeLength: Object.keys(state.diagram.dataByNode).length,
	};
}
const dispatchProps: DispatchProps = {
	setState: DiagramActions.setState,
	tryAddLink: DiagramActions.tryAddLink,
};

export default connect(mapStateToProps, dispatchProps)(Diagram);
