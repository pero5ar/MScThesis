import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
} from 'storm-react-diagrams';

export class Engine {
	constructor() {
		this.diagramEngine = new DiagramEngine();
		this.diagramEngine.installDefaultFactories();

		this.newModel();
	}

	newModel() {
		this.activeModel = new DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);
	}

	getActiveDiagram() {
		return this.activeModel;
	}

	getDiagramEngine() {
		return this.diagramEngine;
	}

	getAllNodes() {
		return Object.values(this.activeModel.getNodes());
	}

	getAllInPorts() {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getInPorts()], [])
	}

	getAllOutPorts() {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getOutPorts()], [])
	}

	addNode(name, color, x, y, hasIn = true, hasOut = true) {
		const node = new DefaultNodeModel(name, color);
		node.x = x;
		node.y = y;

		if (hasIn) {
			const inPort = node.addInPort(">|");
			inPort.setMaximumLinks(1);
		}
		if (hasOut) {
			const outPort = node.addOutPort("|>");
			outPort.setMaximumLinks(1);
		}
		this.activeModel.addNode(node);
	}

	tryToConnectLinkOnPoint(link, point) {
		const sourceId = link.getSourcePort().id;
		const outPort = this.getAllOutPorts().find((_port) => _port.id === sourceId);
		if (!outPort) {
			link.remove();
		}

		const inPorts = this.getAllInPorts();

		const hasConnected = inPorts.some(port => {
			if (!port || port.isLocked()) {
				return false;
			}
			const { x: x0, y: y0, width, height } = this.diagramEngine.getPortCoords(port);
			const x1 = x0 + width;
			const y1 = y0 + height;

			if (point.x >= x0 && point.x <= x1 && point.y >= y0 && point.y <= y1) {
				link.setTargetPort(port);
				port.addLink(link);
				link.setSourcePort(outPort);
				outPort.addLink(link);

				this.activeModel.addLink(link);
				return true;
			}
			return false;
		});

		if (!hasConnected) {
			link.remove();
		}
	}
}