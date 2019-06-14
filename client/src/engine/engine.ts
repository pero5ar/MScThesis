import { DiagramEngine, DiagramModel, DefaultPortModel, PointModel } from 'storm-react-diagrams';

import { NodeModelConstructor } from './nodeModels';
import { ModelListenerFunction, NodeModel, LinkModel } from './index';

export default class Engine {
	private diagramEngine: DiagramEngine;
	private activeModel!: DiagramModel;

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

	getAllNodes(): NodeModel[] {
		return Object.values(this.activeModel.getNodes()) as NodeModel[];
	}

	getNode(nodeId: string): Nullable<NodeModel> {
		return this.activeModel.getNode(nodeId) as Nullable<NodeModel>;
	}

	getAllInPorts(): DefaultPortModel[] {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getInPorts()], [] as DefaultPortModel[]);
	}

	getAllOutPorts(): DefaultPortModel[] {
		return this.getAllNodes().reduce((_acc, _node) => [..._acc, ..._node.getOutPorts()], [] as DefaultPortModel[]);
	}

	addNode<T extends NodeModel>(
		Model: NodeModelConstructor<T>,
		x: number,
		y: number,
		selectionChangedListener: ModelListenerFunction<NodeModel>,
		entityRemovedListener: ModelListenerFunction<NodeModel>,
		settingsChangedListener: ModelListenerFunction<NodeModel>
	) {
		const node = new Model(x, y);
		this.activeModel.addNode(node);
		if (selectionChangedListener) {
			node.addListener({
				selectionChanged: selectionChangedListener,
			});
		}
		if (entityRemovedListener) {
			node.addListener({
				entityRemoved: entityRemovedListener,
			});
		}
		if (settingsChangedListener) {
			node.addListener({
				settingsChanged: settingsChangedListener,
			});
		}
		return node;
	}

	tryToConnectLinkOnPoint(link: LinkModel, point: PointModel, entityRemovedListener: ModelListenerFunction<LinkModel>): boolean {
		const sourceId = link.getSourcePort().id;
		const outPort = this.getAllOutPorts().find((_port) => _port.id === sourceId);
		if (!outPort) {
			link.remove();
			return false;
		}
		const inPorts = this.getAllInPorts();

		const hasConnected = inPorts.some((_port) => {
			if (!_port || _port.isLocked()) {
				return false;
			}
			const { x: x0, y: y0, width, height } = this.diagramEngine.getPortCoords(_port);
			const x1 = x0 + width;
			const y1 = y0 + height;

			if (point.x >= x0 && point.x <= x1 && point.y >= y0 && point.y <= y1) {
				link.setTargetPort(_port);
				_port.addLink(link);
				link.setSourcePort(outPort);
				outPort.addLink(link);

				if (entityRemovedListener) {
					link.isTracked = true;
					link.addListener({
						entityRemoved: entityRemovedListener,
					});
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
