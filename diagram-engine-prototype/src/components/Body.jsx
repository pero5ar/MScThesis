
import * as React from 'react';
import { connect } from 'react-redux';
import { DiagramWidget, MoveItemsAction, PointModel } from 'storm-react-diagrams';

import { getInstance } from '../core/engine';
// import { StartNodeModel, EndNodeModel, SelectNodeModel, WhereNodeModel } from '../core/nodeModels';
import StartNodeModel from '../core/nodeModels/start.nodeModel';
import EndNodeModel from '../core/nodeModels/end.nodeModel';
import SelectNodeModel from '../core/nodeModels/select.nodeModel';
import WhereNodeModel from '../core/nodeModels/where.nodeModel';

import { ADD_NODE, SELECT_NODE } from '../redux/actionCreators/diagram.actionCreators';

import { generateSelectionChangedListener } from '../utils/engine.utils';

import TrayItem from './TrayItem';

class Body extends React.PureComponent {

	constructor(props) {
		super(props);
		this.engine = getInstance();
	}

	addModel = (event, model) => {
		const { addNode, selectNode } = this.props;
		const points = this.engine.getDiagramEngine().getRelativeMousePoint(event);
		const x = points.x + 200;
		const y = points.y + 200;
		const selectionChangedListener = generateSelectionChangedListener(selectNode);
		const node = this.engine.addNode(model, x, y, selectionChangedListener);
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
							model={StartNodeModel}
							onClick={this.addModel}
							disabled={hasStart}
						/>
						<TrayItem
							model={SelectNodeModel}
							onClick={this.addModel}
						/>
						<TrayItem
							model={WhereNodeModel}
							onClick={this.addModel}
						/>
						<TrayItem
							model={EndNodeModel}
							onClick={this.addModel}
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

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		hasState: !!state.diagram.startNodeId,
		hasEnd: !!state.diagram.endNodeId,
		nodesLength: Object.keys(state.diagram.nodeSettings)
	};
}

const actions = {
	addNode: ADD_NODE,
	selectNode: SELECT_NODE,
}

export default connect(mapStateToProps, actions)(Body);