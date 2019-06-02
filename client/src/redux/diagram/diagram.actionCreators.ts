import * as DIAGRAM_ACTIONS from './diagram.actionTypes';

import { NodeModel } from '../../engine';

interface AddNode {
	type: typeof DIAGRAM_ACTIONS.ADD_NODE;
	node: NodeModel;
}
export function ADD_NODE(node: NodeModel): AddNode {
	return {
		type: DIAGRAM_ACTIONS.ADD_NODE,
		node,
	};
}

interface RemoveNode {
	type: typeof DIAGRAM_ACTIONS.REMOVE_NODE;
	nodeId: string;
}
export function REMOVE_NODE(nodeId: string): RemoveNode {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_NODE,
		nodeId,
	};
}

interface SelectNode {
	type: typeof DIAGRAM_ACTIONS.SELECT_NODE;
	nodeId: string;
}
export function SELECT_NODE(nodeId: string): SelectNode {
	return {
		type: DIAGRAM_ACTIONS.SELECT_NODE,
		nodeId,
	};
}

interface SetNodeSettings {
	type: typeof DIAGRAM_ACTIONS.SET_NODE_SETTINGS;
	nodeId: string;
	settings: object;
}
export function SET_NODE_SETTINGS(nodeId: string, settings: object): SetNodeSettings {
	return {
		type: DIAGRAM_ACTIONS.SET_NODE_SETTINGS,
		nodeId,
		settings,
	};
}

interface AddLink {
	type: typeof DIAGRAM_ACTIONS.ADD_LINK;
	linkId: string;
	sourceNodeId: string;
	targetNodeId: string;
}
export function ADD_LINK(linkId: string, sourceNodeId: string, targetNodeId: string): AddLink {
	return {
		type: DIAGRAM_ACTIONS.ADD_LINK,
		linkId,
		sourceNodeId,
		targetNodeId,
	};
}

interface RemoveLink {
	type: typeof DIAGRAM_ACTIONS.REMOVE_LINK;
	linkId: string;
}
export function REMOVE_LINK(linkId: string): RemoveLink {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_LINK,
		linkId,
	};
}

type DiagramAction = AddNode | RemoveNode | SelectNode | SetNodeSettings | AddLink | RemoveLink;

export default DiagramAction;
