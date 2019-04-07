
import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import { DefaultNodeModel, DiagramWidget, MoveItemsAction, PointModel, LinkModel } from "storm-react-diagrams";

export class BodyWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
  }
  
  addModel = (event, data) => {
    const nodesCount = Object.keys(
      this.props.app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    ).length;

    let node = null;
    if (data.type === "in") {
      node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(192,255,0)");
      node.addInPort("In");
    } else {
      node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(0,192,255)");
      node.addOutPort("Out");
    }
    const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
    node.x = points.x + 200;
    node.y = points.y + 200;
    this.props.app
      .getDiagramEngine()
      .getDiagramModel()
      .addNode(node);
    this.forceUpdate();
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

    console.log(this.props.app
      .getDiagramEngine()
      .getDiagramModel()
      .getNodes())

    const nodes = Object.values(
      this.props.app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    );
    const inPorts = nodes.reduce((_acc, _node) => [..._acc, ..._node.getInPorts()], []);

    const sourceId = link.getSourcePort().id;
    const outPort = nodes.reduce((_outPort, _node) => _outPort || _node.getOutPorts().find((_port) => _port.id === sourceId), null);

    console.log(inPorts);
    console.log(outPort);
    
    inPorts.some(port => {
      if (port.isLocked()) {
        return false;
      }
      const { x: x0, y: y0, width, height } = this.props.app.getDiagramEngine().getPortCoords(port);
      const x1 = x0 + width;
      const y1 = y0 + height; 
      console.log(x0, x1, y0, y1);
      if (point.x >= x0 && point.x <= x1 && point.y >= y0 && point.y <= y1) {
        link.setTargetPort(port);
        link.setSourcePort(outPort);
        outPort.addLink(link);
        console.log(link);
  
        this.props.app
          .getDiagramEngine()
          .getDiagramModel()
          .addLink(link);
    
        this.forceUpdate();
        console.log("yay")
        return true;
      }
      return false;
    })
  }

	render() {
		return (
			<div className="body">
				<div className="header">
					<div className="title">Test Space</div>
				</div>
				<div className="content">
					<TrayWidget>
						<TrayItemWidget
              model={{ type: "in" }}
              name="In Node"
              color="rgb(192,255,0)"
              addModel={this.addModel}
            />
						<TrayItemWidget
              model={{ type: "out" }}
              name="Out Node"
              color="rgb(0,192,255)"
              addModel={this.addModel}
            />
					</TrayWidget>
					<div
						className="diagram-layer"
					>
						<DiagramWidget
              className="srd-demo-canvas"
              diagramEngine={this.props.app.getDiagramEngine()}
              actionStoppedFiring={this.onActionStoppedFiring} />
					</div>
				</div>
			</div>
		);
	}
}