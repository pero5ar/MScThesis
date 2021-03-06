import { DIAGRAM_ACTIONS } from '../actionTypes';

export function ADD_NODE(node) {
	return {
		type: DIAGRAM_ACTIONS.ADD_NODE,
		node,
	};
}

export function REMOVE_NODE(nodeId) {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_NODE,
		nodeId,
	};
}

export function SELECT_NODE(nodeId) {
	return {
		type: DIAGRAM_ACTIONS.SELECT_NODE,
		nodeId,
	};
}

export function SET_NODE_SETTINGS(nodeId, settings) {
	return {
		type: DIAGRAM_ACTIONS.SET_NODE_SETTINGS,
		nodeId,
		settings,
	};
}

export function ADD_LINK(linkId, sourceNodeId, targetNodeId) {
	return {
		type: DIAGRAM_ACTIONS.ADD_LINK,
		linkId,
		sourceNodeId,
		targetNodeId,
	};
}

export function REMOVE_LINK(linkId) {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_LINK,
		linkId,
	};
}