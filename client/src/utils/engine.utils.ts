import * as Engine from '../engine';

import NodeData from '../models/nodeData.model';

function getOutPort(node: Engine.NodeModel): Engine.PortModel | null {
	const ports = Object.values(node.getPorts()) as Engine.PortModel[];
	return ports.find((_port) => !_port.in) || null;
}

function getNextLink(oldLink: Engine.LinkModel, node: Engine.NodeModel): Engine.LinkModel | null {
	if (!node) {
		return null;
	}
	const outPort = getOutPort(node);
	if (!outPort) {
		return null;
	}
	return (Object.values(outPort.getLinks()) as Engine.LinkModel[]).find((_link) => _link.id !== oldLink.id) || null;
}

export function traverseNodesFromStart() {
	const startNode = Object.values(Engine.getInstance().getAllNodes()).find((_node) => _node.name === 'Start');
	if (!startNode) {
		return [];
	}
	const nodes = [startNode];

	let link = getNextLink({} as Engine.LinkModel, startNode);

	while (link) {
		const targetNode = link.getTargetPort().getParent() as Engine.NodeModel;
		nodes.push(targetNode);
		link = getNextLink(link, targetNode);
	}

	return nodes;
}

export function generateSelectionChangedListener(onSelectionChanged: Engine.ModelListenerFunctionCallback): Engine.ModelListenerFunction {
	return (event) => !event.entity.isSelected() ? onSelectionChanged(null) : event.entity.isTracked && onSelectionChanged(event.entity.id);
}

export function generateEntityRemovedListener(onEntityRemoved: Engine.ModelListenerFunctionCallback): Engine.ModelListenerFunction {
	return (event) => event.entity.isTracked && onEntityRemoved(event.entity.id);
}

export function generateSettingsChangedListener(onSettingsChanged: Engine.SettingChangedListenerFunctionCallback): Engine.ModelListenerFunction<Engine.NodeModel> {
	return (event) => event.entity.isTracked && event.entity.settings && onSettingsChanged(event.entity.id, event.entity.settings);
}

export function callNodeRun(nodeId: string, data?: NodeData): NodeData {
	const node = Engine.getInstance().getActiveDiagram().getNode(nodeId) as Engine.NodeModel;
	if (!node) {
		throw new Error(`Node ${nodeId} does not exist`);
	}
	if (!data) {
		if (node instanceof Engine.NodeModels.StartNodeModel) {
			return node.run();
		} else {
			throw new Error('Node requires data to call run');
		}
	}
	return node.run(data);
}
