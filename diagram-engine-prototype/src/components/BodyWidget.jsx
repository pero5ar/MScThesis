
import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import { DiagramWidget, MoveItemsAction, PointModel } from "storm-react-diagrams";

export class BodyWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasStart: false,
			hasEnd: false,
		};
	}
	
	addModel = (event, data) => {
		const { name, color, disabled } = data;
		if (disabled) {
			return;
		}
		const points = this.props.engine.getDiagramEngine().getRelativeMousePoint(event);
		const x = points.x + 200;
		const y = points.y + 200;
		this.props.engine.addNode(name, color, x, y, name !== 'Start', name !== 'End');

		if (name === 'Start') {
			this.setState(() => ({ hasStart: true }));
		} else if (name === 'End') {
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
					<TrayWidget>
						<TrayItemWidget
							name="Start"
							color="rgb(79, 219, 24)"
							addModel={this.addModel}
							disabled={hasStart}
						/>
						<TrayItemWidget
							name="Select"
							color="rgb(0, 70, 234)"
							addModel={this.addModel}
						/>
						<TrayItemWidget
							name="Where"
							color="rgb(232, 228, 16)"
							addModel={this.addModel}
						/>
						<TrayItemWidget
							name="End"
							color="rgb(221, 15, 180)"
							addModel={this.addModel}
							disabled={hasEnd}
						/>
					</TrayWidget>
					<div
						className="diagram-layer"
					>
						<DiagramWidget
							className="srd-demo-canvas"
							diagramEngine={this.props.engine.getDiagramEngine()}
							actionStoppedFiring={this.onActionStoppedFiring} />
					</div>
				</div>
			</div>
		);
	}
}