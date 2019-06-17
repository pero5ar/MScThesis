import { DiagramState } from 'state/diagram';

import { callNodeRun } from './engine.util';

type DataByNode = DiagramState['dataByNode'];

export function isNodeConnectedToStartOnAllEnds(state: Readonly<DiagramState>, nodeId: Nullable<string>, visitedNodeIds: string[] = []): boolean {
	if (nodeId === null) {
		return false;	// this should not happen unless called form the outside
	}
	if (visitedNodeIds.includes(nodeId)) {
		return false;	// in case of an circle
	}
	if (state.startNodeIds.includes(nodeId)) {
		return true;
	}
	if (state.nodes[nodeId].previousNodeIds.length === 0) {
		return false;
	}
	const updatedVisitedNodeIds = [ ...visitedNodeIds, nodeId ];
	return state.nodes[nodeId].previousNodeIds.every((_nodeId) => isNodeConnectedToStartOnAllEnds(state, _nodeId, updatedVisitedNodeIds));
}

type NodeWithParents = { nodeId: string; parents: NodeWithParents[]; };
export function getPrecedingNodeIdsTree(state: DiagramState, nodeId: string): NodeWithParents {
	const parents = state.nodes[nodeId].previousNodeIds.map((_nodeId) => getPrecedingNodeIdsTree(state, _nodeId));
	return {
		nodeId,
		parents,
	};
}

export function getSucceedingNodesIds(state: DiagramState, nodeId: string): string[] {
	const succeedingNodesIds: string[] = [];
	let currentNodeIds = state.nodes[nodeId].nextNodeIds;
	while (currentNodeIds.length) {
		succeedingNodesIds.push(...currentNodeIds);
		const newCurrentNodeIds: string[] = [];
		for (let _nodeId of currentNodeIds) {
			newCurrentNodeIds.push(...state.nodes[_nodeId].nextNodeIds);
		}
		currentNodeIds = newCurrentNodeIds;
	}
	return succeedingNodesIds;
}

export function getDataByNodesWithoutSucceedingNodes(state: Readonly<DiagramState>, sourceNodeId: string, includeSource: boolean = false): DataByNode {
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

// tail recursion, result is in updatedDataByNode
function _buildUpdatedDataByNodesForTree(state: Readonly<DiagramState>, node: NodeWithParents, updatedDataByNode: DataByNode = {}) {
	const { nodeId, parents } = node;

	if (!parents.length && !state.startNodeIds.includes(nodeId)) {
		throw new Error(`Cannot update non start node without parent data. Node id: ${nodeId}`);
	}

	parents.forEach((_parent) => _buildUpdatedDataByNodesForTree(state, _parent, updatedDataByNode));

	const getParentData = ({ nodeId: _parentNodeId }: NodeWithParents) => {
		if (!updatedDataByNode[_parentNodeId]) {
			throw new Error(`Missing data for node ${_parentNodeId} to build data for node ${nodeId}`);
		}
		return updatedDataByNode[_parentNodeId];
	};
	updatedDataByNode[nodeId] = updatedDataByNode[nodeId] || state.dataByNode[nodeId] || callNodeRun(nodeId, ...parents.map(getParentData));
	return updatedDataByNode;
}

export function updateDataByNodesWithMissingNodes(state: Readonly<DiagramState>, endNodeId: string): DataByNode {
	if (!isNodeConnectedToStartOnAllEnds(state, endNodeId)) {
		throw new Error('Node needs to be connected to start on all ends for data to be calculated');
	}
	const node = getPrecedingNodeIdsTree(state, endNodeId);
	const updatedDataByNode = _buildUpdatedDataByNodesForTree(state, node);

	return {
		...state.dataByNode,
		...updatedDataByNode,
	};
}
