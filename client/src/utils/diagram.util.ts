import { DiagramState } from 'state/diagram';

import { callNodeRun } from './engine.util';

type DataByNode = DiagramState['dataByNode'];

export function isNodeConnectedToStart(state: DiagramState, nodeId: Nullable<string>): boolean {
	if (nodeId === null) {
		return false;
	}
	if (nodeId === state.startNodeId) {
		return true;
	}
	return isNodeConnectedToStart(state, state.nodes[nodeId].previousNodeId);
}

/** Will return a list starting from the furthermost ancestor and ending with the direct parent */
export function getPrecedingNodesIds(state: DiagramState, nodeId: string): string[] {
	const precedingNodesIds = [];
	let currentNodeId = state.nodes[nodeId].previousNodeId;
	while (currentNodeId) {
		precedingNodesIds.unshift(currentNodeId);
		currentNodeId = state.nodes[currentNodeId].previousNodeId;
	}
	return precedingNodesIds;
}

/** Will return a list starting from the direct child and ending with the furthermost descendant */
export function getSucceedingNodesIds(state: DiagramState, nodeId: string): string[] {
	const succeedingNodesIds = [];
	let currentNodeId = state.nodes[nodeId].nextNodeId;
	while (currentNodeId) {
		succeedingNodesIds.push(currentNodeId);
		currentNodeId = state.nodes[currentNodeId].nextNodeId;
	}
	return succeedingNodesIds;
}

export function getDataByNodesWithoutSucceedingNodes(state: DiagramState, sourceNodeId: string, includeSource: boolean = false): DataByNode {
	const linkedNodesIds = getSucceedingNodesIds(state, sourceNodeId);
	if (includeSource) {
		linkedNodesIds.unshift(sourceNodeId);
	}
	return Object.keys(state.dataByNode).reduce((_obj, _key) => {
		if (!linkedNodesIds.includes(_key)) {
			_obj[_key] = state.dataByNode[_key];
		}
		return _obj;
	}, {} as DataByNode);
}

export function updateDataByNodesWithMissingNodes(state: DiagramState, endNodeId: string, includeEnd: boolean = true): DataByNode {
	if (!isNodeConnectedToStart(state, endNodeId)) {
		throw new Error('Node needs to be connected to start for data to be calculated');
	}
	const linkedNodesIds = getPrecedingNodesIds(state, endNodeId);
	if (includeEnd) {
		linkedNodesIds.push(endNodeId);
	}
	const addedData = {} as DataByNode;
	for (let nodeId of linkedNodesIds) {
		if (!!state.dataByNode[nodeId]) {
			continue;
		}
		const previousNodeId = state.nodes[nodeId].previousNodeId;
		if (!previousNodeId) {
			// This can only happen for start node
			addedData[nodeId] = callNodeRun(nodeId);
			continue;
		}
		addedData[nodeId] = callNodeRun(nodeId, addedData[previousNodeId] || state.dataByNode[previousNodeId]);
	}
	return {
		...state.dataByNode,
		...addedData,
	};
}
