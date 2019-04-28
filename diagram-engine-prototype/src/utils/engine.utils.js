import { DiagramModel, NodeModel, PortModel, LinkModel, BaseEvent, BaseModel } from 'storm-react-diagrams';

import * as Engine from '../core/engine';

/**
 * 
 * @param {NodeModel} node
 * @returns {PortModel}
 */
function getOutPort(node) {
	const ports = Object.values(node.getPorts());
	return ports.find(_port => !_port.in);
}

/**
 * 
 * @param {LinkModel} oldLink
 * @param {NodeModel} node
 * @returns {LinkModel}
 */
function getNextLink(oldLink, node) {
	if (!node) {
		return null;
	}
	const outPort = getOutPort(node);
	if (!outPort) {
		return null;
	}
	return Object.values(outPort.getLinks()).find(_link => _link.id !== oldLink.id);
}

/**
 * 
 * @param {DiagramModel} activeModel
 */
export function traverseNodesFromStart() {
	/** @type {NodeModel} */
	const startNode = Object.values(Engine.getInstance().getNodes()).find(_node => _node.name === 'Start');
	if (!startNode) {
		return;
	}
	const nodes = [startNode];

	/** @type {LinkModel} */
	let link = getNextLink({}, startNode);

	while (link) {
		const targetNode = link.getTargetPort().getParent();
		nodes.push(targetNode);
		link = getNextLink(link, targetNode);
	}
	console.log(nodes)
}

/**
 * 
 * @param {(entityId: string | null) => void} onSelectionChanged
 * @return {(event: BaseEvent<BaseModel> & { isSelected: boolean; }) => void}  
 */
export function generateSelectionChangedListener(onSelectionChanged) {
	return (event) => event.isSelected ? onSelectionChanged(event.entity.id) : onSelectionChanged(null);
}