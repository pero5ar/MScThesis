
import * as React from 'react';
import { TrayItem } from './TrayItem';
import { DiagramWidget, MoveItemsAction, PointModel } from 'storm-react-diagrams';

import { StartNodeModel, EndNodeModel, SelectNodeModel, WhereNodeModel } from '../core/nodeModels';

export class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasStart: false,
			hasEnd: false,
		};
	}
	
	addModel = (event, model) => {
		const points = this.props.engine.getDiagramEngine().getRelativeMousePoint(event);
		const x = points.x + 200;
		const y = points.y + 200;
		const node = this.props.engine.addNode(model, x, y);

		if (node.name === 'Start') {
			this.setState(() => ({ hasStart: true }));
		} else if (node.name === 'End') {
			this.setState(() => ({ hasEnd: true }));
		} else {
			this.forceUpdate();
		}
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

		this.props.engine.tryToConnectLinkOnPoint(link, point);

		this.forceUpdate();
	}

	render() {
		const { hasStart, hasEnd } = this.state;

		return (
			<div className="body">
				<div className="header">
					<div className="title">Test Space</div>
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
							diagramEngine={this.props.engine.getDiagramEngine()}
							actionStoppedFiring={this.onActionStoppedFiring} />
					</div>
				</div>
				<div className="footer">
					
				</div>
			</div>
		);
	}
}