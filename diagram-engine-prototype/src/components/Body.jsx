
import * as React from 'react';
import { connect } from 'react-redux';
import { DiagramWidget, MoveItemsAction, PointModel } from 'storm-react-diagrams';

import * as Engine from '../core/engine';
import NodeModels from '../core/nodeModels/index';

import { ADD_NODE, SELECT_NODE, REMOVE_NODE, SET_NODE_SETTINGS } from '../redux/actionCreators/diagram.actionCreators';

import { generateSelectionChangedListener, generateEntityRemovedListener, generateSettingsChangedListener } from '../utils/engine.utils';

import NodeSettings from './NodeSettings';
import QueryPreview from './QueryPreview';
import TrayItem from './TrayItem';

class Body extends React.PureComponent {

	constructor(props) {
		super(props);
		this.engine = Engine.getInstance();
	}

	addNode = (event, model) => {
		const { addNode, selectNode, removeNode, changeSettings } = this.props;

		const points = this.engine.getDiagramEngine().getRelativeMousePoint(event);
		const x = points.x + 200;
		const y = points.y + 200;

		const selectionChangedListener = generateSelectionChangedListener(selectNode);
		const entityRemovedListener = generateEntityRemovedListener(removeNode);
		const settingsChangedListener = generateSettingsChangedListener(changeSettings);

		const node = this.engine.addNode(model, x, y, selectionChangedListener, entityRemovedListener, settingsChangedListener);
		addNode(node);
	}

	onActionStoppedFiring = (action) => {
		console.log(action);
		if (!action || !(action instanceof MoveItemsAction) || !action.selectionModels || action.selectionModels.length !== 1) {
			return;
		}
		const point = action.selectionModels[0].model;
		if (!point || !(point instanceof PointModel)) {
			return;
		}
		const link = point.getParent();
		if (!link) {
			return;
		}

		this.engine.tryToConnectLinkOnPoint(link, point);

		this.forceUpdate();
	}

	render() {
		const { hasStart, hasEnd } = this.props;

		return (
			<div className="body">
				<div className="header">
					<div className="title">Diagram Engine Prototype</div>
				</div>
				<div className="content">
					<div className="tray">
						<TrayItem
							model={NodeModels.StartNodeModel}
							onClick={this.addNode}
							disabled={hasStart}
						/>
						<TrayItem
							model={NodeModels.SelectNodeModel}
							onClick={this.addNode}
						/>
						<TrayItem
							model={NodeModels.WhereNodeModel}
							onClick={this.addNode}
						/>
						<TrayItem
							model={NodeModels.EndNodeModel}
							onClick={this.addNode}
							disabled={hasEnd}
						/>
					</div>
					<div className="diagram-layer">
						<DiagramWidget
							className="srd-demo-canvas"
							diagramEngine={this.engine.getDiagramEngine()}
							actionStoppedFiring={this.onActionStoppedFiring} />
					</div>
				</div>
				<div className="footer">
					<QueryPreview />
					<NodeSettings />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		hasStart: !!state.diagram.startNodeId,
		hasEnd: !!state.diagram.endNodeId,
		nodesLength: Object.keys(state.diagram.nodeSettings)
	};
}

const actions = {
	addNode: ADD_NODE,
	removeNode: REMOVE_NODE,
	selectNode: SELECT_NODE,
	changeSettings: SET_NODE_SETTINGS,
}

export default connect(mapStateToProps, actions)(Body);