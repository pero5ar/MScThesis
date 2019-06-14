import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';

import * as Engine from 'engine';

import { RootState } from 'state';
import DiagramActions from 'state/diagram';

import { touchHandler } from 'utils/touch.util';
import { getLinkAndPointFromMoveAction } from 'utils/engine.util';

import NodeDetails from './NodeDetails';
import Tray from './Tray';

import 'storm-react-diagrams/dist/style.min.css';

interface StateProps {
	nodesLength: number;	// used to force update
}

interface DispatchProps {
	tryAddLink: typeof DiagramActions.tryAddLink;
};

type Props = StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

class Diagram extends React.Component<Props> {
	ref: Nullable<HTMLDivElement> = null;

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		ref.addEventListener('touchstart', touchHandler, true);
		ref.addEventListener('touchmove', touchHandler, true);
		ref.addEventListener('touchend', touchHandler, true);
		ref.addEventListener('touchcancel', touchHandler, true);
	}

	onClick = () => console.log(Engine.getInstance().getActiveDiagram().serializeDiagram())

	onActionStoppedFiring = (action: Engine.BaseAction) => {
		const { link, point } = getLinkAndPointFromMoveAction(action);

		if (!link || !point) {
			return;
		}
		const { tryAddLink } = this.props;
		tryAddLink(link, point);
	}

	render() {
		return (
			<div className="diagram" ref={this.setRef}>
				<button
					type="button"
					onClick={this.onClick}
				>
					Serialize Graph
				</button>
				<div className="body">
					<div className="header">
						<div className="title">Diagram Engine</div>
					</div>
					<div className="content">
						<Tray />
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
