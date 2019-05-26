import { callNodeRun } from './engine.utils';

/**
 * @param {DiagramState} state 
 * @param {string} nodeId 
 * @returns {boolean}
 */
export function isNodeConnectedToStart(state, nodeId) {
	if (nodeId === null) {
		return false;
	}
	if (nodeId === state.startNodeId) {
		return true;
	}
	return isNodeConnectedToStart(state, state.nodes[nodeId].previousNodeId);
}

/**
 * @param {DiagramState} state 
 * @param {string} nodeId 
 * @returns {string[]}
 */
export function getPrecedingNodesIds(state, nodeId) {
	const precedingNodesIds = [];
	let currentNodeId = state.nodes[nodeId].previousNodeId;
	while (currentNodeId) {
		precedingNodesIds.unshift(currentNodeId);
		currentNodeId = state.nodes[currentNodeId].previousNodeId;
	}
	return precedingNodesIds;
}

/**
 * @param {DiagramState} state 
 * @param {string} nodeId 
 * @returns {string[]}
 */
export function getSucceedingNodesIds(state, nodeId) {
	const succeedingNodesIds = [];
	let currentNodeId = state.nodes[nodeId].nextNodeId;
	while (currentNodeId) {
		succeedingNodesIds.push(currentNodeId);
		currentNodeId = state.nodes[currentNodeId].nextNodeId;
	}
	return succeedingNodesIds;
}

/**
 * @param {DiagramState} state 
 * @param {string} sourceNodeId 
 * @param {boolean} includeSource 
 * @returns {NodeDataDict}
 */
export function getDataByNodesWithoutSucceedingNodes(state, sourceNodeId, includeSource = false) {
	console.log(state, sourceNodeId);
	const linkedNodesIds = getSucceedingNodesIds(state, sourceNodeId);
	if (includeSource) {
		linkedNodesIds.unshift(sourceNodeId);
	}
	return Object.keys(state.dataByNode).reduce((_obj, _key) => {
		if (!linkedNodesIds.includes(_key)) {
			_obj[_key] = state.dataByNode[_key];
		}
		return _obj;
	}, {});
}

/**
 * @param {DiagramState} state 
 * @param {string} endNodeId 
 * @param {boolean} includeEnd 
 * @returns {NodeDataDict}
 */
export function updateDataByNodesWithMissingNodes(state, endNodeId, includeEnd = true) {
	if (!isNodeConnectedToStart(state, endNodeId)) {
		throw new Error('Node needs to be connected to start for data to be calculated');
	}
	const linkedNodesIds = getPrecedingNodesIds(state, endNodeId);
	if (includeEnd) {
		linkedNodesIds.push(endNodeId);
	}
	const addedData = {};
	for (let nodeId of linkedNodesIds) {
		if (!!state.dataByNode[nodeId]) {
			continue;
		}
		const previousNodeId = state.nodes[nodeId].previousNodeId;
		addedData[nodeId] = callNodeRun(nodeId, addedData[previousNodeId] || state.dataByNode[previousNodeId]);
	}
	return {
		...state.dataByNode,
		...addedData
	};
}