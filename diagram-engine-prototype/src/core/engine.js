import { DiagramEngine, DiagramModel, DefaultNodeModel, NodeModel, PortModel, LinkModel, PointModel } from 'storm-react-diagrams';

/**
 * @type {Engine}
 */
let instance = null;

export function getInstance() {
	if (instance === null) {
		instance = new Engine();
	}
	return instance;
}

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

	/**
	 * @returns {NodeModel[]}
	 */
	getAllNodes() {
		return Object.values(this.activeModel.getNodes());
	}

	/**
	 * @returns {PortModel[]}
	 */
	getAllInPorts() {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getInPorts()], [])
	}

	/**
	 * @returns {PortModel[]}
	 */
	getAllOutPorts() {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getOutPorts()], [])
	}

	/**
	 * @param {new (x: number, y: number) => DefaultNodeModel} Model 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {(entity) => void} [selectionChangedListener] 
	 * @param {(entity) => void} [entityRemovedListener] 
	 * @param {(entity) => void} [settingsChangedListener] 
	 */
	addNode(Model, x, y, selectionChangedListener, entityRemovedListener, settingsChangedListener) {
		const node = new Model(x, y);
		this.activeModel.addNode(node);
		if (selectionChangedListener) {
			node.addListener({
				selectionChanged: selectionChangedListener
			})
		}
		if (entityRemovedListener) {
			node.addListener({
				entityRemoved: entityRemovedListener
			})
		}
		if (settingsChangedListener) {
			node.addListener({
				settingsChanged: settingsChangedListener
			})
		}
		return node;
	}

	/**
	 * @param {LinkModel} link 
	 * @param {PointModel} point 
	 * @param {(entity) => void} [entityRemovedListener] 
	 * @returns {boolean}
	 */
	tryToConnectLinkOnPoint(link, point, entityRemovedListener) {
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

				if (entityRemovedListener) {
					link.isTracked = true;
					link.addListener({
						entityRemoved: entityRemovedListener
					})
				}
				this.activeModel.addLink(link);
				return true;
			}
			return false;
		});

		if (!hasConnected) {
			link.remove();
		}
		return hasConnected;
	}
}